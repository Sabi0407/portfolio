"use client"

import { useState } from "react"
import { Mail, Linkedin, Github, Rss, User } from "lucide-react"

export default function ContactDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const contacts = [
    {
      href: "mailto:sabiran.pro@proton.me",
      icon: Mail,
      label: "Email",
    },
    {
      href: "https://www.linkedin.com/in/sabirans/",
      icon: Linkedin,
      label: "LinkedIn",
      external: true,
    },
    {
      href: "https://github.com/Sabi0407",
      icon: Github,
      label: "GitHub",
      external: true,
    },
    {
      href: "/veille",
      icon: Rss,
      label: "Veille",
      external: false,
    },
  ]

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-105"
        aria-label="Contact"
      >
        <User size={16} />
        <span className="hidden lg:inline">Contact</span>
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-lg animate-fade-in-up"
        >
          <div className="p-2">
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-primary"
                >
                  <Icon size={16} />
                  <span>{contact.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
