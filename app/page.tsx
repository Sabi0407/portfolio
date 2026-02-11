import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ParcoursSection from "@/components/parcours-section"
import CompetencesSection from "@/components/competences-section"
import ProjetsSection from "@/components/projets-section"
import ContactSection from "@/components/contact-section"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ParcoursSection />
        <CompetencesSection />
        <ProjetsSection />
        <ContactSection />
      </main>
    </>
  )
}
