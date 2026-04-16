import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_PATH = path.resolve(__dirname, "..", "public", "data", "veille.json")

function buildGoogleNewsRssUrl(query) {
  const params = new URLSearchParams({
    q: query,
    hl: "fr",
    gl: "FR",
    ceid: "FR:fr",
  })

  return `https://news.google.com/rss/search?${params.toString()}`
}

function normalizeTextForCompare(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function buildAllowedSources(list) {
  return new Set(list.map((item) => normalizeTextForCompare(item)))
}

const KERNEL_PATTERNS = [/\bnoyau\b/i, /\bkernel\b/i, /linus torvalds/i, /\bebpf\b/i, /\brust\b/i, /\blinux\s+[67](?:\.\d+)?\b/i]
const KERNEL_EXCLUDED_PATTERNS = [
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
  /linux mint/i,
  /anduinos/i,
  /distribution/i,
  /guerre de design/i,
  /maliciel/i,
  /cloud et conteneurs/i,
  /embarqu/i,
]

const PIHOLE_PRIMARY_PATTERNS = [/\bpi[\s-]?hole\b/i, /\bnextdns\b/i, /\badguard(?:\s+home)?\b/i, /\bdns0(?:\.eu)?\b/i, /\bdns4eu\b/i]
const PIHOLE_DNS_PATTERNS = [/\bdns\b/i, /\brésolveur\b/i, /\bresolver\b/i]
const PIHOLE_CONTEXT_PATTERNS = [/pub/i, /publicit/i, /filtr/i, /bloc/i, /vie priv/i, /traqueur/i, /track/i, /sécur/i, /protec/i]
const PIHOLE_EXCLUDED_PATTERNS = [
  /youtube/i,
  /twitch/i,
  /synology/i,
  /\bnas\b/i,
  /proxmox/i,
  /docker/i,
  /manifest v3/i,
  /wireguard/i,
  /\bvpn\b/i,
  /gaming/i,
  /pixel/i,
  /tesla/i,
  /battlefield/i,
]

const TOPICS = [
  {
    key: "linux-kernel",
    category: "Noyau Linux",
    label: "Noyau Linux",
    description:
      "Je suis ce thème car le noyau Linux est au cœur des serveurs, de l'administration système et de la sécurité. Cette veille m'aide à suivre les évolutions utiles pour mon mini-lab et mes projets d'infrastructure.",
    feedDescription: "Articles français publiés sur les 12 derniers mois autour du noyau Linux.",
    periodLabel: "12 derniers mois",
    maxAgeDays: 365,
    maxArticles: 18,
    feeds: [
      buildGoogleNewsRssUrl('"noyau Linux"'),
      buildGoogleNewsRssUrl("kernel Linux"),
      buildGoogleNewsRssUrl("Linus Torvalds Linux"),
      buildGoogleNewsRssUrl("eBPF Linux"),
      buildGoogleNewsRssUrl("Rust noyau Linux"),
      buildGoogleNewsRssUrl("Linux 7 noyau"),
    ],
    fallbackFeeds: [
      buildGoogleNewsRssUrl("kernel linux"),
      buildGoogleNewsRssUrl("linus torvalds kernel"),
    ],
    allowedSources: buildAllowedSources([
      "Clubic",
      "Les Numériques",
      "Next.ink",
      "Programmez",
      "it social",
      "linuxfr.org",
      "developpez.com",
      "silicon.fr",
      "Frandroid",
      "ZDNET",
      "Numerama",
      "Korben",
      "itdaily.fr",
    ]),
    isRelevant(article) {
      const haystack = `${article.title} ${article.content}`
      return KERNEL_PATTERNS.some((pattern) => pattern.test(haystack))
    },
    isExcluded(article) {
      const haystack = `${article.title} ${article.content}`
      return KERNEL_EXCLUDED_PATTERNS.some((pattern) => pattern.test(haystack))
    },
  },
  {
    key: "pi-hole-dns",
    category: "Pi-hole et filtrage DNS",
    label: "Pi-hole",
    description:
      "J'ai choisi Pi-hole comme deuxième sujet de veille. Comme l'actualité française centrée uniquement sur Pi-hole est assez rare, j'élargis la collecte aux solutions proches de filtrage DNS et de protection de la vie privée pour garder une veille utile et cohérente.",
    feedDescription: "Articles français publiés sur les 8 derniers mois autour de Pi-hole, NextDNS, AdGuard DNS et DNS4EU.",
    periodLabel: "8 derniers mois",
    maxAgeDays: 243,
    maxArticles: 12,
    feeds: [
      buildGoogleNewsRssUrl('"Pi-hole"'),
      buildGoogleNewsRssUrl('"Pi-hole" DNS'),
      buildGoogleNewsRssUrl("NextDNS vie privée"),
      buildGoogleNewsRssUrl("AdGuard DNS"),
      buildGoogleNewsRssUrl("dns0.eu vie privée"),
      buildGoogleNewsRssUrl("DNS vie privée publicité"),
    ],
    fallbackFeeds: [
      buildGoogleNewsRssUrl("DNS sécurisé publicité"),
      buildGoogleNewsRssUrl("AdGuard NextDNS DNS"),
      buildGoogleNewsRssUrl("résolveur DNS vie privée"),
    ],
    allowedSources: buildAllowedSources([
      "Korben",
      "MacGeneration",
      "Android MT",
      "ZDNET",
      "Clubic",
      "Les Numériques",
      "Next.ink",
      "Frandroid",
      "Numerama",
      "01net",
      "iGeneration",
    ]),
    isRelevant(article) {
      const haystack = `${article.title} ${article.content}`
      const hasPrimarySignal = PIHOLE_PRIMARY_PATTERNS.some((pattern) => pattern.test(haystack))
      const hasDnsSignal = PIHOLE_DNS_PATTERNS.some((pattern) => pattern.test(haystack))
      const hasContextSignal = PIHOLE_CONTEXT_PATTERNS.some((pattern) => pattern.test(haystack))

      return hasPrimarySignal || (hasDnsSignal && hasContextSignal)
    },
    isExcluded(article) {
      const haystack = `${article.title} ${article.content}`
      return PIHOLE_EXCLUDED_PATTERNS.some((pattern) => pattern.test(haystack))
    },
  },
]

function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
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
  const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi
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
  const candidates = [title, baseTitle, `${baseTitle} ${source}`, `${baseTitle} - ${source}`]

  if (candidates.some((candidate) => normalizeTextForCompare(candidate) === normalizedContent)) {
    return ""
  }

  return content
}

