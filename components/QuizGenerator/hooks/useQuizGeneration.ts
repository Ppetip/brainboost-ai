import { useState } from 'react';
import type { Question } from '../../../types/quiz';

export const useQuizGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const generateQuestions = async (topic: string, numberOfQuestions: number = 5) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, numberOfQuestions }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      
      if (!Array.isArray(data.questions)) {
        throw new Error('Invalid response format: questions must be an array');
      }

      setQuestions(data.questions);
      return data.questions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate questions';
      setError(errorMessage);
      setQuestions([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    questions,
    generateQuestions,
    isLoading,
    error,
  };
}; 