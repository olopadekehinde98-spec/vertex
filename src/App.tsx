import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Intro } from "./components/Intro";
import { JourneyRail } from "./components/JourneyRail";
import { Navbar } from "./components/Navbar";
import { Completion } from "./sections/Completion";
import { FinalCTA } from "./sections/FinalCTA";
import { Finishing } from "./sections/Finishing";
import { Foundation } from "./sections/Foundation";
import { Hero } from "./sections/Hero";
import { Land } from "./sections/Land";
import { Progress } from "./sections/Progress";
import { Services } from "./sections/Services";
import { Showcase } from "./sections/Showcase";
import { Structure } from "./sections/Structure";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    // reducedMotion="user" neutralises every Framer animation for visitors who
    // ask for less motion; scroll-linked transforms are gated separately.
    <MotionConfig reducedMotion="user">
      <Intro onDone={() => setReady(true)} />
      <Navbar />
      <JourneyRail />
      {/* The journey rail is fixed to the left gutter, so the page sits beside it. */}
      <div className="xl:pl-[132px]">
        <main>
          <Hero ready={ready} />
          <Land />
          <Foundation />
          <Structure />
          <Progress />
          <Finishing />
          <Completion />
          <Services />
          <Showcase />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
