"use client"

import { ExternalLink, Calendar, Rss, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Article {
  title: string
  link: string
  published: string
  content: string
  category: string
  source?: string
}

interface VeillePayload {
  articles?: Article[]
}

function getVeilleJsonCandidates(): string[] {
  if (typeof window === "undefined") {
    return ["/data/veille.json"]
  }

  const origin = window.location.origin
  const pathnameSegments = window.location.pathname.split("/").filter(Boolean)
  const candidates = new Set<string>()

  // Works when URL is ".../veille/".
  candidates.add(new URL("../data/veille.json", window.location.href).toString())

  // Works even if URL is ".../veille" (without trailing slash).
  if (pathnameSegments.length > 1) {
    candidates.add(`${origin}/${pathnameSegments[0]}/data/veille.json`)
  }

  // Local/custom-domain fallback.
  candidates.add(`${origin}/data/veille.json`)

  return Array.from(candidates)
}

export default function VeillePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)

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

        const loadedArticles = Array.isArray(payload.articles) ? payload.articles : []
        loadedArticles.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
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

  const displayedArticles = articles.slice(0, displayCount)
  const hasMore = displayCount < articles.length

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Rss size={32} className="text-primary" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            Ma Veille Technologique
          </h1>
          <p className="text-lg text-muted-foreground">
            Flux RSS dedie au noyau Linux avec une selection d'articles publies en francais sur la derniere annee.
          </p>
          <div className="mt-4 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
            Noyau Linux - sources francaises
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <Loader2 size={32} className="mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Chargement des articles...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">Impossible de charger les articles pour le moment.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">Aucun article pertinent sur le noyau Linux n'a ete trouve sur la derniere annee.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedArticles.map((article, index) => (
              <article
                key={index}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {article.source || article.category}
                    </span>
                    <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                  </div>
                </div>

                {article.published && (
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    {new Date(article.published).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}

                {article.content && (
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {article.content}
                  </p>
                )}

                {article.link && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Lire l'article
                    <ExternalLink size={14} />
                  </a>
                )}
              </article>
            ))}
            
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setDisplayCount(displayCount + 10)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  Afficher plus d'articles
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/s.sabiran/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 text-sm font-semibold text-foreground shadow-lg transition-all hover:scale-105 hover:border-primary hover:bg-card/80"
          >
            ← Retour au portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
