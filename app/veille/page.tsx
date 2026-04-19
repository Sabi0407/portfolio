"use client"

import Link from "next/link"
import { Calendar, ExternalLink, Loader2, PlayCircle, Rss } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

interface Article {
  title: string
  link: string
  published: string
  content: string
  category: string
  source?: string
  featured?: boolean
  featuredNote?: string
  mediaType?: string
  thumbnailUrl?: string
  thumbnailAlt?: string
  linkLabel?: string
}

interface Topic {
  key?: string
  category: string
  label?: string
  description?: string
  feedDescription?: string
  periodLabel?: string
  periodStart?: string
}

interface VeillePayload {
  topics?: Topic[]
  articles?: Article[]
}

const DEFAULT_TOPICS: Topic[] = [
  {
    key: "linux-kernel",
    category: "Noyau Linux",
    label: "Noyau Linux",
    description:
      "Veille dédiée au noyau Linux, avec un repère sur Linux 7.0 et sur l'encadrement des assistants IA dans le développement du projet.",
    feedDescription:
      "Je suis ce thème car le noyau Linux est au cœur des serveurs, de l'administration système et de la sécurité. Cette veille m'aide à suivre les évolutions utiles pour mon mini-lab et mes projets d'infrastructure.",
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
  },
]

function formatLongDate(dateValue: string): string {
  return new Date(dateValue).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getVeilleJsonCandidates(): string[] {
  if (typeof window === "undefined") {
    return ["/data/veille.json"]
  }

  const origin = window.location.origin
  const pathnameSegments = window.location.pathname.split("/").filter(Boolean)
  const candidates = new Set<string>()

  candidates.add(new URL("../data/veille.json", window.location.href).toString())

  if (pathnameSegments.length > 1) {
    candidates.add(`${origin}/${pathnameSegments[0]}/data/veille.json`)
  }

  candidates.add(`${origin}/data/veille.json`)

  return Array.from(candidates)
}

export default function VeillePage() {
  const [topics, setTopics] = useState<Topic[]>(DEFAULT_TOPICS)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    async function fetchLocalVeille() {
      try {
        const candidates = getVeilleJsonCandidates()
        let payload: VeillePayload | null = null
        let lastErrorStatus: number | null = null

        for (const url of candidates) {
          const cacheBustedUrl = `${url}${url.includes("?") ? "&" : "?"}ts=${Date.now()}`
          const response = await fetch(cacheBustedUrl, { cache: "no-store" })

          if (!response.ok) {
            lastErrorStatus = response.status
            continue
          }

          payload = (await response.json()) as VeillePayload
          break
        }

        if (!payload) {
          throw new Error(lastErrorStatus ? `HTTP ${lastErrorStatus}` : "No valid veille source")
        }

        const loadedTopics = Array.isArray(payload.topics) && payload.topics.length > 0 ? payload.topics : DEFAULT_TOPICS
        const loadedArticles = Array.isArray(payload.articles) ? [...payload.articles] : []

        loadedArticles.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

        setTopics(loadedTopics)
        setArticles(loadedArticles)
      } catch (err) {
        console.error("Error loading veille data:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLocalVeille()
  }, [])

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") {
      return articles
    }

    return [...articles.filter((article) => article.category === activeCategory)].sort((firstArticle, secondArticle) => {
      if (!!firstArticle.featured !== !!secondArticle.featured) {
        return firstArticle.featured ? -1 : 1
      }

      return new Date(secondArticle.published).getTime() - new Date(firstArticle.published).getTime()
    })
  }, [activeCategory, articles])

  const displayedArticles = filteredArticles.slice(0, displayCount)
  const hasMore = displayCount < filteredArticles.length
  const activeTopic = activeCategory === "all" ? null : topics.find((topic) => topic.category === activeCategory) || null
  const activeTopicStartsInFuture =
    !!activeTopic?.periodStart && new Date(activeTopic.periodStart).getTime() > Date.now()

  function handleFilterChange(category: string) {
    setActiveCategory(category)
    setDisplayCount(10)
  }

  return (
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm md:p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Rss size={28} className="text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Mes veilles technologiques</h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Cette page présente d'abord une définition simple de la veille technologique, puis mes deux thèmes de suivi
            avec un affichage automatique des articles les plus pertinents.
          </p>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_1.45fr]">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Link
              href="/veille/definition"
              className="group block rounded-xl border border-border/70 bg-background/40 p-5 transition-colors hover:border-primary/50"
              aria-label="Ouvrir la définition de la veille technologique"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-heading text-2xl font-semibold text-foreground transition-colors group-hover:text-primary md:text-3xl">
                  Qu&apos;est-ce qu&apos;une veille technologique ?
                </span>
                <span className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary">
                  Définition
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Une veille technologique permet de rester à jour, d'anticiper les changements et d'orienter ses choix
                à partir d'informations utiles et vérifiées.
              </p>

              <div className="mt-5 border-t border-border/70 pt-4">
                <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm font-semibold text-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                  Ouvrir la description
                  <ExternalLink size={14} />
                </span>
              </div>
            </Link>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {topics.map((topic) => {
              const topicCount = articles.filter((article) => article.category === topic.category).length
              const isActive = activeCategory === topic.category

              return (
                <article
                  key={topic.category}
                  className={`rounded-2xl border p-5 shadow-sm transition-colors ${
                    isActive ? "border-primary/60 bg-card" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-foreground">{topic.label || topic.category}</h2>
                    </div>

                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground">
                      {topicCount} article{topicCount > 1 ? "s" : ""}
                    </span>
                  </div>

                  {topic.description && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                  )}

                  {topic.feedDescription && (
                    <div className="mt-4 rounded-xl border border-border/70 bg-background/40 p-4">
                      <p className="text-sm text-muted-foreground">{topic.feedDescription}</p>
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleFilterChange(topic.category)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {isActive ? "Filtre actif" : "Voir les articles"}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col gap-4 pb-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                {activeTopic ? `Actualités RSS - ${activeTopic.label || activeTopic.category}` : "Actualités RSS"}
              </h2>

              {!loading && !error && filteredArticles.length > 0 && (
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleFilterChange("all")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                Tous
              </button>

              {topics.map((topic) => (
                <button
                  key={topic.category}
                  type="button"
                  onClick={() => handleFilterChange(topic.category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === topic.category
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {topic.label || topic.category}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-5">
            {loading ? (
              <div className="rounded-xl border border-border bg-background/40 p-8 text-center">
                <Loader2 size={28} className="mx-auto mb-3 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Chargement des articles...</p>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-border bg-background/40 p-8 text-center">
                <p className="text-sm text-muted-foreground">Impossible de charger les articles pour le moment.</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="rounded-xl border border-border bg-background/40 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {activeTopicStartsInFuture && activeTopic?.periodStart
                    ? `Aucun article affiché pour le moment. Cette veille commencera à partir du ${formatLongDate(activeTopic.periodStart)}.`
                    : activeTopic
                      ? `Aucun article pertinent n'a été trouvé pour ${activeTopic.label || activeTopic.category}.`
                      : "Aucun article pertinent n'a été trouvé pour le moment."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedArticles.map((article, index) => (
                  <article
                    key={`${article.category}-${article.link}-${index}`}
                    className={`group rounded-xl border p-5 shadow-sm transition-colors ${
                      article.featured
                        ? "border-primary/40 bg-primary/[0.04] hover:border-primary/60"
                        : "border-border/70 bg-background/30 hover:border-primary/40"
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {topics.find((topic) => topic.category === article.category)?.label || article.category}
                      </span>

                      {article.featured && (
                        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          Épinglé
                        </span>
                      )}

                      {article.source && (
                        <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                          {article.source}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>

                    {article.featuredNote && (
                      <p className="mt-2 text-sm font-medium text-primary">{article.featuredNote}</p>
                    )}

                    {article.thumbnailUrl && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-auto mt-4 block w-full max-w-sm overflow-hidden rounded-xl border border-border/70 bg-background/50 p-2 shadow-sm"
                      >
                        <img
                          src={article.thumbnailUrl}
                          alt={article.thumbnailAlt || article.title}
                          className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </a>
                    )}

                    {article.published && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {formatLongDate(article.published)}
                      </div>
                    )}

                    {article.content && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{article.content}</p>
                    )}

                    {article.link && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {article.linkLabel || (article.mediaType === "video" ? "Voir la vidéo" : "Lire l'article")}
                        {article.mediaType === "video" ? <PlayCircle size={14} /> : <ExternalLink size={14} />}
                      </a>
                    )}
                  </article>
                ))}

                {hasMore && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setDisplayCount(displayCount + 10)}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
                    >
                      Afficher plus d&apos;articles
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-card/80"
          >
            ← Retour au portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
