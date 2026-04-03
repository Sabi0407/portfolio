import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const KERNEL_CATEGORY = "Noyau Linux"

const RSS_FEEDS = [
  {
    url: "https://news.google.com/rss/search?q=%22Linux+kernel%22&hl=en-US&gl=US&ceid=US:en",
    category: KERNEL_CATEGORY,
  },
]

const FALLBACK_NEWS_FEEDS = [
  {
    url: "https://news.google.com/rss/search?q=linux+kernel&hl=en-US&gl=US&ceid=US:en",
    category: KERNEL_CATEGORY,
  },
]

const MAX_ARTICLES = 24
const MAX_ARTICLE_AGE_DAYS = 183

const ALLOWED_SOURCES = new Set([
  "phoronix",
  "linux journal",
  "theregister.com",
  "the new stack",
  "tomshardware.com",
  "zdnet",
  "devclass",
])

const EXCLUDED_TITLE_PATTERNS = [
  /systemrescue/i,
  /\bwine\b/i,
  /ubuntu/i,
  /arch linux/i,
  /\bwsl\b/i,
  /windows subsystem/i,
  /netrunner/i,
  /aerynos/i,
  /fedora/i,
  /macbook/i,
  /raspberry pi/i,
  /firewire/i,
  /weekly roundup/i,
  /\biso\b/i,
]

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_PATH = path.resolve(__dirname, "..", "public", "data", "veille.json")

function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function unwrapCdata(value) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "")
}

function stripHtmlTags(value) {
  return decodeHtmlEntities(unwrapCdata(value || ""))
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function extractTag(xml, tagName) {
  const match = xml.match(new RegExp(`<(?:\\w+:)?${tagName}[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?${tagName}>`, "i"))
  return match ? unwrapCdata(match[1].trim()) : ""
}

function parseItemsFromRss(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let itemMatch

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemXml = itemMatch[1]
    items.push({
      title: extractTag(itemXml, "title"),
      link: extractTag(itemXml, "link"),
      published: extractTag(itemXml, "pubDate"),
      content: extractTag(itemXml, "description"),
      source: extractTag(itemXml, "source"),
    })
  }

  return items
}

function extractAtomLink(entryXml) {
  const links = entryXml.match(/<link\b[^>]*>/gi) || []
  let fallback = ""

  for (const linkTag of links) {
    const hrefMatch = linkTag.match(/href=["']([^"']+)["']/i)
    if (!hrefMatch) {
      continue
    }

    const relMatch = linkTag.match(/rel=["']([^"']+)["']/i)
    const rel = (relMatch?.[1] || "").toLowerCase()
    const href = hrefMatch[1]

    if (rel === "alternate") {
      return href
    }

    if (!fallback && rel !== "self") {
      fallback = href
    }
  }

  return fallback
}

function parseEntriesFromAtom(xml) {
  const entries = []
  const entryRegex = /<entry\b[^>]*>([\s\S]*?)<\/entry>/gi
  let entryMatch

  while ((entryMatch = entryRegex.exec(xml)) !== null) {
    const entryXml = entryMatch[1]
    entries.push({
      title: extractTag(entryXml, "title"),
      link: extractAtomLink(entryXml),
      published: extractTag(entryXml, "published") || extractTag(entryXml, "updated"),
      content: extractTag(entryXml, "content") || extractTag(entryXml, "summary"),
      source: extractTag(entryXml, "source"),
    })
  }

  return entries
}

function normalizeArticleLink(rawLink) {
  const decodedLink = decodeHtmlEntities(rawLink || "").trim()

  try {
    const parsed = new URL(decodedLink)

    if (parsed.hostname.includes("google.") && parsed.pathname === "/url") {
      const target = parsed.searchParams.get("url") || parsed.searchParams.get("q")
      if (target) {
        const finalUrl = new URL(decodeHtmlEntities(target).trim())
        if (finalUrl.protocol === "http:" || finalUrl.protocol === "https:") {
          return finalUrl.toString()
        }
      }
      return ""
    }

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString()
    }
  } catch {
    return ""
  }

  return ""
}

function toSortableDate(value) {
  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}

