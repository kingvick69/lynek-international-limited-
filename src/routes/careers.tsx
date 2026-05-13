import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Careers } from "@/components/site/Careers";

export const Route = createFileRoute("/careers")({
  component: CareersRoute,
  head: () => ({
    meta: [
      { title: "Careers — Lynek International" },
      {
        name: "description",
        content:
          "Careers at Lynek International — field-led oil, gas and engineering. View current opportunities and how to reach us for speculative applications.",
      },
      { property: "og:title", content: "Careers — Lynek International" },
      {
        property: "og:description",
        content:
          "Join a discipline-driven engineering practice serving Nigeria's energy sector. No open roles listed at present.",
      },
    ],
  }),
});

function CareersRoute() {
  return (
    <main className="relative min-h-screen bg-paper text-ink overflow-x-clip">
      <Nav />
      <Careers />
      <Footer />
    </main>
  );
}