function isAllowedSource(source, topic) {
  if (!source) {
    return false
  }

  return topic.allowedSources.has(normalizeTextForCompare(source))
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
  const maxAgeMs = maxAgeDays * ONE_DAY_MS

  return articles.filter((article) => {
    const publishedAt = toSortableDate(article.published)
    return publishedAt > 0 && now - publishedAt <= maxAgeMs
  })
}

function buildPeriodStart(maxAgeDays) {
  return new Date(Date.now() - maxAgeDays * ONE_DAY_MS).toISOString().slice(0, 10)
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

async function fetchFeedArticles(feedUrl, topic) {
  const response = await fetch(feedUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; veille-fetcher/2.0)",
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
    .map((item) => {
      const title = stripHtmlTags(item.title)
      const source = stripHtmlTags(item.source)

      return {
        title,
        link: normalizeArticleLink(item.link),
        published: item.published,
        content: sanitizeArticleContent(stripHtmlTags(item.content), title, source),
        category: topic.category,
        source,
      }
    })
    .filter((article) => article.title && article.link)
    .filter((article) => isAllowedSource(article.source, topic))
    .filter((article) => !topic.isExcluded(article))
    .filter((article) => topic.isRelevant(article))
}

async function collectTopicArticles(topic, existingArticles) {
  const errors = []
  const collectedArticles = []

  for (const feedUrl of topic.feeds) {
    try {
      const items = await fetchFeedArticles(feedUrl, topic)
      collectedArticles.push(...items)
    } catch (error) {
      errors.push({
        topic: topic.category,
        feed: feedUrl,
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  let source = `google-news-rss-${topic.key}-fr`
  let finalArticles = dedupeAndSort(keepRecentArticles(collectedArticles, topic.maxAgeDays))

  if (finalArticles.length < topic.maxArticles && topic.fallbackFeeds.length > 0) {
    const fallbackArticles = []

    for (const feedUrl of topic.fallbackFeeds) {
      try {
        const items = await fetchFeedArticles(feedUrl, topic)
        fallbackArticles.push(...items)
      } catch (error) {
        errors.push({
          topic: topic.category,
          feed: feedUrl,
          message: error instanceof Error ? error.message : String(error),
        })
      }
    }

    finalArticles = dedupeAndSort(keepRecentArticles([...finalArticles, ...fallbackArticles], topic.maxAgeDays))
    source = `google-news-rss-${topic.key}-fallback`
  }

  finalArticles = finalArticles.slice(0, topic.maxArticles)

  if (finalArticles.length === 0) {
    finalArticles = keepRecentArticles(
      existingArticles.filter((article) => article.category === topic.category),
      topic.maxAgeDays
    ).slice(0, topic.maxArticles)

    if (finalArticles.length > 0) {
      source = "cached-previous-data"
    }
  }

  return {
    source,
    errors,
    articles: finalArticles,
  }
}

async function main() {
  const existingArticles = await readExistingArticles()
  const errors = []
  const articles = []
  const sourceByTopic = {}

  for (const topic of TOPICS) {
    const result = await collectTopicArticles(topic, existingArticles)
    sourceByTopic[topic.category] = result.source
    errors.push(...result.errors)
    articles.push(...result.articles)
  }

  const finalArticles = dedupeAndSort(articles)

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "google-news-rss-multi-theme-fr",
    sourceByTopic,
    topics: TOPICS.map((topic) => ({
      key: topic.key,
      category: topic.category,
      label: topic.label,
      description: topic.description,
      feedDescription: topic.feedDescription,
      periodLabel: topic.periodLabel,
      periodStart: buildPeriodStart(topic.maxAgeDays),
      maxAgeDays: topic.maxAgeDays,
    })),
    feeds: TOPICS.flatMap((topic) => topic.feeds.map((url) => ({ category: topic.category, url }))),
    fallbackFeeds: TOPICS.flatMap((topic) => topic.fallbackFeeds.map((url) => ({ category: topic.category, url }))),
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
