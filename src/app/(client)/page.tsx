import { Hero } from "@/components/home/hero";
import { SavingsTeaser } from "@/components/home/savings-teaser";
import { Solutions } from "@/components/home/solutions";
import { EquipmentTeaser } from "@/components/home/equipment-teaser";
import { ProjectsOverview } from "@/components/home/projects-overview";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <SavingsTeaser />
      <Solutions />
      <EquipmentTeaser />
      <ProjectsOverview />
      <FinalCTA />
    </>
  );
}

