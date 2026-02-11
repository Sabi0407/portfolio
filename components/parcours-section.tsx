import { GraduationCap, Briefcase, CheckCircle, Clock } from "lucide-react"

const timeline = [
  {
    status: "En cours",
    statusColor: "bg-primary text-primary-foreground",
    date: "Sept 2025 - Aujourd'hui",
    org: "Groupe Bertrand",
    title: "Support Informatique Niveau 1 - Alternance",
    desc: "Alternance en support informatique de niveau 1. Assistance et depannage des utilisateurs, gestion des tickets, maintenance du parc informatique, resolution des incidents materiels et logiciels.",
    icon: Briefcase,
  },
  {
    status: "En cours",
    statusColor: "bg-primary text-primary-foreground",
    date: "Oct 2024 - Juin 2026",
    org: "IPSSI",
    title: "BTS SIO - Option SISR",
    desc: "Formation en Solutions d'Infrastructure Systemes et Reseaux. Administration systeme Windows/Linux, configuration et maintenance reseaux, virtualisation et securite informatique.",
    icon: GraduationCap,
  },
  {
    status: "Realise",
    statusColor: "bg-accent text-accent-foreground",
    date: "Avril 2025 - Juin 2025",
    org: "Biblix Systeme",
    title: "Mise en place d'un portail captif Alcasar - Stage",
    desc: "Mise en place d'un portail captif Alcasar via Proxmox. Configuration et deploiement de l'infrastructure de filtrage et d'authentification reseau dans un environnement virtualise.",
    icon: Briefcase,
  },
  {
    status: "Realise",
    statusColor: "bg-accent text-accent-foreground",
    date: "Nov 2024 - Avril 2025",
    org: "IPSSI - Projet etudiant",
    title: "Technicien Systemes et Reseaux",
    desc: "Projet pratique d'administration systeme et reseau : Installation et configuration de GLPI, creation domaine Active Directory avec GPO, mise en place de Zabbix (supervision), support technique Windows/Linux.",
    icon: Briefcase,
  },
  {
    status: "Realise",
    statusColor: "bg-accent text-accent-foreground",
    date: "2017",
    org: "SOS Master Paris",
    title: "Stage - Technicien Informatique",
    desc: "Installation de systemes d'exploitation (macOS, Linux, Windows), changement de pieces detachees, diagnostic et reparation de materiel informatique.",
    icon: Briefcase,
  },
  {
    status: "Obtenu",
    statusColor: "bg-accent text-accent-foreground",
    date: "2017",
    org: "Lycee",
    title: "BAC PRO SEN - Systeme Electronique & Numerique",
    desc: "Formation en systemes electroniques et numeriques. Installation, mise en service et maintenance de systemes electroniques et informatiques.",
    icon: GraduationCap,
  },
]

export default function ParcoursSection() {
  return (
    <section id="parcours" className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-4">Mon Parcours</h2>
        <p className="text-center text-muted-foreground mb-4">{"Mon evolution academique et professionnelle"}</p>
        <div className="mx-auto mb-12 h-1 w-16 rounded-full bg-primary" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon
              const isLeft = i % 2 === 0
              return (
                <div key={item.title} className="relative flex items-start gap-6 md:gap-0">
                  {/* Dot on the timeline */}
                  <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2" />

                  {/* Content card */}
                  <div
                    className={`ml-12 w-full rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:mr-auto md:pr-6" : "md:ml-auto md:pl-6"
                    }`}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${item.statusColor}`}>
                        {item.status === "En cours" ? <Clock size={12} /> : <CheckCircle size={12} />}
                        {item.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-xs font-medium text-primary mb-1">{item.org}</p>
                    <h3 className="font-heading text-base font-bold text-foreground mb-2 flex items-center gap-2">
                      <Icon size={16} className="text-primary" />
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
