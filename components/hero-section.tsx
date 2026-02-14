import { ArrowDown, FileText, Download, Table, Terminal } from "lucide-react"
import AnimatedBackground from "./animated-background"
import TypewriterText from "./typewriter-text"

export default function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-20 text-center overflow-hidden bg-gradient-to-b from-background via-background to-card/30"
    >
      <AnimatedBackground />
      
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl animate-fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/40 bg-black dark:bg-black/90 px-5 py-3 font-mono text-sm shadow-2xl shadow-primary/20">
          <span className="text-primary font-bold">root@sisr</span>
          <span className="text-primary">:</span>
          <span className="text-accent font-bold">~</span>
          <span className="text-white/70">$</span>
          <span className="text-white ml-1">whoami</span>
          <span className="ml-1 inline-block h-4 w-2 bg-primary terminal-cursor" />
        </div>

        <h1 className="font-heading text-5xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl text-balance bg-clip-text min-h-[120px] flex items-center justify-center">
          <TypewriterText text="SRIKANTHAN Sabiran" speed={80} />
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Étudiant en BTS SIO SISR
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#competences"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
          >
            <FileText size={20} className="transition-transform group-hover:rotate-6" />
            Voir mon CV
          </a>
          <a
            href="#projets"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-foreground shadow-lg transition-all hover:scale-105 hover:border-primary/50 hover:bg-card"
          >
            <Download size={20} className="transition-transform group-hover:translate-y-1" />
            Mes projets
          </a>
          <a
            href="#competences"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-foreground shadow-lg transition-all hover:scale-105 hover:border-accent/50 hover:bg-card"
          >
            <Table size={20} className="transition-transform group-hover:rotate-12" />
            Tableau E5
          </a>
        </div>
      </div>

      <a
        href="#apropos"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5 text-primary backdrop-blur-sm transition-all hover:bg-primary/10 hover:scale-110 animate-bounce"
        aria-label="Scroll vers le bas"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  )
}
