"use client";

import { useState } from "react";
import AnimatedHero from "@/components/AnimatedHero";
import WordReverser from "@/components/WordReverser";
import ReversedTextHistory from "@/components/ReversedTextHistory";
import styles from "./page.module.sass";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReversalSaved = () => {
    // Increment trigger to refresh history
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className={styles.main}>
      <AnimatedHero />
      <WordReverser onReversalSaved={handleReversalSaved} />
      <ReversedTextHistory refreshTrigger={refreshTrigger} />
    </main>
  );
}
