"use client"

import { ExternalLink, Download, User, Briefcase, BookOpen, FolderOpen, Github, GraduationCap } from "lucide-react"
import { useState } from "react"

type Project = {
  title: string
  desc: string
  tags: string[]
  pdf: string
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
        desc: "Installation complete d'Arch Linux : configuration du terminal, disposition clavier francais, partitionnement manuel des disques, installation du systeme de base et deploiement d'un environnement de bureau fonctionnel.",
        tags: ["Arch Linux", "Linux", "Terminal", "Partitionnement", "DE"],
        pdf: "/portfolio/docs/installation-arch-linux.pdf",
      },
      {
        title: "Mise en place d'un serveur Samba et de Tailscale",
        desc: "Installation et configuration d'un serveur Samba pour le partage de fichiers reseau et deploiement de Tailscale pour un VPN mesh securise permettant un acces distant aux ressources internes.",
        tags: ["Samba", "Tailscale", "VPN", "Partage de fichiers", "Reseau"],
        pdf: "/portfolio/docs/samba-tailscale.pdf",
      },
      {
        title: "Mise en place de Jellyfin",
        desc: "Deploiement et configuration de Jellyfin, un serveur multimedia open-source pour le streaming de contenus video, audio et photo avec gestion de bibliotheques et transcodage.",
        tags: ["Jellyfin", "Streaming", "Multimedia", "Serveur", "Media"],
        pdf: "/portfolio/docs/jellyfin.pdf",
      },
      {
        title: "Mise en place de Glance",
        desc: "Installation et configuration de Glance, un tableau de bord de supervision pour la surveillance et l'affichage centralise des metriques systeme et services en temps reel.",
        tags: ["Glance", "Dashboard", "Supervision", "Monitoring", "Metriques"],
        pdf: "/portfolio/docs/glance.pdf",
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
        desc: "Gestion des tickets d'incidents, assistance aux utilisateurs, maintenance du parc informatique, deploiement de postes et resolution de problemes materiels/logiciels.",
        tags: ["GLPI", "Active Directory", "Windows", "Ticketing", "Support"],
        pdf: "/portfolio/docs/support-n1-groupe-bertrand.pdf",
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
        desc: "Installation et configuration complete du portail captif ALCASAR pour le filtrage et l'authentification reseau. Deploiement de l'infrastructure de base pour controler l'acces internet.",
        tags: ["ALCASAR", "Portail captif", "Installation", "Configuration", "Reseau"],
        pdf: "/portfolio/docs/stage-alcasar-mise-en-place.pdf",
      },
      {
        title: "Configuration du point d'acces WiFi pour ALCASAR",
        desc: "Configuration complete d'un point d'acces WiFi pour integration avec le portail captif ALCASAR. Parametrage materiel reseau, configuration SSID, securisation WPA2 et mise en place de la connexion sans fil.",
        tags: ["WiFi", "Point d'acces", "Configuration", "Reseau", "ALCASAR"],
        pdf: "/portfolio/docs/stage-configuration-point-acces.pdf",
      },
      {
        title: "Configuration et debogage du serveur DNS Unbound",
        desc: "Configuration avancee du serveur DNS Unbound pour forcer SafeSearch sur Google, Bing et YouTube. Resolution de conflits, gestion des local-zones, optimisation des performances et mise en place du filtrage DNS.",
        tags: ["Unbound", "DNS", "SafeSearch", "Filtrage", "Debug"],
        pdf: "/portfolio/docs/stage-unbound-alcasar.pdf",
      },
      {
        title: "Personnalisation du portail captif ALCASAR",
        desc: "Modification de l'interface graphique du portail captif ALCASAR et reorganisation de l'arborescence fichiers systeme. Personnalisation visuelle, adaptation des pages d'authentification et organisation structurelle.",
        tags: ["Portail captif", "Personnalisation", "Interface", "Organisation"],
        pdf: "/portfolio/docs/stage-modification-portail-captif.pdf",
      },
      {
        title: "Analyse comparative des configurations Firefox",
        desc: "Etude comparative approfondie des methodes de configuration centralisee Firefox : fichier policies.json (format JSON moderne) versus firefox.cfg (format AutoConfig legacy). Analyse des avantages et choix de solution.",
        tags: ["Firefox", "Configuration", "Policies", "Deploiement", "Navigateur"],
        pdf: "/portfolio/docs/stage-firefox-policies.pdf",
      },
      {
        title: "Automatisation des taches planifiees avec Cron",
        desc: "Configuration et gestion des taches cron pour automatiser les operations d'ALCASAR : planification des mises a jour systeme, sauvegardes automatiques, purge des logs anciens et maintenance preventive.",
        tags: ["Cron", "Automatisation", "Planification", "Maintenance", "Scripts"],
        pdf: "/portfolio/docs/stage-taches-cron-alcasar.pdf",
      },
      {
        title: "Gestion et analyse des journaux systeme ALCASAR",
        desc: "Comprehension approfondie des fichiers logs d'ALCASAR. Localisation des journaux, interpretation des messages d'erreur, analyse des traces de connexion et mise en place d'une surveillance efficace pour supervision.",
        tags: ["Logs", "Journaux", "Supervision", "Debug", "Monitoring"],
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
        title: "Mise en place de OpenSSL, Apache2 et Redirection HTTPS",
        desc: "Configuration d'un environnement securise en HTTPS sur deux machines virtuelles Linux : installation des paquets, generation de certificat SSL, configuration d'Apache2 et deploiement d'un site web.",
        tags: ["Apache2", "OpenSSL", "HTTPS", "SSL", "Linux"],
        pdf: "/portfolio/docs/tp-openssl-apache.pdf",
      },
      {
        title: "Mise en place d'un serveur GLPI & Creation de ticket",
        desc: "Installation du serveur SSH pour l'administration a distance, configuration de la redirection de ports sur VirtualBox, deploiement et configuration de GLPI pour la gestion du parc informatique.",
        tags: ["GLPI", "SSH", "VirtualBox", "Ticketing", "Debian"],
        pdf: "/portfolio/docs/tp-glpi.pdf",
      },
      {
        title: "PowerShell - Recherche d'informations systeme",
        desc: "Travaux pratiques sur les cmdlets PowerShell : maitrise de Get-Alias, Get-Help pour l'exploration des commandes, et extraction d'informations systeme via les cmdlets Get-Process, Get-Service et Get-EventLog.",
        tags: ["PowerShell", "Windows", "Scripting", "Get-Help", "Get-Alias"],
        pdf: "/portfolio/docs/tp-powershell-1.pdf",
      },
      {
        title: "Scripting PowerShell pour partage reseau automatise",
        desc: "Creation de scripts PowerShell pour automatiser le partage de fichiers : verification de dossiers, creation automatique de partages reseau SMB avec gestion des permissions et droits administrateurs.",
        tags: ["PowerShell", "Scripting", "Windows", "SMB", "Automation"],
        pdf: "/portfolio/docs/tp-powershell-2.pdf",
      },
      {
        title: "Mise en place de Windows Server 2022",
        desc: "Configuration complete d'un serveur Windows Server 2022 : installation et configuration de DHCP, DNS, Active Directory Domain Services, gestion de domaine, partage SMB et strategies de groupe (GPO).",
        tags: ["Windows Server", "DHCP", "DNS", "Active Directory", "SMB", "GPO"],
        pdf: "/portfolio/docs/tp-windows-server-2022.pdf",
      },
      {
        title: "Mise en place de Reverse Proxy et Serveurs Web",
        desc: "Configuration d'un reverse proxy Nginx avec load balancing sur deux serveurs web Apache2. Mise en place de la redirection de ports sous VirtualBox, configuration reseau NAT et reseau prive hote.",
        tags: ["Nginx", "Apache2", "Reverse Proxy", "Load Balancing", "VirtualBox"],
        pdf: "/portfolio/docs/tp-reverse-proxy.pdf",
      },
      {
        title: "Mise en place d'un serveur SSH avec chiffrage asymetrique",
        desc: "Installation et configuration d'un serveur SSH securise avec authentification par cles asymetriques. Generation de cles RSA 4096 bits, configuration du fichier sshd_config et connexion sans mot de passe via cle privee.",
        tags: ["SSH", "OpenSSH", "Chiffrage", "RSA", "Securite", "Linux"],
        pdf: "/portfolio/docs/tp-ssh-chiffrage.pdf",
      },
      {
        title: "Strategie de sauvegarde et protection des fichiers",
        desc: "Mise en place d'une strategie complete de sauvegarde et de protection des fichiers : creation de dossiers source, synchronisation, gestion des permissions et protection des donnees critiques.",
        tags: ["Sauvegarde", "Backup", "Protection", "Securite", "Linux"],
        pdf: "/portfolio/docs/tp-sauvegarde-protection.pdf",
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
            title: "Creation de site vitrine",
            desc: "Creation complete d'un site web vitrine responsive en HTML et CSS uniquement. Design adaptatif multi-ecrans, mise en ligne et versioning du code source via GitHub.",
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
            title: "DEPLOG - Deploiement automatise de logiciels",
            desc: "Automatisation des installations, mises a jour et desinstallations d'applications sur un parc informatique pour reduire les manipulations manuelles et renforcer la securite.",
            tags: ["Deploiement", "Automation", "Parc informatique", "Securite"],
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
            title: "Mise en place de Zabbix dans le VLAN 10",
            desc: "Installation de Zabbix Server 7.4 sur Debian 13 avec configuration reseau statique, resolution DNS et base MariaDB. Deploiement des agents sur clients Windows et Debian pour la supervision complete.",
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
            desc: "Installation et configuration de Proxmox Backup Server pour la sauvegarde centralisee et securisee des VMs et conteneurs. Solution dedieee de backup pour infrastructure Proxmox VE.",
            tags: ["Proxmox", "PBS", "Backup", "Virtualisation", "Sauvegarde"],
            pdf: "/portfolio/docs/ap4-proxmox-backup.pdf",
          },
        ] as Project[],
      },
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
      <h3 className="mb-2 font-heading text-base font-bold text-foreground">{project.title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
        <a
          href={project.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-105"
        >
          <ExternalLink size={14} />
          Voir la doc
        </a>
        <a
          href={project.pdf}
          download
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-transform hover:scale-105"
        >
          <Download size={14} />
          Telecharger
        </a>
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
  )
}

export default function ProjetsSection() {
  const [activeTab, setActiveTab] = useState("perso")
  const [activeAP, setActiveAP] = useState("ap1")

  const activeCategory = categories.find((c) => c.id === activeTab)

  return (
    <section id="projets" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-4">Projets</h2>
        <p className="text-center text-muted-foreground mb-4">
          {"Mes principales realisations techniques et documentations"}
        </p>
        <div className="mx-auto mb-12 h-1 w-16 rounded-full bg-primary" />

        {/* Category Tabs */}
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

        {/* AP Sub-tabs */}
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

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
    </section>
  )
}
