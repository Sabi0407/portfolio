import { Server, CheckCircle, Code } from "lucide-react"

export default function BtsSioSection() {
  return (
    <section id="btssio" className="py-24 px-6 bg-card">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-4">BTS SIO</h2>
        <p className="text-center text-muted-foreground mb-2">Services Informatiques aux Organisations</p>
        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-primary" />

        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground mb-12">
          {"Le BTS SIO est un diplome de niveau Bac+2 qui forme aux metiers de l'informatique et des reseaux. J'ai choisi l'option SISR (Solutions d'Infrastructure, Systemes et Reseaux) pour me specialiser dans l'administration et la securite des systemes informatiques."}
        </p>

        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Ma Specialisation
          </span>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border-2 border-primary bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Server size={20} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">SISR</h3>
                <p className="text-xs text-muted-foreground">{"Solutions d'Infrastructure, Systemes et Reseaux"}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                { title: "Virtualisation", desc: "Proxmox, conteneurs Docker, gestion des ressources" },
                { title: "Cybersecurite", desc: "Pare-feu, VPN, politique de securite, gestion des acces" },
                { title: "Reseaux", desc: "Configuration routeurs, switches, VLANs, protocoles reseau (TCP/IP, DNS, DHCP)" },
                { title: "Administration Serveur", desc: "Installation, configuration et maintenance de serveurs Windows/Linux" },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{" : "}{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why SISR */}
        <div className="mt-10 rounded-xl border border-border bg-background p-6">
          <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">{"Pourquoi j'ai choisi SISR"}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {"J'ai choisi l'option SISR car je suis passionne par l'infrastructure informatique et la securite des systemes. J'apprecie particulierement l'aspect technique de l'administration des serveurs et des reseaux, ainsi que les defis lies a la virtualisation et a la cybersecurite. Mon objectif est de devenir un expert en administration systemes et reseaux, capable de concevoir et maintenir des infrastructures robustes et securisees."}
          </p>
        </div>
      </div>
    </section>
  )
}
