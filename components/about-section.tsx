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
              {"Devenir Administrateur Systemes, specialise dans la gestion des infrastructures, la virtualisation et la supervision des environnements IT."}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <BookOpen size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Formation</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {"Etudiant en BTS SIO option SISR a l'IPSSI, je me forme aux technologies des systemes d'information et aux infrastructures informatiques."}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wrench size={24} />
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">Passion</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {"Passionne par les systemes, j'aime comprendre comment ca fonctionne, resoudre des problemes concrets et mettre en place des serveurs Proxmox avec differents services : Active Directory, GLPI, Zabbix."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
