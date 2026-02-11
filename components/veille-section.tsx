import { Cpu, Server, CheckCircle2, TrendingUp } from "lucide-react"

const veilles = [
  {
    icon: Cpu,
    title: "Noyau Linux",
    subtitle: "Cœur du systeme GNU/Linux",
    reasons: [
      { point: "Element central", desc: "Gere la communication entre materiel et logiciels" },
      { point: "Mises a jour frequentes", desc: "Nouvelles fonctionnalites, corrections de bugs et patches de securite" },
      { point: "Impacts concrets", desc: "Compatibilite materielle, performances, securite, systemes de fichiers" },
    ],
    usage: "Comprendre et surveiller le noyau m'aide dans mon usage quotidien des distributions Linux (Mint, Debian, Fedora, Arch) pour la resolution de problemes materiels et la personnalisation du systeme.",
    distributions: ["Linux Mint", "Debian 12", "Fedora", "Arch Linux"],
  },
  {
    icon: Server,
    title: "Virtualisation",
    subtitle: "Infrastructure moderne et modulaire",
    reasons: [
      { point: "Technologie essentielle", desc: "Optimisation des ressources, modularite et facilite de maintenance" },
      { point: "Evolutions constantes", desc: "Performance, securite, hyperviseurs (KVM, Proxmox), conteneurs (LXC, Docker)" },
      { point: "Applications pratiques", desc: "Deploiement isole, securite reseau, cloud computing, automatisation" },
    ],
    usage: "J'utilise Proxmox VE pour creer des environnements de test, heberger des services (FreshRSS) et deployer des portails captifs (ALCASAR). J'automatise les deployements via Bash et supervise avec Zabbix.",
    technologies: ["Proxmox VE", "Docker", "LXC", "Zabbix", "ALCASAR"],
  },
]

export default function VeilleSection() {
  return (
    <section id="veille" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-4">Veille Technologique</h2>
        <p className="text-center text-muted-foreground mb-4">
          {"Mes sujets de veille technologique dans le cadre de mon BTS SIO SISR"}
        </p>
        <div className="mx-auto mb-12 h-1 w-16 rounded-full bg-primary" />

        <div className="grid gap-8 lg:grid-cols-2">
          {veilles.map((veille) => {
            const Icon = veille.icon
            return (
              <div key={veille.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">{veille.title}</h3>
                    <p className="text-sm text-muted-foreground">{veille.subtitle}</p>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  {veille.reasons.map((reason) => (
                    <div key={reason.point} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{reason.point}</span>
                        <span className="text-sm text-muted-foreground">{" : "}{reason.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 rounded-lg bg-muted p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp size={16} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">Utilisation personnelle</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{veille.usage}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(veille.distributions || veille.technologies)?.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
