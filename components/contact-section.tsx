import { Mail, Linkedin, Github, Rss } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import ScrollFadeIn from "./scroll-fade-in"

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 px-6 bg-card relative shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ScrollFadeIn>
        <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4">
          <div className="inline-block bg-black/90 border border-primary/30 rounded px-4 py-2 mb-2">
            <span className="text-primary font-mono text-sm">$ grep -r "contact"</span>
          </div>
        </div>
        <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
          Contact
        </h2>
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-primary" />
        <p className="mb-8 text-muted-foreground">
          Retrouvez-moi sur mes réseaux professionnels
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:sabiran.pro@proton.me"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:-translate-y-1"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sabirans/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/Sabi0407"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:-translate-y-1"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="/portfolio/veille/"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:-translate-y-1"
            aria-label="Veille technologique"
          >
            <Rss size={20} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl border-t border-border pt-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <ThemeToggle />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          © 2026 SRIKANTHAN Sabiran - Portfolio BTS SIO SISR
        </p>
      </div>
      </ScrollFadeIn>
    </section>
  )
}
