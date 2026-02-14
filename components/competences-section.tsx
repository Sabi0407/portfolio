import { Monitor, Network, Container, Globe, Terminal, ShieldCheck } from "lucide-react"
import PDFPreview from "./pdf-preview"
import ScrollFadeIn from "./scroll-fade-in"

const skills = [
  {
    icon: Monitor,
    title: "Systèmes d'exploitation",
    subtitle: "Windows / Linux",
    tags: ["Windows Server", "Windows 10/11", "Debian", "Ubuntu Server", "Active Directory", "GPO"],
  },
  {
    icon: Container,
    title: "Virtualisation & Conteneurisation",
    subtitle: "Hyperviseurs / Conteneurs",
    tags: ["Proxmox VE", "Proxmox Backup Server", "VirtualBox", "LXC", "Docker", "Gestion des VMs"],
  },
  {
    icon: Globe,
    title: "Services & Applications",
    subtitle: "Infrastructure IT",
    tags: ["Apache", "GLPI", "Samba", "Alcasar", "Entra ID", "Intune", "DHCP/DNS"],
  },
  {
    icon: ShieldCheck,
    title: "Sécurité & Supervision",
    subtitle: "Monitoring / Protection",
    tags: ["Zabbix", "Tailscale VPN", "Pare-feu", "Sauvegardes", "SSL/TLS", "SSH"],
  },
]

export default function CompetencesSection() {
  return (
    <section id="competences" className="py-20 px-6 bg-card">
      <ScrollFadeIn>
        <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <div className="inline-block bg-black/90 border border-primary/30 rounded px-4 py-2 mb-2">
            <span className="text-primary font-mono text-sm">$ ls -la ~/skills/</span>
          </div>
        </div>
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-3">
          Compétences
        </h2>
        <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-primary" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.title}
                className="group rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-bold text-foreground truncate">{skill.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{skill.subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-4">Documents</p>
          <div className="grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto">
            <PDFPreview 
              pdfUrl="/portfolio/CV_SRIKANTHAN_Sabiran.pdf" 
              title="Mon CV"
              description="Technicien Systèmes & Réseaux - Alternance Support N1"
            />
            <PDFPreview 
              pdfUrl="/portfolio/docs/tableau-e5-synthese.pdf" 
              title="Tableau E5"
              description="Synthèse des compétences BTS SIO SISR"
            />
          </div>
        </div>
      </div>
      </ScrollFadeIn>
    </section>
  )
}
