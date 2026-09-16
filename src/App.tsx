import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ImpactStrip } from "./components/ImpactStrip";
import { FeaturedWork } from "./components/FeaturedWork";
import { Decisions } from "./components/Decisions";
import { Reliability } from "./components/Reliability";
import { Leadership } from "./components/Leadership";
import { Writing } from "./components/Writing";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="grain min-h-screen bg-navy-950 text-ink">
      {/* Skip link for keyboard users */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-mono focus:text-sm focus:text-navy-950"
      >
        Skip to content
      </a>

      <Header />

      <main>
        <Hero />
        <ImpactStrip />
        <FeaturedWork />
        <Decisions />
        <Reliability />
        <Leadership />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}
