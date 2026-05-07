import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_PATH = path.resolve(__dirname, "..", "public", "data", "veille.json")
const OPML_OUTPUT_PATH = path.resolve(__dirname, "..", "public", "data", "veille.opml")

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

function buildManualArticle({
  title,
  link,
  published,
  content,
  source,
  featured = false,
  featuredNote = "",
  mediaType = "",
  thumbnailUrl = "",
  thumbnailAlt = "",
  linkLabel = "",
}) {
  return {
    title,
    link,
    published,
    content,
    source,
    featured,
    featuredNote,
    mediaType,
    thumbnailUrl,
    thumbnailAlt,
    linkLabel,
  }
}

const LINUX_GENERAL_PATTERNS = [
  /\blinux\b/i,
  /\bgnu\/linux\b/i,
  /\bubuntu\b/i,
  /\bdebian\b/i,
  /\bfedora\b/i,
  /\barch linux\b/i,
  /\blinux mint\b/i,
  /\bopensuse\b/i,
  /\brocky linux\b/i,
  /\balmalinux\b/i,
  /\brhel\b/i,
  /\bred hat enterprise linux\b/i,
  /\bwayland\b/i,
  /\bgnome\b/i,
  /\bkde\b/i,
  /\bs[ée]curix\b/i,
  /\bbureautix\b/i,
  /\bdinum\b/i,
]
const LINUX_GENERAL_EXCLUDED_PATTERNS = [
  /\bwsl\b/i,
  /windows subsystem for linux/i,
  /cygwin/i,
  /\bandroid\b/i,
  /bon plan/i,
  /promo/i,
  /soldes/i,
  /black friday/i,
  /prix cass/i,
  /à ne pas rater/i,
  /code promo/i,
]

const RAM_PATTERNS = [/\bram\b/i, /mémoire vive/i, /\bddr[45]\b/i, /\bdram\b/i, /puces? mémoire/i, /barrettes? de ram/i]
const RAM_CONTEXT_PATTERNS = [
  /hausse/i,
  /augmentation/i,
  /baisse/i,
  /recul/i,
  /chute/i,
  /stabilis/i,
  /prix/i,
  /tarif/i,
  /coût/i,
  /marché/i,
  /pénurie/i,
  /inflation/i,
  /tension/i,
  /flambée/i,
  /crise/i,
]
const RAM_EXCLUDED_PATTERNS = [
  /gpu/i,
  /vram/i,
  /carte graphique/i,
  /soldes/i,
  /promo/i,
  /bon plan/i,
  /meilleure affaire/i,
  /à ne pas rater/i,
  /prix éclaté/i,
  /fait rêver/i,
  /black friday/i,
  /prix cassé/i,
  /pure pépite/i,
  /ultra-portable/i,
  /pulvérise le prix/i,
  /mini pc/i,
  /intel core/i,
  /surpuissant/i,
]

