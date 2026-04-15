import { Target, BookOpen, Wrench, Code, Server } from "lucide-react"
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

          <div className="mb-12 rounded-xl border border-border bg-card p-6 text-center">
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Bonjour, je m'appelle SRIKANTHAN Sabiran. Je suis étudiant en BTS SIO option SISR à l'IPSSI et
              actuellement en alternance dans le support informatique. Je m'intéresse aux systèmes et aux
              réseaux, avec l'envie de comprendre leur fonctionnement, de résoudre des problèmes concrets et de
              progresser grâce à mes projets personnels et professionnels.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-center font-heading text-2xl font-bold text-foreground">BTS SIO : SLAM &amp; SISR</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Le BTS SIO propose deux options complémentaires selon le métier visé.
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Code size={24} />
              </div>
              <h4 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Option SLAM</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                SLAM signifie <span className="font-medium text-foreground">Solutions Logicielles et Applications Métiers</span>.
                Cette option est orientée développement d'applications (web, logiciel, base de données) pour répondre
                aux besoins des entreprises.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                En pratique, cela sert à créer des outils métier, automatiser des tâches et améliorer le travail quotidien
                des utilisateurs.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Server size={24} />
              </div>
              <h4 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Option SISR</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                SISR signifie <span className="font-medium text-foreground">Solutions d'Infrastructure, Systèmes et Réseaux</span>.
                Cette option est orientée administration des serveurs, réseaux, sécurité et support informatique.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                En pratique, cela sert à garder un système d'information stable, sécurisé et disponible pour tous les
                services de l'entreprise.
              </p>
            </div>
          </div>

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
