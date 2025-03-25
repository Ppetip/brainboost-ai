import React from 'react';
import type { QuizHistoryProps } from '@/types/quiz';

export const QuizHistory: React.FC<QuizHistoryProps> = ({ history }) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {history.map((result, index) => (
          <div key={index} className="p-4 border rounded-md">
            <h3 className="font-semibold">{result.topic}</h3>
            <p className="text-lg">Score: {result.grade}%</p>
            <p className="text-sm text-gray-600">
              {result.correctCount}/{result.totalQuestions} correct
            </p>
            <p className="text-sm text-gray-500">{result.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 