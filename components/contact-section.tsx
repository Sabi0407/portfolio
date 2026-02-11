import { Mail, Linkedin, Github, Rss } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-card">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Contact</h2>
        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-primary" />
        <p className="mb-8 text-muted-foreground">
          {"Retrouvez-moi sur mes reseaux professionnels"}
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:sabiran.pro@proton.me"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sabirans/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/Sabi0407"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="/portfolio/veille/"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
            aria-label="Veille technologique"
          >
            <Rss size={20} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto mt-16 max-w-5xl border-t border-border pt-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <ThemeToggle />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {"© 2026 SRIKANTHAN Sabiran - Portfolio BTS SIO SISR"}
        </p>
      </div>
    </section>
  )
}
