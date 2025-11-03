import AnimatedHero from '@/components/AnimatedHero';
import WordReverser from '@/components/WordReverser';
import ReversedTextHistory from '@/components/ReversedTextHistory';
import styles from './page.module.sass';

export default function Home() {
  return (
    <main className={styles.main}>
      <AnimatedHero />
      <section className={styles.content}>
        <h2>Welcome to Your Next.js Project</h2>
        <p>This scaffold includes:</p>
        <ul>
          <li>Next.js 15 with App Router</li>
          <li>TypeScript</li>
          <li>GSAP for animations</li>
          <li>SASS for styling</li>
          <li>AWS Lambda integration</li>
          <li>CloudFlare deployment ready</li>
          <li>Supabase database integration</li>
        </ul>
      </section>
      <section className={styles.demoSection}>
        <WordReverser />
      </section>
      <section className={styles.demoSection}>
        <ReversedTextHistory />
      </section>
    </main>
  );
}
