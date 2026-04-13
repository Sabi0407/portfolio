"use client"

import { GraduationCap, Briefcase, CheckCircle, Clock, ChevronDown, Download, ExternalLink, X, Building2, ListChecks, Files } from "lucide-react"
import ScrollFadeIn from "./scroll-fade-in"
import { useState } from "react"

type ExperienceDoc = {
  title: string
  description: string
  url: string
}

type ExperienceDetails = {
  logo: string
  companySummary: string
  missionSummary: string
  missions: string[]
  docs: ExperienceDoc[]
}

type TimelineItem = {
  status: string
  statusColor: string
  date: string
  org: string
  title: string
  desc: string
  icon: typeof GraduationCap
  details?: ExperienceDetails
}

const timeline: TimelineItem[] = [
  {
    status: "Obtenu",
    statusColor: "bg-accent text-accent-foreground",
    date: "2017",
    org: "Lycée",
    title: "BAC PRO SEN - Système Électronique et Numérique",
    desc: "Formation en systèmes électroniques et numériques. Installation, mise en service et maintenance de systèmes électroniques et informatiques.",
    icon: GraduationCap,
  },
  {
    status: "Réalisé",
    statusColor: "bg-accent text-accent-foreground",
    date: "Mai 2015 - Juin 2017",
    org: "SOS Master Paris",
    title: "Technicien de maintenance informatique - Stage",
    desc: "Diagnostic et réparation de pannes matérielles et logicielles, installation de systèmes d'exploitation et remplacement de composants sur postes clients.",
    icon: Briefcase,
    details: {
      logo: "/s.sabiran/logos/sos-master.png",
      companySummary:
        "SOS Master Paris propose des prestations de maintenance et de réparation informatique pour remettre rapidement en service les postes des utilisateurs.",
      missionSummary:
        "Pendant ce stage, j'ai assuré la remise en état de postes informatiques en traitant les pannes et en remplaçant les composants défectueux.",
      missions: [
        "Diagnostic de pannes matérielles et logicielles sur postes clients.",
        "Installation et réinstallation de systèmes d'exploitation (Windows, Linux, macOS).",
        "Remplacement de composants: disque dur, batterie, RAM et écran.",
        "Contrôle final du poste avant restitution à l'utilisateur.",
      ],
      docs: [
        {
          title: "CV - Expérience SOS Master",
          description: "Présentation synthétique de mon stage chez SOS Master Paris.",
          url: "/s.sabiran/CV_SRIKANTHAN_Sabiran.pdf",
        },
      ],
    },
  },
  {
    status: "Réalisé",
    statusColor: "bg-accent text-accent-foreground",
    date: "Nov 2024 - Avril 2025",
    org: "IPSSI - Projet étudiant",
    title: "Technicien Systèmes et Réseaux",
    desc: "Projet pratique d'administration système et réseau : installation et configuration de GLPI, création de domaine Active Directory avec GPO, mise en place de Zabbix (supervision), support technique Windows/Linux.",
    icon: Briefcase,
  },
  {
    status: "En cours",
    statusColor: "bg-primary text-primary-foreground",
    date: "Oct 2024 - Juin 2026",
    org: "IPSSI",
    title: "BTS SIO - Option SISR",
    desc: "Formation en Solutions d'Infrastructure Systèmes et Réseaux. Administration système Windows/Linux, configuration et maintenance réseaux, virtualisation et sécurité informatique.",
    icon: GraduationCap,
  },
  {
    status: "Réalisé",
    statusColor: "bg-accent text-accent-foreground",
    date: "Avril 2025 - Juin 2025",
    org: "Biblix Systèmes - Éditeur de logiciels pour bibliothèques",
    title: "Technicien Systèmes et Réseaux - Stage",
    desc: "Stage chez Biblix Systèmes, éditeur français de solutions de gestion pour bibliothèques depuis 2012. Mission principale : mise en place d'un portail captif Alcasar via Proxmox pour sécuriser l'accès réseau. Configuration et déploiement de l'infrastructure de filtrage et d'authentification dans un environnement virtualisé.",
    icon: Briefcase,
    details: {
      logo: "/s.sabiran/logos/biblix-systemes.png",
      companySummary:
        "Biblix Systèmes développe et maintient des solutions informatiques pour les bibliothèques, afin de simplifier la gestion des accès, des postes publics et des services numériques.",
      missionSummary:
        "Pendant mon stage, j'ai contribué à sécuriser l'infrastructure réseau utilisée par les postes publics et à fiabiliser l'accès internet des utilisateurs.",
      missions: [
        "Déploiement d'ALCASAR sous Proxmox avec configuration LAN, WAN et Wi-Fi.",
        "Mise en place du filtrage DNS et SafeSearch pour sécuriser la navigation.",
        "Création d'une interface AutoIt reliée aux API ALCASAR pour faciliter la connexion utilisateur.",
        "Création et structuration d'une base MariaDB pour stocker les informations nécessaires au portail.",
        "Analyse des logs et ajustements de configuration pour fiabiliser le service.",
      ],
      docs: [
        {
          title: "Mise en place d'ALCASAR",
          description: "Documentation principale du déploiement réalisé en stage.",
          url: "/s.sabiran/docs/stage-alcasar-mise-en-place.pdf",
        },
        {
          title: "Configuration DNS Unbound",
          description: "Filtrage DNS et SafeSearch dans l'environnement ALCASAR.",
          url: "/s.sabiran/docs/stage-unbound-alcasar.pdf",
        },
        {
          title: "Configuration du point d'accès Wi-Fi",
          description: "Intégration du Wi-Fi avec le portail captif ALCASAR.",
          url: "/s.sabiran/docs/stage-configuration-point-acces.pdf",
        },
      ],
    },
  },
  {
    status: "En cours",
    statusColor: "bg-primary text-primary-foreground",
    date: "Sept 2025 - Aujourd'hui",
    org: "Bertrand Hospitality - Groupe Bertrand",
    title: "Alternant Technicien Support Informatique - Sur site",
    desc: "Alternance en support informatique de proximité: assistance utilisateurs, traitement des tickets, préparation des postes et maintien en condition opérationnelle du parc dans les établissements.",
    icon: Briefcase,
    details: {
      logo: "/s.sabiran/logos/bertrand-hospitality.jpg",
      companySummary:
        "Bertrand Hospitality est le pôle restauration et hôtellerie du Groupe Bertrand. L'entreprise exploite des brasseries, des restaurants, des salons de thé, des hôtels et des activités événementielles.",
      missionSummary:
        "En alternance, j'interviens directement dans les établissements pour assurer la continuité de service informatique des équipes.",
      missions: [
        "Support utilisateur niveau 1 (logiciels, postes, accès, périphériques et réseau local).",
        "Préparation, configuration et déploiement des postes de travail pour les nouveaux arrivants.",
        "Enrôlement des postes Windows dans Intune / Autopilot et vérification de la conformité.",
        "Suivi des tickets et communication avec les utilisateurs jusqu'à résolution.",
        "Maintenance préventive et corrective du parc informatique en établissement.",
        "Accompagnement des utilisateurs sur les outils Microsoft 365.",
      ],
      docs: [
        {
          title: "Tableau E5 - Missions en entreprise",
          description: "Synthèse des activités réalisées en alternance.",
          url: "/s.sabiran/docs/tableau-e5-synthese.pdf",
        },
        {
          title: "CV - Expériences professionnelles",
          description: "Vue globale de mes missions réalisées chez Bertrand Hospitality.",
          url: "/s.sabiran/CV_SRIKANTHAN_Sabiran.pdf",
        },
      ],
    },
  },
]

