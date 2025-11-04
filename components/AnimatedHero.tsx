"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./AnimatedHero.module.sass";

export default function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          heroRef.current,
          {
            scale: 0.95,
            duration: 1.2,
            ease: "power2.out",
          },
          0
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className={styles.hero}>
      <h1 ref={titleRef} className={styles.title}>
        Wordsmith Inc
      </h1>
      <p ref={subtitleRef} className={styles.subtitle}>
        The world in reverse
      </p>
    </div>
  );
}
