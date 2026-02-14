"use client"

import { ExternalLink, Download, User, Briefcase, BookOpen, FolderOpen, Github, GraduationCap } from "lucide-react"
import { useState } from "react"
import PDFPreview from "./pdf-preview"
import ScrollFadeIn from "./scroll-fade-in"

type Project = {
  title: string
  desc: string
  tags: string[]
  pdf: string
  docStatus?: string
  github?: string
}

const categories = [
  {
    id: "perso",
    label: "Projet Perso",
    icon: User,
    projects: [
      {
        title: "Mise en place d'Arch Linux avec environnement de bureau",
        desc: "Installation complète d'Arch Linux : configuration du terminal, disposition clavier français, partitionnement manuel des disques, installation du système de base et déploiement d'un environnement de bureau fonctionnel.",
        tags: ["Arch Linux", "Linux", "Terminal", "Partitionnement", "DE"],
        pdf: "/portfolio/docs/installation-arch-linux.pdf",
      },
      {
        title: "Mise en place d'un serveur Samba et de Tailscale",
        desc: "Installation et configuration d'un serveur Samba pour le partage de fichiers réseau et déploiement de Tailscale pour un VPN mesh sécurisé permettant un accès distant aux ressources internes.",
        tags: ["Samba", "Tailscale", "VPN", "Partage de fichiers", "Réseau"],
        pdf: "",
      },
      {
        title: "Mise en place de Jellyfin",
        desc: "Déploiement et configuration de Jellyfin, un serveur multimédia open-source pour le streaming de contenus vidéo, audio et photo avec gestion de bibliothèques et transcodage.",
        tags: ["Jellyfin", "Streaming", "Multimédia", "Serveur", "Media"],
        pdf: "",
      },
      {
        title: "Mise en place de Glance",
        desc: "Installation et configuration de Glance, un tableau de bord de supervision pour la surveillance et l'affichage centralisé des métriques système et services en temps réel.",
        tags: ["Glance", "Dashboard", "Supervision", "Monitoring", "Métriques"],
        pdf: "",
      },
    ] as Project[],
  },
  {
    id: "alternance",
    label: "Projet Alternance",
    icon: Briefcase,
    projects: [
      {
        title: "Support informatique N1 - Groupe Bertrand",
        desc: "Gestion des tickets d'incidents, assistance aux utilisateurs, maintenance du parc informatique, déploiement de postes et résolution de problèmes matériels/logiciels.",
        tags: ["GLPI", "Active Directory", "Windows", "Ticketing", "Support"],
        pdf: "",
      },
      {
        title: "Déploiement et préparation des postes",
        desc: "Installation, configuration et mise à disposition de postes de travail pour les équipes, avec vérification des accès et des outils essentiels.",
        tags: ["Déploiement", "Postes", "Windows", "Support", "Préparation"],
        pdf: "",
      },
      {
        title: "Support utilisateurs et suivi quotidien",
        desc: "Accompagnement des utilisateurs au quotidien, résolution des incidents courants et suivi des demandes jusqu'à la clôture.",
        tags: ["Support", "Incidents", "Utilisateurs", "Ticketing", "Suivi"],
        pdf: "",
      },
    ] as Project[],
  },
  {
    id: "stage",
    label: "Stage",
    icon: GraduationCap,
    projects: [
      {
        title: "Mise en place d'ALCASAR",
        desc: "Installation et configuration complète du portail captif ALCASAR pour le filtrage et l'authentification réseau. Déploiement de l'infrastructure de base pour contrôler l'accès internet.",
        tags: ["ALCASAR", "Portail captif", "Installation", "Configuration", "Réseau"],
        pdf: "/portfolio/docs/stage-alcasar-mise-en-place.pdf",
      },
      {
        title: "Configuration du point d'accès WiFi pour ALCASAR",
        desc: "Configuration complète d'un point d'accès WiFi pour intégration avec le portail captif ALCASAR. Paramétrage matériel réseau, configuration SSID, sécurisation WPA2 et mise en place de la connexion sans fil.",
        tags: ["WiFi", "Point d'accès", "Configuration", "Réseau", "ALCASAR"],
        pdf: "/portfolio/docs/stage-configuration-point-acces.pdf",
      },
      {
        title: "Configuration et débogage du serveur DNS Unbound",
        desc: "Configuration avancée du serveur DNS Unbound pour forcer SafeSearch sur Google, Bing et YouTube. Résolution de conflits, gestion des local-zones, optimisation des performances et mise en place du filtrage DNS.",
        tags: ["Unbound", "DNS", "SafeSearch", "Filtrage", "Débogage"],
        pdf: "/portfolio/docs/stage-unbound-alcasar.pdf",
      },
      {
        title: "Personnalisation du portail captif ALCASAR",
        desc: "Modification de l'interface graphique du portail captif ALCASAR et réorganisation de l'arborescence fichiers système. Personnalisation visuelle, adaptation des pages d'authentification et organisation structurelle.",
        tags: ["Portail captif", "Personnalisation", "Interface", "Organisation"],
        pdf: "/portfolio/docs/stage-modification-portail-captif.pdf",
      },
      {
        title: "Analyse comparative des configurations Firefox",
        desc: "Étude comparative approfondie des méthodes de configuration centralisée Firefox : fichier policies.json (format JSON moderne) versus firefox.cfg (format AutoConfig legacy). Analyse des avantages et choix de solution.",
        tags: ["Firefox", "Configuration", "Policies", "Déploiement", "Navigateur"],
        pdf: "/portfolio/docs/stage-firefox-policies.pdf",
      },
      {
        title: "Automatisation des tâches planifiées avec Cron",
        desc: "Configuration et gestion des tâches cron pour automatiser les opérations d'ALCASAR : planification des mises à jour système, sauvegardes automatiques, purge des logs anciens et maintenance préventive.",
        tags: ["Cron", "Automatisation", "Planification", "Maintenance", "Scripts"],
        pdf: "/portfolio/docs/stage-taches-cron-alcasar.pdf",
      },
      {
        title: "Gestion et analyse des journaux système ALCASAR",
        desc: "Compréhension approfondie des fichiers logs d'ALCASAR. Localisation des journaux, interprétation des messages d'erreur, analyse des traces de connexion et mise en place d'une surveillance efficace pour supervision.",
        tags: ["Logs", "Journaux", "Supervision", "Débogage", "Monitoring"],
        pdf: "/portfolio/docs/stage-logs-alcasar.pdf",
      },
    ] as Project[],
  },
  {
    id: "tp",
    label: "TP",
    icon: BookOpen,
    projects: [
      {
        title: "TP Iptables (Labtainer)",
        desc: "Configuration d'un pare-feu Linux avec iptables pour filtrer les flux entre un client et un serveur. Vérification des ports/services avec nmap, observation des paquets dans Wireshark, contrôle des logs, puis autorisation d'un service spécifique (wizbang sur le port 10054).",
        tags: ["Iptables", "Labtainer", "Pare-feu", "Nmap", "Wireshark"],
        pdf: "",
      },
      {
        title: "TP Packet-Introspection (Labtainer)",
        desc: "Analyse de captures réseau avec Wireshark pour identifier le flux TCP le plus actif. Géolocalisation IP, reconstruction de flux HTTP pour retrouver des messages cachés, et extraction d'un fichier binaire FTP depuis la capture.",
        tags: ["Wireshark", "Labtainer", "TCP", "HTTP", "FTP", "Analyse réseau"],
        pdf: "",
      },
      {
        title: "TP Nmap (Labtainer)",
        desc: "Utilisation de Nmap pour la reconnaissance réseau et l'audit de base : scan de localhost, du réseau local et d'un hôte distant autorisé. Interprétation des résultats (hôtes actifs, ports ouverts, services détectés) pour évaluer l'exposition du réseau.",
        tags: ["Nmap", "Labtainer", "Scan", "Reconnaissance", "Audit"],
        pdf: "",
      },
      {
        title: "TP Snort (Labtainer IDS)",
        desc: "Mise en place de la détection d'intrusion avec Snort dans un environnement Labtainer. Test des règles existantes, création de règles personnalisées (détection de CONFIDENTIAL), observation de l'effet du HTTPS, puis ajustement du mirroring et des règles pour différencier trafic interne et externe.",
        tags: ["Snort", "IDS", "Labtainer", "Détection d'intrusion", "Règles"],
        pdf: "",
      },
      {
        title: "Mise en place d'OpenSSL, Apache2 et redirection HTTPS",
        desc: "Configuration d'un environnement sécurisé en HTTPS sur deux machines virtuelles Linux : installation des paquets, génération de certificat SSL, configuration d'Apache2 et déploiement d'un site web.",
        tags: ["Apache2", "OpenSSL", "HTTPS", "SSL", "Linux"],
        pdf: "",
      },
      {
        title: "Mise en place d'un serveur GLPI et création de ticket",
        desc: "Installation du serveur SSH pour l'administration à distance, configuration de la redirection de ports sur VirtualBox, déploiement et configuration de GLPI pour la gestion du parc informatique.",
        tags: ["GLPI", "SSH", "VirtualBox", "Ticketing", "Debian"],
        pdf: "/portfolio/docs/tp-glpi.pdf",
      },
      {
        title: "Mise en place de Windows Server 2022",
        desc: "Configuration complète d'un serveur Windows Server 2022 : installation et configuration de DHCP, DNS, Active Directory Domain Services, gestion de domaine, partage SMB et stratégies de groupe (GPO).",
        tags: ["Windows Server", "DHCP", "DNS", "Active Directory", "SMB", "GPO"],
        pdf: "/portfolio/docs/tp-windows-server-2022.pdf",
      },
      {
        title: "Mise en place de Reverse Proxy et Serveurs Web",
        desc: "Configuration d'un reverse proxy Nginx avec load balancing sur deux serveurs web Apache2. Mise en place de la redirection de ports sous VirtualBox, configuration réseau NAT et réseau privé hôte.",
        tags: ["Nginx", "Apache2", "Reverse Proxy", "Load Balancing", "VirtualBox"],
        pdf: "/portfolio/docs/tp-reverse-proxy.pdf",
      },
      {
        title: "Stratégie de sauvegarde et protection des fichiers",
        desc: "Mise en place d'une stratégie complète de sauvegarde et de protection des fichiers : création de dossiers source, synchronisation, gestion des permissions et protection des données critiques.",
        tags: ["Sauvegarde", "Backup", "Protection", "Sécurité", "Linux"],
        pdf: "/portfolio/docs/tp-sauvegarde-protection.pdf",
      },
      {
        title: "Sauvegarde Linux - Partie 1",
        desc: "Mise en place de solutions de sauvegarde sur Linux : utilisation de rsync pour la synchronisation, création de sauvegardes incrémentales et configuration de tâches automatisées.",
        tags: ["Sauvegarde", "Rsync", "Linux", "Automatisation", "Backup"],
        pdf: "/portfolio/docs/tp-sauvegarde-linux-p1.pdf",
      },
      {
        title: "Configuration SSH et chiffrage",
        desc: "Configuration avancée du serveur SSH pour l'administration à distance sécurisée : authentification par clés, désactivation du mot de passe root, configuration du chiffrage et sécurisation des connexions.",
        tags: ["SSH", "Chiffrage", "Sécurité", "Authentification", "Linux"],
        pdf: "/portfolio/docs/tp-ssh-chiffrage.pdf",
      },
      {
        title: "PowerShell - Partie 1",
        desc: "Introduction à PowerShell et automatisation sous Windows : scripts de base, manipulation d'objets, cmdlets essentielles et automatisation de tâches d'administration système.",
        tags: ["PowerShell", "Windows", "Scripting", "Automatisation", "Administration"],
        pdf: "/portfolio/docs/tp-powershell-1.pdf",
      },
      {
        title: "PowerShell - Partie 2",
        desc: "PowerShell avancé : gestion d'Active Directory, manipulation de fichiers, création de scripts complexes et automatisation de tâches administratives sur Windows Server.",
        tags: ["PowerShell", "Active Directory", "Scripting", "Windows Server", "Automatisation"],
        pdf: "/portfolio/docs/tp-powershell-2.pdf",
      },
    ] as Project[],
  },
  {
    id: "ap",
    label: "AP",
    icon: FolderOpen,
    subCategories: [
      {
        id: "ap1",
        label: "AP1",
        projects: [
          {
            title: "Création de site vitrine",
            desc: "Création complète d'un site web vitrine responsive en HTML et CSS uniquement. Design adaptatif multi-écrans, mise en ligne et versioning du code source via GitHub.",
            tags: ["HTML", "CSS", "Site vitrine", "GitHub"],
            pdf: "https://pitch.com/v/lems-de-la-nature-votre-verre-c5vs2a",
            github: "https://github.com/Sabi0407/Projet--AP1",
          },
        ] as Project[],
      },
      {
        id: "ap2",
        label: "AP2",
        projects: [
          {
            title: "DEPLOG - Déploiement automatisé de logiciels",
            desc: "Automatisation des installations, mises à jour et désinstallations d'applications sur un parc informatique pour réduire les manipulations manuelles et renforcer la sécurité.",
            tags: ["Déploiement", "Automatisation", "Parc informatique", "Sécurité"],
            pdf: "/portfolio/docs/ap2-deplog.pdf",
            github: "https://github.com/Sabi0407/Projet--AP2",
          },
        ] as Project[],
      },
      {
        id: "ap3",
        label: "AP3",
        projects: [
          {
            title: "Mise En place d'Un serveur Zabbix et ses agents",
            desc: "Installation de Zabbix Server 7.4 sur Debian 13 avec configuration réseau statique, résolution DNS et base MariaDB. Déploiement des agents sur clients Windows et Debian pour la supervision complète.",
            tags: ["Zabbix", "VLAN", "MariaDB", "Monitoring", "Debian 13"],
            pdf: "/portfolio/docs/ap3-zabbix.pdf",
          },
        ] as Project[],
      },
      {
        id: "ap4",
        label: "AP4",
        projects: [
          {
            title: "Mise en place du Proxmox Backup Server",
            desc: "Installation et configuration de Proxmox Backup Server pour la sauvegarde centralisée et sécurisée des VMs et conteneurs. Solution dédiée de backup pour infrastructure Proxmox VE.",
            tags: ["Proxmox", "PBS", "Backup", "Virtualisation", "Sauvegarde"],
            pdf: "",
            docStatus: "TP non complet en cours de réalisation",
          },
        ] as Project[],
      },
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1">
        <h3 className="mb-2 font-heading text-base font-bold text-foreground">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary border border-primary/20 font-mono">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
          {project.pdf ? (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <ExternalLink size={14} />
                Prévisualiser
              </button>
              {!project.pdf.startsWith('http') && (
                <a
                  href={project.pdf}
                  download
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:scale-105 hover:border-primary/40"
                >
                  <Download size={14} />
                  Télécharger
                </a>
              )}
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
              {project.docStatus || "Documentation à venir"}
            </span>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-transform hover:scale-105"
            >
              <Github size={14} />
              GitHub
            </a>
          )}
        </div>
      </div>

      {showModal && project.pdf && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative h-full w-full max-w-6xl overflow-hidden rounded-xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border bg-card p-4">
              <h3 className="font-heading text-lg font-bold text-foreground">{project.title}</h3>
              <div className="flex items-center gap-2">
                {!project.pdf.startsWith('http') && (
                  <a
                    href={project.pdf}
                    download
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-105"
                  >
                    <Download size={14} />
                    Télécharger
                  </a>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  ✕
                </button>
              </div>
            </div>
            <iframe
              src={project.pdf}
              className="h-[calc(100%-4rem)] w-full"
              title={project.title}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function ProjetsSection() {
  const [activeTab, setActiveTab] = useState("perso")
  const [activeAP, setActiveAP] = useState("ap1")

  const activeCategory = categories.find((c) => c.id === activeTab)

  return (
    <section id="projets" className="py-16 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ScrollFadeIn>
        <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <div className="inline-block bg-black/90 border border-primary/30 rounded px-4 py-2 mb-2">
            <span className="text-primary font-mono text-sm">$ cat ~/projects/*</span>
          </div>
        </div>
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-3">
          Projets
        </h2>
        <p className="text-center text-muted-foreground mb-3">
          Mes principales réalisations techniques et documentations
        </p>
        <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-primary" />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            )
          })}
        </div>

        {activeTab === "ap" && activeCategory && "subCategories" in activeCategory && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {activeCategory.subCategories?.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setActiveAP(sub.id)}
                className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-all ${
                  activeAP === sub.id
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {activeTab !== "ap" &&
            activeCategory &&
            "projects" in activeCategory &&
            activeCategory.projects.map((project) => <ProjectCard key={project.title} project={project} />)}

          {activeTab === "ap" &&
            activeCategory &&
            "subCategories" in activeCategory &&
            activeCategory.subCategories
              ?.find((sub) => sub.id === activeAP)
              ?.projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </div>
      </ScrollFadeIn>
    </section>
  )
}
