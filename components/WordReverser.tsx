"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { reverseWords } from "@/lib/text-utils";
import styles from "./WordReverser.module.sass";

// Register the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function WordReverser() {
  const [inputText, setInputText] = useState(
    "The red fox crosses the ice, intent on none of my business."
  );
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

    if (textareaRef.current && displayRef.current) {
      const ta = textareaRef.current;
      // Use the computed height so padding/border are included
      const height = ta.getBoundingClientRect().height || ta.scrollHeight;
      displayRef.current.style.height = `${height}px`;
      // Mirror overflow and box-sizing to avoid layout differences
      displayRef.current.style.overflow = ta.style.overflow || "hidden";
      displayRef.current.style.boxSizing = getComputedStyle(ta).boxSizing;
    }

    setIsAnimating(true);
    const reversedText = reverseWords(inputText);

    // Set display with <br> tags so SplitText can detect separate lines
    displayRef.current.innerHTML = inputText
      .split("\n")
      .map((line) => line || "&nbsp;")
      .join("<br>");

    // Split the text into words
    const split = SplitText.create(displayRef.current, {
      type: "words",
      wordsClass: "word",
      // wordDelimiter: {
      //   delimiter: /\s+/,
      //   replaceWith: String.fromCharCode(0x2006),
      // },
    });

    const words = split.words;
    const reversedWordsArray = reversedText.split(/\s+/);

    // Wrap each word in a perspective container
    words.forEach((word) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.perspective = "200px";
      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    // Create timeline for the animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Revert the SplitText changes to restore clean DOM
        split.revert();

        // Update both state and display ref with reversed text
        setInputText(reversedText);

        if (displayRef.current) {
          displayRef.current.innerHTML = reversedText;
        }

        setIsAnimating(false);

        // Save to database after animation completes
        saveToDatabase(inputText, reversedText);
      },
    });

    const DURATION = 0.5;
    const STAGGER = 0.05;

    words.forEach((word, index) => {
      // flip out
      tl.to(
        word,
        {
          rotationY: 90,
          duration: DURATION,
          opacity: 0,
          ease: "power2.in",
        },
        index * STAGGER
      );

      // swap text at midpoint
      tl.call(
        () => {
          const reversedWord = reversedWordsArray[index] ?? "";
          word.textContent = reversedWord;
          gsap.set(word, { rotationY: -90 });
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
          opacity: 1,
          ease: "power2.out",
        },
        index * STAGGER + DURATION
      );
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Word Reverser Tool</h2>
      <p className={styles.description}>Enter the text to be reversed.</p>

      <div className={styles.displayGroup}>
        <div className={styles.inputGroup}>
          <label htmlFor="input-text" className={styles.label}></label>
          <textarea
            ref={textareaRef}
            id="input-text"
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
              const ta = textareaRef.current;
              if (!ta) return;
              ta.style.height = "auto";
              ta.style.height = `${ta.scrollHeight}px`;
            }}
            style={{ overflow: "hidden", resize: "none" }}
            className={[styles.textarea, isAnimating && styles.hidden].join(
              " "
            )}
            value={inputText}
            onChange={handleTextChange}
            placeholder=""
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
          {isAnimating ? "Reversing..." : "Reverse Words"}
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
