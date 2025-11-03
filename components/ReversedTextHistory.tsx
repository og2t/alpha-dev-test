'use client';

import { useEffect, useState } from 'react';
import { ReversedText } from '@/lib/supabase';
import styles from './ReversedTextHistory.module.sass';

export default function ReversedTextHistory() {
  const [texts, setTexts] = useState<ReversedText[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTexts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reversed-texts?limit=20');
      const data = await response.json();

      if (data.success) {
        setTexts(data.data);
      } else {
        setError('Failed to load history');
      }
    } catch (err) {
      console.error('Error fetching texts:', err);
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/reversed-texts/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setTexts(texts.filter(text => text.id !== id));
      }
    } catch (err) {
      console.error('Error deleting text:', err);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recent Reversals</h2>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recent Reversals</h2>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (texts.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recent Reversals</h2>
        <p className={styles.empty}>No reversed texts yet. Try reversing some text above!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Reversals</h2>
        <button className={styles.refreshButton} onClick={fetchTexts}>
          Refresh
        </button>
      </div>

      <div className={styles.list}>
        {texts.map((text) => (
          <div key={text.id} className={styles.item}>
            <div className={styles.textContent}>
              <div className={styles.textRow}>
                <span className={styles.label}>Original:</span>
                <span className={styles.text}>{text.original_text}</span>
              </div>
              <div className={styles.textRow}>
                <span className={styles.label}>Reversed:</span>
                <span className={styles.text}>{text.reversed_text}</span>
              </div>
              <div className={styles.meta}>
                {new Date(text.created_at).toLocaleString()}
              </div>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(text.id)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
