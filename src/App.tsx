import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Intro } from "./components/Intro";
import { Navbar } from "./components/Navbar";
import { ScrollRail } from "./components/ScrollRail";
import { Completion } from "./sections/Completion";
import { Expertise } from "./sections/Expertise";
import { FinalCTA } from "./sections/FinalCTA";
import { Finishing } from "./sections/Finishing";
import { Foundation } from "./sections/Foundation";
import { Hero } from "./sections/Hero";
import { Land } from "./sections/Land";
import { Progress } from "./sections/Progress";
import { Projects } from "./sections/Projects";
import { Structure } from "./sections/Structure";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    // reducedMotion="user" neutralises every Framer animation for visitors who
    // have asked for less motion; scroll-linked transforms are gated separately.
    <MotionConfig reducedMotion="user">
      <Intro onDone={() => setReady(true)} />
      <Navbar />
      <ScrollRail />
      <main>
        <Hero ready={ready} />
        <Land />
        <Foundation />
        <Structure />
        <Progress />
        <Finishing />
        <Completion />
        <Expertise />
        <Projects />
        <FinalCTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
