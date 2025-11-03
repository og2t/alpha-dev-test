'use client';

import { useState, useCallback } from 'react';

interface UseLambdaOptions {
  functionName: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useLambda({ functionName, onSuccess, onError }: UseLambdaOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const invoke = useCallback(
    async (payload?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/lambda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            functionName,
            payload,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setData(result.data);
          onSuccess?.(result.data);
          return result.data;
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [functionName, onSuccess, onError]
  );

  return { invoke, loading, error, data };
}