const CURATED_RAM_ARTICLES = [
  buildManualArticle({
    title: "La RAM DDR5 voit enfin (un peu) ses prix baisser",
    link: "https://www.generation-nt.com/actualites/ram-ddr5-prix-baisse-google-turboquant-ia-2073285",
    published: "2026-03-30T18:58:00+02:00",
    content:
      "Article de synthèse sur la baisse de la DDR5 en mars 2026 et sur l'effet de TurboQuant de Google sur la pression exercée par l'IA sur la mémoire.",
    source: "GNT",
    featured: true,
    featuredNote: "Article épinglé : synthèse claire entre baisse DDR5, marché mémoire et effet de TurboQuant.",
  }),
  buildManualArticle({
    title: "RAM DDR5 : les prix baissent enfin en Europe après des mois de hausse",
    link: "https://www.frandroid.com/produits-android/3044563_ram-ddr5-les-prix-baissent-enfin-en-europe-apres-des-mois-de-hausse",
    published: "2026-03-30T12:10:00+02:00",
    content:
      "Revient sur la baisse observée en Europe après plusieurs mois de hausse et relie cette accalmie à TurboQuant et à la demande des datacenters IA.",
    source: "Frandroid",
  }),
  buildManualArticle({
    title: "Les prix de la RAM DDR5 se stabilisent enfin, mais ça ne durera pas",
    link: "https://www.lesnumeriques.com/ram-memoire-vive/les-prix-de-la-ram-ddr5-se-stabilisent-enfin-mais-ca-ne-durera-pas-n253651.html",
    published: "2026-03-29T08:15:00+02:00",
    content:
      "Analyse la stabilisation des prix de la DDR5, rappelle l'impact de TurboQuant et nuance l'idée d'une baisse durable pour le grand public.",
    source: "Les Numériques",
  }),
  buildManualArticle({
    title: "Prix DDR5 En Baisse Sur Amazon France : Faut-il Craquer ?",
    link: "https://pausehardware.com/prix-ddr5-en-baisse-en-france-turboquant-de-google-a-t-il-tout-change/",
    published: "2026-03-29T12:00:00+02:00",
    content:
      "Donne des exemples concrets de prix observés en France et met en perspective le rôle de TurboQuant dans la baisse récente des kits DDR5.",
    source: "Pause Hardware",
  }),
  buildManualArticle({
    title: "Google a peut-être réglé la crise de la mémoire vive (RAM) avec un algorithme",
    link: "https://www.numerama.com/tech/2218121-google-a-peut-etre-regle-la-crise-de-la-memoire-vive-ram-avec-un-algorithme.html",
    published: "2026-03-25T16:16:00+01:00",
    content:
      "Article plus technique sur TurboQuant, utile pour comprendre comment une réduction de la consommation mémoire des IA peut détendre le marché de la RAM.",
    source: "Numerama",
  }),
]

const CURATED_LINUX_GENERAL_ARTICLES = [
  buildManualArticle({
    title: "Fedora Linux 44 est dans les bacs",
    link: "https://linuxfr.org/news/fedora-linux-44-est-dans-les-bacs",
    published: "2026-04-29T09:58:17+02:00",
    content:
      "Présentation des nouveautés Fedora 44 (GNOME 50, KDE Plasma 6.6, Wayland, outillage d'administration) et de leur impact côté desktop et usage quotidien.",
    source: "LinuxFr.org",
    featured: false,
    featuredNote: "",
  }),
  buildManualArticle({
    title: "Sécurix et Bureautix : le Linux de l'État pour remplacer Windows",
    link: "https://www.it-connect.fr/securix-et-bureautix-le-linux-de-etat-pour-remplacer-windows/",
    published: "2026-04-13T10:21:53+02:00",
    content:
      "Article IT-Connect centré sur la migration portée par la DINUM vers Linux (base NixOS), avec les projets Sécurix et Bureautix pour les postes de l'État.",
    source: "IT-Connect",
    featured: true,
    featuredNote: "Article épinglé : migration de l'État français vers Linux avec Sécurix et Bureautix.",
  }),
  buildManualArticle({
    title: "LINUX 7.0 EST LÀ !!!! Tour d'horizon !",
    link: "https://www.youtube.com/watch?v=c6ij-kISFbk",
    published: "2026-04-16T08:00:22+02:00",
    content:
      "Dans le passage sur l'IA, la vidéo explique qu'avec Linux 7.0 la documentation du noyau encadre l'usage des assistants IA dans le développement : ils peuvent aider à préparer du code ou de la relecture, mais le développeur humain doit tout vérifier, assumer la contribution et ajouter lui-même le Signed-off-by.",
    source: "YouTube · Adrien Linuxtricks",
    featured: true,
    featuredNote: "Vidéo épinglée : repère clair sur Linux 7.0 et sur l'encadrement des assistants IA dans le développement du noyau.",
    mediaType: "video",
    thumbnailUrl: "https://i.ytimg.com/vi/c6ij-kISFbk/hqdefault.jpg",
    thumbnailAlt: "Miniature YouTube de la vidéo Linux 7.0 d'Adrien Linuxtricks",
    linkLabel: "Voir la vidéo",
  }),
  buildManualArticle({
    title: "GNOME OS comme Linux idéal, partie 1 : la promesse de l'atomique",
    link: "https://linuxfr.org/news/gnome-os-comme-linux-ideal-partie-1-la-promesse-de-l-atomique",
    published: "2025-04-07T11:32:13+02:00",
    content:
      "Analyse des systèmes Linux immuables et de l'évolution des usages desktop autour de GNOME et des formats applicatifs modernes.",
    source: "LinuxFr.org",
  }),
  buildManualArticle({
    title: "Linux est aujourd'hui le premier système d'exploitation sur Microsoft Azure",
    link: "https://next.ink/brief_article/linux-est-aujourdhui-le-premier-systeme-dexploitation-sur-microsoft-azure/",
    published: "2024-07-23T10:00:11+02:00",
    content:
      "Point de contexte sur la place de Linux dans le cloud public, utile pour suivre l'adoption réelle de l'écosystème Linux en entreprise.",
    source: "Next.ink",
  }),
  buildManualArticle({
    title: "[MàJ] Linux Mint 22.3 (avec Cinnamon 6.6) disponible en version finale",
    link: "https://next.ink/brief_article/linux-mint-22-3-avec-cinnamon-6-6-a-sa-beta-publique/",
    published: "2026-01-14T08:02:30+01:00",
    content:
      "Suivi des nouveautés Linux Mint (ergonomie, environnement bureau, base Ubuntu LTS), représentatif des tendances côté distributions grand public.",
    source: "Next.ink",
  }),
  buildManualArticle({
    title: "Rocky Linux ou AlmaLinux : lequel choisir pour remplacer CentOS ?",
    link: "https://www.lemagit.fr/conseil/Rocky-Linux-ou-AlmaLinux-lequel-choisir-pour-remplacer-CentOS",
    published: "2025-08-18T14:00:00+00:00",
    content:
      "Comparatif orienté infrastructure entre deux distributions majeures de l'écosystème Linux serveur, utile pour les choix d'exploitation en entreprise.",
    source: "LeMagIT",
  }),
]

