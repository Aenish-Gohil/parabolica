import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import ManifestoFlow from "@/components/manifesto-flow";
import Stack from "@/components/sections/stack";
import Roadmap from "@/components/sections/roadmap";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import ScrollProgress from "@/components/scroll-progress";
import { BackgroundCar } from "@/components/background-car";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <main className="relative min-h-screen">
        {/* Background Car - Moved inside and adjusted z-index */}
        <BackgroundCar />

        <div className="relative z-10 w-full">
          <Hero />

          <div className="relative z-10 bg-background/80 backdrop-blur-sm border-t border-border">
            <section id="about">
              <About />
            </section>

            <ManifestoFlow />

            <section id="stack">
              <Stack />
            </section>

            <ManifestoFlow reverse />

            <section id="projects">
              <Projects />
            </section>

            <ManifestoFlow />

            <section id="roadmap">
              <Roadmap />
            </section>

            <ManifestoFlow reverse />

            <section id="contact">
              <Contact />
            </section>
          </div>
        </div>
      </main >
    </>
  );
}