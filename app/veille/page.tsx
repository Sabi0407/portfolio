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
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Cette page est séparée en deux parties : d'abord la définition de la veille, puis ma veille technologique.
          </p>
        </div>

        <section className="mb-10 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground">Qu'est-ce qu'une veille technologique ?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              La veille technologique consiste à observer et analyser les nouveautés pour rester à jour.
              Elle permet d'anticiper les changements, d'éviter les mauvaises décisions et de repérer les opportunités utiles.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading text-base font-semibold text-foreground">Objectifs de la veille</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Identifier plus facilement les sources d'information pertinentes.</li>
                <li>Garder un flux régulier d'actualités dans son domaine.</li>
                <li>Mettre à jour ses connaissances en continu.</li>
                <li>Repérer les évolutions technologiques et scientifiques.</li>
                <li>Gagner du temps dans l'accès à l'information utile.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading text-base font-semibold text-foreground">Accès à l'information</h3>

              <div className="mt-3 space-y-3">
                <div className="rounded-lg border border-border bg-background/60 p-3">
                  <p className="text-sm font-semibold text-foreground">Methode PULL</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    L'utilisateur va chercher l'information lui-même. C'est précis, mais cela peut prendre du temps.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Exemples : moteurs de recherche, sites favoris, revues spécialisées, webinaires, livres techniques.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background/60 p-3">
                  <p className="text-sm font-semibold text-foreground">Methode PUSH</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    L'information arrive automatiquement selon des critères définis. C'est rapide, mais il faut filtrer.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Exemples : newsletters, flux RSS, alertes (Google Alerts).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/30 bg-card p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground">Ma veille technologique</h2>
            <div className="mt-3 inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground">
              Thème : Noyau Linux
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              J'ai choisi cette veille car le noyau Linux est au cœur des serveurs et de la sécurité.
              J'utilise aussi un mini-lab Proxmox, donc suivre ses évolutions m'aide à rester à jour sur les nouveautés utiles
              en administration système.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <h2 className="font-heading text-lg font-semibold text-foreground">Flux RSS - Noyau Linux</h2>
            <p className="mt-1 text-sm text-muted-foreground">Actualités récentes affichées automatiquement.</p>
          </div>
        </section>

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