export default function ParcoursSection() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  const [activeDetails, setActiveDetails] = useState<TimelineItem | null>(null)
  const [activeDoc, setActiveDoc] = useState<ExperienceDoc | null>(null)

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <section id="parcours" className="py-16 px-6 relative bg-card">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ScrollFadeIn>
        <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-center">
          <div className="inline-block bg-black/90 border border-primary/30 rounded px-4 py-2 mb-2">
            <span className="text-primary font-mono text-sm">$ history | grep career</span>
          </div>
        </div>
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-3">
          Mon Parcours
        </h2>
        <p className="text-center text-muted-foreground mb-3">Mon évolution académique et professionnelle</p>
        <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-primary" />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-border to-primary/50 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon
              const isLeft = i % 2 === 0
              const isExpanded = expandedItems.has(i)
              const descLength = item.desc.length
              const shouldTruncate = descLength > 150
              const hasDetails = Boolean(item.details)

              return (
                <div key={item.title} className="relative flex items-start gap-6 md:gap-0">
                  <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2" />

                  <div
                    className={`ml-12 w-full rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 md:ml-0 md:w-[calc(50%-2rem)] ${
                      hasDetails ? "border-primary/20 bg-gradient-to-b from-background to-card/50 shadow-[0_0_0_1px_rgba(59,130,246,0.08)]" : ""
                    } ${
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
                    <p className={`text-sm leading-relaxed text-muted-foreground ${!isExpanded && shouldTruncate ? 'line-clamp-2' : ''}`}>
                      {item.desc}
                    </p>
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(i)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-colors"
                      >
                        {isExpanded ? 'Voir moins' : 'Voir plus'}
                        <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    {hasDetails && (
                      <button
                        onClick={() => {
                          setActiveDoc(null)
                          setActiveDetails(item)
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <ExternalLink size={13} />
                        En savoir plus
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </ScrollFadeIn>

      {activeDetails?.details && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => {
            setActiveDoc(null)
            setActiveDetails(null)
          }}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-b from-background to-card/40 shadow-2xl ring-1 ring-primary/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-between border-b border-primary/20 bg-card px-5 py-3">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary">Parcours professionnel</p>
                <h3 className="font-heading text-lg font-bold text-foreground">{activeDetails.org}</h3>
                <p className="text-xs text-muted-foreground">{activeDetails.title} • {activeDetails.date}</p>
              </div>
              <button
                onClick={() => {
                  setActiveDoc(null)
                  setActiveDetails(null)
                }}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Fermer la prévisualisation"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(92vh-76px)] overflow-y-auto bg-gradient-to-b from-background via-background to-card/30 p-5 md:p-6">
              <div className="grid gap-6 md:grid-cols-[240px_1fr]">
                <div className="rounded-xl border border-primary/20 bg-card p-4">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <Building2 size={12} />
                    Entreprise
                  </div>
                  <div className="flex h-32 items-center justify-center rounded-lg border border-border bg-gradient-to-b from-background to-card/60 p-3">
                    <img
                      src={activeDetails.details.logo}
                      alt={`Logo ${activeDetails.org}`}
                      className="max-h-full w-full object-contain"
                    />
                  </div>
                  <div className="mt-3 rounded-lg border border-border bg-background/70 p-3">
                    <h4 className="font-heading text-xs font-bold uppercase tracking-wide text-foreground">Présentation</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {activeDetails.details.companySummary}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-xl border border-primary/20 bg-card p-4">
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      <Briefcase size={12} />
                      Mon rôle
                    </div>
                    <h4 className="font-heading text-sm font-bold text-foreground">Mon rôle</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeDetails.details.missionSummary}</p>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-card p-4">
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      <ListChecks size={12} />
                      Missions
                    </div>
                    <h4 className="font-heading text-sm font-bold text-foreground">Missions principales</h4>
                    <ul className="mt-2 space-y-2">
                      {activeDetails.details.missions.map((mission) => (
                        <li
                          key={mission}
                          className="flex items-start gap-2 rounded-lg border border-border bg-background/70 px-3 py-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <CheckCircle size={14} className="mt-0.5 shrink-0 text-primary" />
                          <span>{mission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {activeDetails.details.docs.length > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <Files size={12} />
                    Documents
                  </div>
                  <h4 className="font-heading text-sm font-bold text-foreground">Documents associés</h4>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {activeDetails.details.docs.map((doc) => (
                      <div key={doc.title} className="rounded-lg border border-primary/20 bg-card p-4 transition-colors hover:border-primary/40">
                        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <Files size={14} className="text-primary" />
                          {doc.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{doc.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveDoc(doc)}
                            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
                          >
                            <ExternalLink size={13} />
                            Prévisualiser
                          </button>
                          {!doc.url.startsWith("http") && (
                            <a
                              href={doc.url}
                              download
                              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40"
                            >
                              <Download size={13} />
                              Télécharger
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeDoc && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveDoc(null)}
        >
          <div
            className="relative h-[90vh] w-full max-w-6xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border bg-card p-4">
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">{activeDoc.title}</h3>
                <p className="text-xs text-muted-foreground">{activeDoc.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {!activeDoc.url.startsWith("http") && (
                  <a
                    href={activeDoc.url}
                    download
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-105"
                  >
                    <Download size={14} />
                    Télécharger
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveDoc(null)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Fermer la prévisualisation document"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              src={activeDoc.url}
              className="h-[calc(100%-4rem)] w-full"
              title={activeDoc.title}
            />
          </div>
        </div>
      )}
    </section>
  )
}
