import { Award, Building2, Calendar, Clock3, ExternalLink } from "lucide-react"
import ScrollFadeIn from "./scroll-fade-in"

type CertificationStatus = "Obtenue" | "En cours" | "À venir"

type Certification = {
  title: string
  issuer: string
  date: string
  status: CertificationStatus
  logoUrl?: string
  description: string
  presentationPoints?: string[]
  skills: string[]
  proofUrl?: string
  verifyUrl?: string
}

// Remplace ou ajoute tes certifications ici.
const certifications: Certification[] = [
  {
    title: "Microsoft 365 : Gestion des identités et de la mobilité",
    issuer: "LinkedIn Learning",
    date: "2026",
    status: "Obtenue",
    logoUrl: "/s.sabiran/logos/microsoft-entra-id.svg",
    description:
      "Certification obtenue pour renforcer la gestion des identités et la mobilité des appareils dans un environnement Microsoft 365 avec Entra ID et Intune.",
    presentationPoints: [
      "Pourquoi cette certification: consolider mes pratiques d'administration Microsoft 365 utilisées en alternance.",
      "Ce que j'apprends: gestion des identités, accès, authentification forte et pilotage de la mobilité via Intune.",
      "Ce que ça apporte en entreprise: onboarding plus structuré, accès mieux sécurisés et meilleure conformité des appareils.",
    ],
    skills: ["Microsoft 365", "Microsoft Entra ID", "Intune", "IAM", "MFA", "Mobilité"],
    proofUrl: "/s.sabiran/docs/certificat-linkedin-microsoft-365-identites-mobilite.pdf",
    verifyUrl: "https://www.linkedin.com/learning/microsoft-365-gestion-des-identites-et-de-la-mobilite",
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
            Espace dédié à la présentation de tes certifications, avec leur utilité concrète.
          </p>
          <div className="mx-auto mb-10 mt-3 h-1 w-16 rounded-full bg-primary" />

          <div className="flex justify-center">
            {certifications.map((cert) => (
              <article
                key={`${cert.title}-${cert.issuer}`}
                className="group flex w-full max-w-2xl flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {cert.logoUrl && (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-background/70 p-2">
                        <img src={cert.logoUrl} alt={`Logo ${cert.issuer}`} className="h-full w-full object-contain" />
                      </div>
                    )}
                    <h3 className="font-heading text-base font-bold text-foreground">{cert.title}</h3>
                  </div>
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

                {cert.presentationPoints && cert.presentationPoints.length > 0 && (
                  <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">Présentation</p>
                    <ul className="mt-2 space-y-1.5">
                      {cert.presentationPoints.map((point) => (
                        <li key={point} className="text-xs leading-relaxed text-muted-foreground">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                      Voir
                    </a>
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
