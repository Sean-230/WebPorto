import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import GlitchSection from "@/components/GlitchSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero is always visible — no glitch on initial load */}
        <GlitchSection initialVisible>
          <HeroSection />
        </GlitchSection>

        <GlitchSection delay={0}>
          <ExperienceSection />
        </GlitchSection>

        <GlitchSection delay={0}>
          <ProjectsSection />
        </GlitchSection>

        <GlitchSection delay={0}>
          <SkillsSection />
        </GlitchSection>

        <GlitchSection delay={0}>
          <ContactSection />
        </GlitchSection>
      </main>
    </>
  );
}
