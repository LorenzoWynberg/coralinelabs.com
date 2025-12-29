import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ApproachSection from "@/components/sections/ApproachSection";
import PackagesSection from "@/components/sections/PackagesSection";
import WorkSection from "@/components/sections/WorkSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ApproachSection />
        <PackagesSection />
        <WorkSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
