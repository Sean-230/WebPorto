import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import FadeSection from "@/components/FadeSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero is always visible on load */}
        <FadeSection initialVisible>
          <HeroSection />
        </FadeSection>

        <FadeSection>
          <ExperienceSection />
        </FadeSection>

        <FadeSection>
          <ProjectsSection />
        </FadeSection>

        <FadeSection>
          <SkillsSection />
        </FadeSection>

        <FadeSection>
          <ContactSection />
        </FadeSection>
      </main>
    </>
  );
}
