"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import ContactDropdown from "./contact-dropdown"

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "A propos", href: "#apropos" },
  { label: "BTS SIO", href: "#btssio" },
  { label: "Parcours", href: "#parcours" },
  { label: "Competences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Veille", href: "#veille" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#accueil" className="font-heading text-xl font-black text-foreground hover:text-primary transition-colors">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SS</span>
        </a>

        <div className="flex items-center gap-4">
          {/* Desktop */}
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

          <div className="hidden md:block">
            <ContactDropdown />
          </div>

          <ThemeToggle />

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
        </div>
      )}
    </nav>
  )
}
