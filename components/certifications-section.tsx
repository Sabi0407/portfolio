import { Award, Building2, Calendar, Clock3, Download, ExternalLink } from "lucide-react"
import ScrollFadeIn from "./scroll-fade-in"

type CertificationStatus = "Obtenue" | "En cours" | "À venir"

type Certification = {
  title: string
  issuer: string
  date: string
  status: CertificationStatus
  description: string
  skills: string[]
  proofUrl?: string
  verifyUrl?: string
}

// Remplace ou ajoute tes certifications ici.
const certifications: Certification[] = [
  {
    title: "Certification Linux (à compléter)",
    issuer: "Organisme certificateur",
    date: "2026",
    status: "À venir",
    description:
      "Exemple de carte. Tu peux remplacer ce texte par la description officielle de ta certification.",
    skills: ["Linux", "Administration", "Systèmes"],
  },
  {
    title: "Certification Réseaux (à compléter)",
    issuer: "Organisme certificateur",
    date: "2026",
    status: "À venir",
    description:
      "Ajoute ici ce que valide la certification: réseau, sécurité, dépannage ou supervision.",
    skills: ["Réseau", "TCP/IP", "Sécurité"],
  },
  {
    title: "Certification Microsoft / Cloud (à compléter)",
    issuer: "Organisme certificateur",
    date: "2026",
    status: "À venir",
    description:
      "Ajoute le niveau de certification et le périmètre couvert (Microsoft 365, Azure, Intune, etc.).",
    skills: ["Cloud", "Microsoft", "Intune"],
  },
]

function getStatusClass(status: CertificationStatus) {
  if (status === "Obtenue") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
  }
  if (status === "En cours") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-300"
  }
  return "border-primary/30 bg-primary/10 text-primary"
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-6 relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ScrollFadeIn>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <div className="inline-block rounded border border-primary/30 bg-black/90 px-4 py-2">
              <span className="font-mono text-sm text-primary">$ ls ~/certifications</span>
            </div>
          </div>

          <h2 className="font-heading text-center text-3xl font-bold text-foreground">Certifications</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            Espace dédié à tes certifications techniques, avec preuve et lien de vérification.
          </p>
          <div className="mx-auto mb-10 mt-3 h-1 w-16 rounded-full bg-primary" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <article
                key={`${cert.title}-${cert.issuer}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-heading text-base font-bold text-foreground">{cert.title}</h3>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${getStatusClass(cert.status)}`}
                  >
                    {cert.status === "En cours" ? <Clock3 size={12} /> : <Award size={12} />}
                    {cert.status}
                  </span>
                </div>

                <div className="mb-3 space-y-1.5 text-xs text-muted-foreground">
                  <p className="inline-flex items-center gap-1.5">
                    <Building2 size={13} className="text-primary" />
                    {cert.issuer}
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    <Calendar size={13} className="text-primary" />
                    {cert.date}
                  </p>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{cert.description}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={`${cert.title}-${skill}`}
                      className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {cert.proofUrl ? (
                  <div className="mt-auto flex flex-wrap gap-2 border-t border-border pt-4">
                    <a
                      href={cert.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:scale-105"
                    >
                      <ExternalLink size={13} />
                      Ouvrir preuve
                    </a>
                    {!cert.proofUrl.startsWith("http") && (
                      <a
                        href={cert.proofUrl}
                        download
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40"
                      >
                        <Download size={13} />
                        Télécharger
                      </a>
                    )}
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40"
                      >
                        <ExternalLink size={13} />
                        Vérifier
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="mt-auto rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                    Ajoute la preuve dans <span className="font-mono text-primary">public/docs</span> puis renseigne{" "}
                    <span className="font-mono text-primary">proofUrl</span>.
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  )
}