const TOPICS = [
  {
    key: "linux-general",
    category: "Linux (général)",
    label: "Linux (général)",
    description:
      "Veille dédiée à Linux au sens large : distributions, administration système, sécurité, usages desktop/serveur et évolutions de l'écosystème.",
    feedDescription:
      "Je suis ce thème pour rester à jour sur Linux en général avec des sources françaises/francophones fiables, utiles pour mes projets système et infrastructure.",
    periodLabel: "Depuis le 30 mai 2024",
    periodStart: "2024-05-30",
    maxAgeDays: null,
    maxArticles: null,
    manualArticles: CURATED_LINUX_GENERAL_ARTICLES,
    opmlFeeds: [
      buildGoogleNewsRssUrl(
        '"Linux distribution" OR Ubuntu OR Debian OR Fedora OR "Linux Mint" OR "Rocky Linux" OR AlmaLinux OR "administration Linux" OR "sécurité Linux"'
      ),
      buildGoogleNewsRssUrl('"Sécurix" OR "Bureautix" OR DINUM OR "IT-Connect Linux"'),
    ],
    feeds: [
      buildGoogleNewsRssUrl('"Linux distribution"'),
      buildGoogleNewsRssUrl('Ubuntu OR Debian OR Fedora OR "Linux Mint" OR openSUSE'),
      buildGoogleNewsRssUrl('"Rocky Linux" OR AlmaLinux OR RHEL'),
      buildGoogleNewsRssUrl('"administration Linux" OR "serveur Linux"'),
      buildGoogleNewsRssUrl('"sécurité Linux"'),
      buildGoogleNewsRssUrl('Wayland OR GNOME OR KDE Linux'),
      buildGoogleNewsRssUrl('"Sécurix" OR "Bureautix" OR DINUM'),
      buildGoogleNewsRssUrl('"IT-Connect" Linux'),
    ],
    fallbackFeeds: [],
    allowedSources: buildAllowedSources([
      "Clubic",
      "Les Numériques",
      "Next.ink",
      "Programmez",
      "Programmez!",
      "it social",
      "IT Social",
      "MacGeneration",
      "Le Monde Informatique",
      "LinuxFr.org",
      "linuxfr.org",
      "developpez.com",
      "Developpez.com",
      "LeMagIT",
      "silicon.fr",
      "Silicon",
      "Frandroid",
      "ZDNET",
      "Numerama",
      "IT-Connect",
      "it-connect.fr",
      "01net",
      "01net.com",
      "GNT",
      "Génération NT",
      "Korben",
      "itdaily.fr",
    ]),
    isRelevant(article) {
      const haystack = `${article.title} ${article.content}`
      return LINUX_GENERAL_PATTERNS.some((pattern) => pattern.test(haystack))
    },
    isExcluded(article) {
      const haystack = `${article.title} ${article.content}`
      return LINUX_GENERAL_EXCLUDED_PATTERNS.some((pattern) => pattern.test(haystack))
    },
  },
  {
    key: "ram",
    category: "RAM",
    label: "RAM",
    description:
      "Cette deuxième veille suit les hausses, les baisses et les tensions du marché de la RAM à partir de sources francophones fiables.",
    feedDescription:
      "Pourquoi cette veille sur la RAM ? Mon mini-PC de mini-lab est limité à 8 Go de mémoire, ce qui me freine pour ajouter de nouveaux services. Je suis donc l'évolution du marché de la RAM pour préparer une future montée en capacité.",
    periodLabel: "Depuis octobre 2025",
    periodStart: "2025-10-01",
    maxAgeDays: null,
    maxArticles: null,
    opmlFeeds: [
      buildGoogleNewsRssUrl(
        '"prix RAM" OR "mémoire vive prix" OR "DDR5 prix" OR "DRAM prix" OR "pénurie RAM" OR "marché de la RAM" OR "TurboQuant RAM" OR "TurboQuant DDR5"'
      ),
    ],
    feeds: [
      buildGoogleNewsRssUrl('"prix RAM"'),
      buildGoogleNewsRssUrl('"mémoire vive prix"'),
      buildGoogleNewsRssUrl('"DDR5 prix"'),
      buildGoogleNewsRssUrl('"DRAM prix"'),
      buildGoogleNewsRssUrl('"pénurie RAM"'),
      buildGoogleNewsRssUrl('"marché de la RAM"'),
      buildGoogleNewsRssUrl('"TurboQuant RAM"'),
      buildGoogleNewsRssUrl('"TurboQuant DDR5"'),
      buildGoogleNewsRssUrl("RAM prix 01net"),
      buildGoogleNewsRssUrl("RAM prix Korben"),
    ],
    fallbackFeeds: [],
    manualArticles: CURATED_RAM_ARTICLES,
    allowedSources: buildAllowedSources([
      "Clubic",
      "Les Numériques",
      "Frandroid",
      "01net",
      "01net.com",
      "Tom's Hardware",
      "Tom’s Hardware",
      "ZDNET",
      "Korben",
      "Korben.info",
      "Hardware & Co",
      "GinjFo",
      "LaptopSpirit",
      "Le Monde Informatique",
      "Next.ink",
      "Numerama",
      "MacGeneration",
      "GNT",
      "Génération NT",
      "Pause Hardware",
    ]),
    isRelevant(article) {
      const haystack = `${article.title} ${article.content}`
      const hasRamSignal = RAM_PATTERNS.some((pattern) => pattern.test(haystack))
      const hasContextSignal = RAM_CONTEXT_PATTERNS.some((pattern) => pattern.test(haystack))

      return hasRamSignal && hasContextSignal
    },
    isExcluded(article) {
      const haystack = `${article.title} ${article.content}`
      return RAM_EXCLUDED_PATTERNS.some((pattern) => pattern.test(haystack))
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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function normalizeFeedUrlForKey(feedUrl) {
  try {
    const parsed = new URL(feedUrl)
    parsed.hash = ""
    parsed.searchParams.sort()
    return parsed.toString()
  } catch {
    return String(feedUrl || "").trim()
  }
}

function dedupeFeedUrls(feedUrls) {
  const seen = new Set()
  const deduped = []

  for (const feedUrl of feedUrls) {
    if (!feedUrl) {
      continue
    }

    const key = normalizeFeedUrlForKey(feedUrl)
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    deduped.push(feedUrl)
  }

  return deduped
}

function buildOpml(topics, generatedAtIso) {
  const topicOutlines = topics
    .map((topic) => {
      const allFeeds = dedupeFeedUrls(
        Array.isArray(topic.opmlFeeds) && topic.opmlFeeds.length > 0
          ? topic.opmlFeeds
          : [...topic.feeds, ...topic.fallbackFeeds]
      )
      const topicLabel = topic.label || topic.category
      const feedOutlines = allFeeds
        .map((feedUrl, index) => {
          const feedLabel = `${topicLabel} - Flux ${index + 1}`
          return `      <outline text="${escapeXml(feedLabel)}" title="${escapeXml(feedLabel)}" type="rss" xmlUrl="${escapeXml(feedUrl)}" />`
        })
        .join("\n")

      return `    <outline text="${escapeXml(topicLabel)}" title="${escapeXml(topicLabel)}">\n${feedOutlines}\n    </outline>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n  <head>\n    <title>Veille technologique - Flux RSS de Sabiran</title>\n    <dateCreated>${escapeXml(new Date(generatedAtIso).toUTCString())}</dateCreated>\n  </head>\n  <body>\n${topicOutlines}\n  </body>\n</opml>\n`
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

function keepArticlesAfterDate(articles, minPublishedDate) {
  const minTime = new Date(minPublishedDate).getTime()

  return articles.filter((article) => {
    const publishedAt = toSortableDate(article.published)
    return publishedAt > 0 && publishedAt >= minTime
  })
}

function buildPeriodStart(maxAgeDays) {
  return new Date(Date.now() - maxAgeDays * ONE_DAY_MS).toISOString().slice(0, 10)
}

function applyTopicDateWindow(articles, topic) {
  const dateFiltered = topic.periodStart ? keepArticlesAfterDate(articles, topic.periodStart) : keepRecentArticles(articles, topic.maxAgeDays)
  return dateFiltered
}

function limitTopicArticles(articles, topic) {
  return Number.isFinite(topic.maxArticles) ? articles.slice(0, topic.maxArticles) : articles
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
  const collectedArticles = (topic.manualArticles || []).map((article) => ({
    ...article,
    category: topic.category,
  }))

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
  let finalArticles = dedupeAndSort(applyTopicDateWindow(collectedArticles, topic))

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

    finalArticles = dedupeAndSort(applyTopicDateWindow([...finalArticles, ...fallbackArticles], topic))
    source = `google-news-rss-${topic.key}-fallback`
  }

  finalArticles = limitTopicArticles(finalArticles, topic)

  if (finalArticles.length === 0) {
    finalArticles = limitTopicArticles(
      applyTopicDateWindow(existingArticles.filter((article) => article.category === topic.category), topic),
      topic
    )

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

  const generatedAt = new Date().toISOString()

  const payload = {
    generatedAt,
    source: "google-news-rss-multi-theme-fr",
    sourceByTopic,
    topics: TOPICS.map((topic) => ({
      key: topic.key,
      category: topic.category,
      label: topic.label,
      description: topic.description,
      feedDescription: topic.feedDescription,
      periodLabel: topic.periodLabel,
      periodStart: topic.periodStart || buildPeriodStart(topic.maxAgeDays),
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
  await writeFile(OPML_OUTPUT_PATH, buildOpml(TOPICS, generatedAt), "utf8")
  console.log(`Veille OPML written to ${OPML_OUTPUT_PATH}.`)

  if (errors.length > 0) {
    console.warn(`Feed warnings: ${errors.length}`)
  }
}

main().catch((error) => {
  console.error("Failed to generate veille data:", error)
  process.exit(1)
})
