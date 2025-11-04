"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
// Note: SplitText is a premium GSAP plugin requiring Club GreenSock membership
// Install: npm install gsap-trial (for trial) or use your Club GreenSock account
import { SplitText } from "gsap/SplitText";
import { reverseWords } from "@/lib/text-utils";
import styles from "./WordReverser.module.sass";

// Register the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function WordReverser() {
  const [inputText, setInputText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const saveToDatabase = async (original: string, reversed: string) => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch("/api/reversed-texts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalText: original,
          reversedText: reversed,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSaveMessage({ type: "success", text: "Saved to database!" });
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage({ type: "error", text: "Failed to save" });
      }
    } catch (error) {
      console.error("Error saving:", error);
      setSaveMessage({ type: "error", text: "Failed to save" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReverseWords = () => {
    if (!inputText.trim() || !displayRef.current || isAnimating) return;

    setIsAnimating(true);
    const originalText = inputText;
    const reversedText = reverseWords(inputText);

    // Create a temporary container for animation
    const container = displayRef.current;
    container.textContent = inputText;

    // Split the text into words
    const split = new SplitText(container, {
      type: "words",
      wordsClass: "word",
    });

    const words = split.words;
    const reversedWordsArray = reversedText.split(" ");

    // Create timeline for the animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Update the actual text after animation
        if (displayRef.current) {
          displayRef.current.textContent = reversedText;
        }
        setInputText(reversedText);
        setIsAnimating(false);

        // Save to database after animation completes
        // saveToDatabase(originalText, reversedText);
      },
    });

    // Animate each word flipping with 0.1s stagger
    const STAGGER = 0.05;
    const DURATION = 0.2;

    words.forEach((word, index) => {
      const reversedWord = reversedWordsArray[index] ?? "";

      // flip out
      tl.to(
        word,
        {
          rotationY: 75,
          duration: DURATION,
          ease: "power2.in",
        },
        index * STAGGER
      );

      // swap text at midpoint
      tl.call(
        () => {
          word.textContent = reversedWord;
        },
        undefined,
        index * STAGGER + DURATION
      );

      // flip back
      tl.to(
        word,
        {
          rotationY: 0,
          duration: DURATION,
          ease: "power2.out",
        },
        index * STAGGER + DURATION
      );
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    if (displayRef.current) {
      displayRef.current.textContent = newText;
    }
  };

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.textContent = inputText;
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Word Reverser</h2>
      <p className={styles.description}>
        Enter text below and click "Reverse Words" to see an animated word
        reversal effect using GSAP SplitText.
      </p>

      <div className={styles.displayGroup}>
        <div className={styles.inputGroup}>
          <label htmlFor="input-text" className={styles.label}></label>
          <textarea
            ref={textareaRef}
            id="input-text"
            className={[styles.textarea, isAnimating && styles.hidden].join(
              " "
            )}
            value={inputText}
            onChange={handleTextChange}
            placeholder="The red fox crosses the ice, intent on none of my business."
            rows={5}
            disabled={isAnimating}
          />
        </div>

        <div
          ref={displayRef}
          className={[
            styles.textarea,
            styles.displayArea,
            !isAnimating && styles.hidden,
          ].join(" ")}
        >
          {inputText}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={handleReverseWords}
          disabled={isAnimating || !inputText.trim()}
        >
          {isAnimating ? "Animating..." : "Reverse Words"}
        </button>
      </div>

      {saveMessage && (
        <div className={`${styles.saveMessage} ${styles[saveMessage.type]}`}>
          {saveMessage.text}
        </div>
      )}

      {isSaving && <div className={styles.saveMessage}>Saving...</div>}
    </div>
  );
}
