"use client"

import { useEffect, useState } from "react"

export default function NeofetchFooter() {
  const [uptime, setUptime] = useState("0d 0h")
  
  useEffect(() => {
    const startDate = new Date("2024-10-01") // Date de début BTS
    const updateUptime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      setUptime(`${days}d ${hours}h`)
    }
    updateUptime()
    const interval = setInterval(updateUptime, 3600000) // Update every hour
    return () => clearInterval(interval)
  }, [])

  const skills = ["Linux", "Windows Server", "Proxmox", "Docker", "Active Directory", "Zabbix"]
  const projects = 15 // Ajustez selon le nombre réel

  return (
    <footer className="border-t-2 border-primary/20 bg-black/95 py-8 px-6 font-mono text-sm">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[auto_1fr]">
          {/* ASCII Art Logo */}
          <div className="text-primary">
            <pre className="text-xs leading-tight">
{`     ╔═══════╗
     ║ ▄▀▀▀▄ ║
     ║ █   █ ║
     ║ ▀▄▄▄▀ ║
     ╚═══════╝`}
            </pre>
          </div>

          {/* System Info */}
          <div className="space-y-1 text-xs md:text-sm">
            <div className="flex gap-2">
              <span className="text-primary font-bold">sabiran@portfolio</span>
              <span className="text-muted-foreground">─────────────</span>
            </div>
            
            <div className="grid gap-1 mt-2">
              <div className="flex gap-2">
                <span className="text-accent font-bold w-24">OS</span>
                <span className="text-foreground">Arch Linux (BTS SIO SISR)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent font-bold w-24">Uptime</span>
                <span className="text-foreground">{uptime}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent font-bold w-24">Shell</span>
                <span className="text-foreground">Bash/PowerShell</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent font-bold w-24">Packages</span>
                <span className="text-foreground">{skills.length} skills, {projects} projects</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent font-bold w-24">Theme</span>
                <span className="text-foreground">Arch Blue Cyan</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-primary/20">
              <div className="flex gap-1 items-center flex-wrap">
                <span className="text-muted-foreground mr-2">Colors:</span>
                {[
                  'bg-black', 'bg-red-600', 'bg-green-600', 'bg-yellow-600',
                  'bg-blue-600', 'bg-purple-600', 'bg-cyan-600', 'bg-white'
                ].map((color, i) => (
                  <div key={i} className={`w-6 h-6 ${color} rounded`} />
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-primary/20 text-muted-foreground">
              <p>© 2025 SRIKANTHAN Sabiran | Built with Next.js & Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
