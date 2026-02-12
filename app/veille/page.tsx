"use client"

import { ExternalLink, Calendar, Rss, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Article {
  title: string
  link: string
  published: string
  content: string
  category: string
}

const RSS_FEEDS = [
  {
    url: "https://www.google.com/alerts/feeds/01795030495122666327/5342274990297030118",
    category: "Noyau Linux",
  },
  {
    url: "https://www.google.com/alerts/feeds/01795030495122666327/13620015609216544489",
    category: "Virtualisation",
  },
  {
    url: "https://www.google.com/alerts/feeds/01795030495122666327/15985397799960613911",
    category: "Virtualisation",
  },
]

export default function VeillePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("Tout")
  const [displayCount, setDisplayCount] = useState(10)

  useEffect(() => {
    async function fetchAllRSS() {
      try {
        const allArticles: Article[] = []

        for (const feed of RSS_FEEDS) {
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`
          )
          const data = await response.json()

          if (data.status === "ok") {
            const feedArticles = data.items.map((item: any) => ({
              title: item.title,
              link: item.link,
              published: item.pubDate,
              content: item.description || item.content,
              category: feed.category,
            }))
            allArticles.push(...feedArticles)
          }
        }

        allArticles.sort(
          (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
        )

        setArticles(allArticles)
      } catch (err) {
        console.error("Error fetching RSS:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchAllRSS()
  }, [])

  const filteredArticles =
    selectedCategory === "Tout"
      ? articles
      : articles.filter((article) => article.category === selectedCategory)

  const displayedArticles = filteredArticles.slice(0, displayCount)
  const hasMore = displayCount < filteredArticles.length

  const categories = ["Tout", ...Array.from(new Set(RSS_FEEDS.map((feed) => feed.category)))]

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
            Suivez mes alertes Google sur la virtualisation et le noyau Linux
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "border border-border bg-card text-foreground hover:border-primary/50 hover:bg-card/80"
              }`}
            >
              {category}
            </button>
          ))}
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
            <p className="text-muted-foreground">Aucun article disponible pour le moment.</p>
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
                      {article.category}
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
                  <div
                    className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
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
            href="/portfolio/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 text-sm font-semibold text-foreground shadow-lg transition-all hover:scale-105 hover:border-primary hover:bg-card/80"
          >
            ← Retour au portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
