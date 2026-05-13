import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Operations } from "@/components/site/Operations";
import { Sustainability } from "@/components/site/Sustainability";
import { CarbonDiagram } from "@/components/site/CarbonDiagram";
import { People } from "@/components/site/People";
import { GlobalReach } from "@/components/site/GlobalReach";
import { Newsroom } from "@/components/site/Newsroom";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lynek International — Engineering the standard of Nigerian energy" },
      {
        name: "description",
        content:
          "Lynek International — a legacy-driven Nigerian oil, gas and engineering company specialising in well intervention, instrumentation and operations management. Founded by Dr. Engr. Irivike Lucky Ewhuba.",
      },
      { property: "og:title", content: "Lynek International" },
      {
        property: "og:description",
        content: "Well intervention, instrumentation and operations excellence across Nigeria's oil and gas sector.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen bg-paper text-ink overflow-x-clip">
      <Nav />
      <Hero />
      <Operations />
      <Sustainability />
      <CarbonDiagram />
      <People />
      <GlobalReach />
      <Newsroom />
      <Footer />
    </main>
  );
}
