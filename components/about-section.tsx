import { Target, BookOpen, Wrench } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="apropos" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-4">
          {"A propos"}
        </h2>
        <div className="mx-auto mb-12 h-1 w-16 rounded-full bg-primary" />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Objectif</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {"Devenir Administrateur Systemes et Reseaux, un metier qui combine expertise technique, resolution de problemes et innovation technologique."}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <BookOpen size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Formation</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {"Je poursuis actuellement une formation BTS SIO option SISR a l'IPSSI, avec une specialisation en administration des systemes et reseaux."}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wrench size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Passion</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {"Passionne par les technologies de l'information, en particulier l'administration systeme Linux et Windows, la virtualisation et la securite informatique."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
