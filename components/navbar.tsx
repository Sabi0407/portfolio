"use client"

import { useState } from "react"
import { Menu, X, Mail, Linkedin, Github, Rss } from "lucide-react"

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "A propos", href: "#apropos" },
  { label: "Parcours", href: "#parcours" },
  { label: "Competences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <a href="#accueil" className="font-heading text-xl font-black text-foreground hover:text-primary transition-colors">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SS</span>
          </a>
          
          {/* Social links next to logo - Desktop only */}
          <div className="hidden md:flex items-center gap-2 border-l border-border pl-4">
            <a
              href="mailto:sabiran.pro@proton.me"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/sabirans/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/Sabi0407"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="/portfolio/veille/"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              aria-label="RSS"
            >
              <Rss size={16} />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-card px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile social links */}
          <div className="flex items-center justify-center gap-3 pt-4 mt-4 border-t border-border">
            <a
              href="mailto:sabiran.pro@proton.me"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:text-primary hover:border-primary"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/sabirans/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:text-primary hover:border-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Sabi0407"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:text-primary hover:border-primary"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="/portfolio/veille/"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:text-primary hover:border-primary"
              aria-label="RSS"
            >
              <Rss size={18} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
