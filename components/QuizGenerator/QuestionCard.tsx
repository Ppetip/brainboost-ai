import React from 'react';
import type { Question } from '../../types/quiz';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedAnswer?: number;
  isSubmitted: boolean;
  onSelectAnswer: (answer: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  selectedAnswer,
  isSubmitted,
  onSelectAnswer,
}) => {
  const isCorrect = isSubmitted && selectedAnswer === parseInt(question.correctAnswer);
  const isWrong = isSubmitted && selectedAnswer !== parseInt(question.correctAnswer);

  return (
    <div className={`p-6 rounded-lg shadow-md ${
      isSubmitted 
        ? isCorrect 
          ? 'bg-green-50 dark:bg-green-900/20' 
          : isWrong 
            ? 'bg-red-50 dark:bg-red-900/20'
            : 'bg-white dark:bg-gray-800'
        : 'bg-white dark:bg-gray-800'
    }`}>
      <h3 className="text-lg font-semibold mb-4 dark:text-white">
        {index + 1}. {question.question}
      </h3>
      <div className="space-y-2">
        {question.options.map((option, optionIndex) => (
          <button
            key={optionIndex}
            onClick={() => !isSubmitted && onSelectAnswer(optionIndex)}
            className={`w-full p-3 text-left rounded-lg transition-colors ${
              selectedAnswer === optionIndex
                ? isSubmitted
                  ? isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
                : isSubmitted && optionIndex === parseInt(question.correctAnswer)
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
            }`}
            disabled={isSubmitted}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}; 