import { Target, BookOpen, Wrench } from "lucide-react"
import ScrollFadeIn from "./scroll-fade-in"

export default function AboutSection() {
  return (
    <section id="apropos" className="py-24 px-6 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)]">
      <ScrollFadeIn>
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 text-center">
            <div className="inline-block bg-black/90 border border-primary/30 rounded px-4 py-2 mb-2">
              <span className="text-primary font-mono text-sm">$ whoami</span>
            </div>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-4">
            À propos
          </h2>
          <div className="mx-auto mb-12 h-1 w-16 rounded-full bg-primary" />

          <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Objectif</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Devenir Administrateur Systèmes, spécialisé dans la gestion des infrastructures, la virtualisation et la supervision des environnements IT.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <BookOpen size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Formation</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Étudiant en BTS SIO option SISR à l'IPSSI, je me forme aux technologies des systèmes d'information et aux infrastructures informatiques.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wrench size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Passion</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Passionné par les systèmes, j'aime comprendre comment ça fonctionne, résoudre des problèmes concrets et mettre en place des serveurs Proxmox avec différents services : Active Directory, GLPI, Zabbix.
            </p>
          </div>
        </div>
      </div>
      </ScrollFadeIn>
    </section>
  )
}
