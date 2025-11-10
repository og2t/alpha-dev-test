import styles from "./AnimatedHero.module.sass";

export default function AnimatedHero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>
        Wordsmith Inc
      </h1>
      <p className={styles.subtitle}>
        The world in reverse
      </p>
    </div>
  );
}
