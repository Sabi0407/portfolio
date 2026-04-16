"use client"

import { ExternalLink, Calendar, Rss, Loader2, ChevronDown } from "lucide-react"
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
  const [showVeilleDefinition, setShowVeilleDefinition] = useState(false)

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
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm md:p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Rss size={28} className="text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Ma veille technologique</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Cette page est séparée en deux blocs : d'abord ce qu'est la veille technologique, puis ma veille
            personnelle avec un flux RSS dédié au noyau Linux.
          </p>
        </header>

        <section className="grid items-stretch gap-6 lg:grid-cols-2">
          <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="rounded-xl border border-border/80 bg-background/30 p-4">
              <button
                type="button"
                onClick={() => setShowVeilleDefinition((prev) => !prev)}
                className="flex w-full items-center justify-between gap-3 text-left"
                aria-expanded={showVeilleDefinition}
                aria-controls="veille-definition-content"
              >
                <span className="font-heading text-2xl font-semibold text-foreground">
                  Qu'est-ce qu'une veille technologique ?
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {showVeilleDefinition ? "Masquer" : "Voir le détail"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${showVeilleDefinition ? "rotate-180" : "rotate-0"}`}
                  />
                </span>
              </button>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Une veille technologique permet de rester à jour, d'anticiper les changements et d'orienter ses choix
                avec des informations fiables.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">Objectifs</span>
                <span className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">Méthodes</span>
                <span className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">Outils</span>
              </div>

              {showVeilleDefinition && (
                <div id="veille-definition-content" className="mt-4 space-y-4 border-t border-border/70 pt-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    La veille technologique est un processus d'observation, d'information et d'analyse de l'environnement
                    scientifique, technique et technologique. Elle permet de rester à jour sur les dernières évolutions
                    afin de détecter les menaces et d'anticiper les opportunités de développement.
                  </p>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/90">Objectifs</h3>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li>Faciliter l'identification des ressources pertinentes.</li>
                      <li>Maintenir un flux régulier d'informations dans son domaine.</li>
                      <li>Actualiser ses connaissances en continu.</li>
                      <li>Repérer les évolutions technologiques et scientifiques.</li>
                      <li>Gagner du temps dans l'accès à une information utile.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/90">Accès à l'information</h3>
                    <div className="mt-3 space-y-3">
                      <div className="rounded-lg border border-border bg-card/80 p-3">
                        <p className="text-sm font-semibold text-foreground">Méthode PULL</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          L'utilisateur va chercher l'information lui-même. Cette méthode est précise, mais peut prendre du temps.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Exemples : moteurs de recherche, sites favoris, revues spécialisées, webinaires, livres techniques.
                        </p>
                      </div>

                      <div className="rounded-lg border border-border bg-card/80 p-3">
                        <p className="text-sm font-semibold text-foreground">Méthode PUSH</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          L'information est envoyée automatiquement selon des critères définis. C'est rapide, mais il faut filtrer.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Exemples : newsletters, flux RSS, alertes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>

          <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-foreground">Ma veille technologique</h2>
            <div className="mt-3 inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground">
              Thème : Noyau Linux
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              J'ai choisi ce thème car le noyau Linux est au cœur des infrastructures serveurs et de la sécurité.
              Je l'utilise aussi dans mon mini-lab Proxmox, donc cette veille me permet de suivre les nouveautés utiles
              pour mes projets et ma progression.
            </p>
            <div className="mt-5 rounded-lg border border-border/80 bg-background/40 p-4">
              <h3 className="text-sm font-semibold text-foreground">Flux RSS</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Les articles ci-dessous sont affichés automatiquement depuis mon flux RSS dédié au noyau Linux.
              </p>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-heading text-xl font-semibold text-foreground">Actualités RSS - Noyau Linux</h2>
            {!loading && !error && articles.length > 0 && (
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                {articles.length} article{articles.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {loading ? (
            <div className="rounded-xl border border-border bg-background/50 p-8 text-center">
              <Loader2 size={28} className="mx-auto mb-3 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Chargement des articles...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-border bg-background/50 p-8 text-center">
              <p className="text-sm text-muted-foreground">Impossible de charger les articles pour le moment.</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-xl border border-border bg-background/50 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Aucun article pertinent sur le noyau Linux n'a été trouvé sur la dernière année.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedArticles.map((article, index) => (
                <article
                  key={index}
                  className="group rounded-xl border border-border bg-background/40 p-5 transition-all hover:border-primary/50"
                >
                  <div className="mb-2">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {article.source || article.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>

                  {article.published && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {new Date(article.published).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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
                      Lire l'article
                      <ExternalLink size={14} />
                    </a>
                  )}
                </article>
              ))}

              {hasMore && (
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setDisplayCount(displayCount + 10)}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
                  >
                    Afficher plus d'articles
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <div className="pt-2 text-center">
          <a
            href="/s.sabiran/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-card/80"
          >
            ← Retour au portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