function normalizeTextForCompare(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function stripSourceSuffix(title, source) {
  if (!source) {
    return title
  }

  return title.replace(new RegExp(`\\s+-\\s+${escapeForRegExp(source)}$`, "i"), "").trim()
}

function sanitizeArticleContent(content, title, source) {
  const normalizedContent = normalizeTextForCompare(content)
  if (!normalizedContent) {
    return ""
  }

  const baseTitle = stripSourceSuffix(title, source)
  const candidates = [
    title,
    baseTitle,
    `${baseTitle} ${source}`,
    `${baseTitle} - ${source}`,
  ]

  if (candidates.some((candidate) => normalizeTextForCompare(candidate) === normalizedContent)) {
    return ""
  }

  return content
}

function isAllowedKernelSource(source) {
  if (!source) {
    return true
  }

  return ALLOWED_SOURCES.has(normalizeTextForCompare(source))
}

function isKernelRelevantArticle(article) {
  if (!isAllowedKernelSource(article.source)) {
    return false
  }

  return !EXCLUDED_TITLE_PATTERNS.some((pattern) => pattern.test(article.title))
}

function dedupeAndSort(articles) {
  const deduped = new Map()
  for (const article of articles) {
    const key = `${article.title}|${article.link}|${article.published}`
    if (!deduped.has(key)) {
      deduped.set(key, article)
    }
  }
  return Array.from(deduped.values()).sort((a, b) => toSortableDate(b.published) - toSortableDate(a.published))
}

function keepRecentArticles(articles, maxAgeDays) {
  const now = Date.now()
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000
  return articles.filter((article) => {
    const t = toSortableDate(article.published)
    return t > 0 && now - t <= maxAgeMs
  })
}

async function readExistingArticles() {
  try {
    const raw = await readFile(OUTPUT_PATH, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.articles) ? parsed.articles : []
  } catch {
    return []
  }
}

async function fetchFeedArticles(feed) {
  const response = await fetch(feed.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; veille-fetcher/1.0)",
      Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const xml = await response.text()
  const atomEntries = parseEntriesFromAtom(xml)
  const rssItems = parseItemsFromRss(xml)
  const items = atomEntries.length > 0 ? atomEntries : rssItems

  return items
    .map((item) => ({
      title: stripHtmlTags(item.title),
      link: normalizeArticleLink(item.link),
      published: item.published,
      content: sanitizeArticleContent(stripHtmlTags(item.content), stripHtmlTags(item.title), stripHtmlTags(item.source)),
      category: feed.category,
      source: stripHtmlTags(item.source),
    }))
    .filter((item) => item.title && item.link && isKernelRelevantArticle(item))
}

async function main() {
  const errors = []
  const fetchedAlertArticles = []

  for (const feed of RSS_FEEDS) {
    try {
      const items = await fetchFeedArticles(feed)
      fetchedAlertArticles.push(...items)
    } catch (error) {
      errors.push({
        feed: feed.url,
        category: feed.category,
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  let source = "google-alerts-rss"
  let finalArticles = dedupeAndSort(fetchedAlertArticles)

  if (finalArticles.length === 0) {
    const fallbackArticles = []
    for (const feed of FALLBACK_NEWS_FEEDS) {
      try {
        const items = await fetchFeedArticles(feed)
        fallbackArticles.push(...items)
      } catch (error) {
        errors.push({
          feed: feed.url,
          category: feed.category,
          message: error instanceof Error ? error.message : String(error),
        })
      }
    }
    finalArticles = dedupeAndSort(fallbackArticles)
    source = "google-news-rss-fallback"
  }

  finalArticles = keepRecentArticles(finalArticles, MAX_ARTICLE_AGE_DAYS).slice(0, MAX_ARTICLES)

  if (finalArticles.length === 0) {
    finalArticles = keepRecentArticles(await readExistingArticles(), MAX_ARTICLE_AGE_DAYS)
    if (finalArticles.length > 0) {
      source = "cached-previous-data"
    }
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  const payload = {
    generatedAt: new Date().toISOString(),
    source,
    feeds: RSS_FEEDS,
    fallbackFeeds: FALLBACK_NEWS_FEEDS,
    total: finalArticles.length,
    errors,
    articles: finalArticles,
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8")
  console.log(`Veille data written to ${OUTPUT_PATH} (${finalArticles.length} article(s)).`)

  if (errors.length > 0) {
    console.warn(`Feed warnings: ${errors.length}`)
  }
}

main().catch((error) => {
  console.error("Failed to generate veille data:", error)
  process.exit(1)
})
