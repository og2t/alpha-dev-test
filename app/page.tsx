import AnimatedHero from "@/components/AnimatedHero";
import WordReverser from "@/components/WordReverser";
import ReversedTextHistory from "@/components/ReversedTextHistory";
import styles from "./page.module.sass";

export default function Home() {
  return (
    <main className={styles.main}>
      <AnimatedHero />
      <section className={styles.demoSection}>
        <WordReverser />
      </section>
      <section className={styles.demoSection}>
        <ReversedTextHistory />
      </section>
    </main>
  );
}
