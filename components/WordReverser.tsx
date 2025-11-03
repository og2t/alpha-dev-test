'use client';

import { useState } from 'react';
import { reverseWords } from '@/lib/text-utils';
import styles from './WordReverser.module.sass';

export default function WordReverser() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleReverseWords = () => {
    const result = reverseWords(inputText);
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Word Reverser</h2>
      <p className={styles.description}>
        Enter text below and click "Reverse Words" to reverse the letters in each word while maintaining sentence structure.
      </p>

      <div className={styles.inputGroup}>
        <label htmlFor="input-text" className={styles.label}>Input:</label>
        <textarea
          id="input-text"
          className={styles.textarea}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="The red fox crosses the ice, intent on none of my business."
          rows={5}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={handleReverseWords}
        >
          Reverse Words
        </button>
        <button
          className={styles.buttonSecondary}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {outputText && (
        <div className={styles.outputGroup}>
          <label className={styles.label}>Output:</label>
          <div className={styles.output}>
            {outputText}
          </div>
        </div>
      )}
    </div>
  );
}
