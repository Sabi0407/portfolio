import Link from "next/link"
import { ArrowLeft, BookOpen, Rss, SearchCheck } from "lucide-react"

export default function VeilleDefinitionPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen size={28} className="text-primary" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Veille technologique</p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Qu'est-ce qu'une veille technologique ?
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            La veille technologique est un processus d'observation, d'information et d'analyse de l'environnement
            scientifique, technique et technologique. Elle permet de rester à jour sur les dernières évolutions afin de
            détecter les menaces et d'anticiper les opportunités de développement.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <SearchCheck size={20} className="text-primary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">Objectifs</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>Faciliter l'identification des ressources pertinentes.</li>
              <li>Maintenir un flux régulier d'informations dans son domaine.</li>
              <li>Actualiser ses connaissances en continu.</li>
              <li>Repérer les évolutions technologiques et scientifiques.</li>
              <li>Gagner du temps dans l'accès à une information utile.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Rss size={20} className="text-primary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">Accès à l'information</h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-border/80 bg-background/40 p-4">
                <h3 className="text-sm font-semibold text-foreground">Méthode PULL</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  L'utilisateur va chercher l'information lui-même. Cette méthode est précise, mais peut prendre du temps.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Exemples : moteurs de recherche, sites favoris, revues spécialisées, webinaires, livres techniques.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-background/40 p-4">
                <h3 className="text-sm font-semibold text-foreground">Méthode PUSH</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  L'information est envoyée automatiquement selon des critères définis. C'est rapide, mais il faut filtrer.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Exemples : newsletters, flux RSS, alertes.
                </p>
              </div>
            </div>
          </article>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/veille"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft size={16} />
            Retour à la veille
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Retour au portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
