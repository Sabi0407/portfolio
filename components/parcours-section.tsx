"use client"

import { GraduationCap, Briefcase, CheckCircle, Clock, ChevronDown } from "lucide-react"
import ScrollFadeIn from "./scroll-fade-in"
import { useState } from "react"

const timeline = [
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
    date: "2017",
    org: "SOS Master Paris",
    title: "Stage - Technicien Informatique",
    desc: "Installation de systèmes d'exploitation (macOS, Linux, Windows), changement de pièces détachées, diagnostic et réparation de matériel informatique.",
    icon: Briefcase,
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
  },
  {
    status: "En cours",
    statusColor: "bg-primary text-primary-foreground",
    date: "Sept 2025 - Aujourd'hui",
    org: "Bertrand Hospitality - Groupe Bertrand",
    title: "Alternant Technicien Support Informatique - Sur site",
    desc: "Alternance chez Bertrand Hospitality, filiale du Groupe Bertrand (1997), leader français indépendant en hôtellerie-restauration avec 80 établissements d'exception (brasseries emblématiques Lipp, La Gare, salons Angelina, 3 hôtels Relais & Châteaux, Maison Plisson). Support informatique niveau 1 sur site dans les établissements : assistance utilisateurs, gestion des tickets, maintenance du parc informatique et résolution d'incidents.",
    icon: Briefcase,
  },
]

export default function ParcoursSection() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

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

              return (
                <div key={item.title} className="relative flex items-start gap-6 md:gap-0">
                  <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2" />

                  <div
                    className={`ml-12 w-full rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 md:ml-0 md:w-[calc(50%-2rem)] ${
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
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </ScrollFadeIn>
    </section>
  )
}
