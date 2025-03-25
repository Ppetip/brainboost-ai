import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QuestionCard } from './QuestionCard';
import { Timer } from './Timer';
import { QuizHistory } from './QuizHistory';
import { useQuizGeneration } from './hooks/useQuizGeneration';
import type { Question, QuizResult } from '../../types/quiz';

export const QuizGenerator = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [topic, setTopic] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const questionsContainerRef = useRef<HTMLDivElement>(null);
  
  const { 
    questions, 
    generateQuestions, 
    isLoading: isGenerating, 
    error: generationError 
  } = useQuizGeneration();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (questions.length > 0 && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [questions.length, isSubmitted, timeLeft]);

  const handleAnswerSelect = (index: number, answer: number) => {
    setSelectedAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = () => {
    if (!isSubmitted && questions.length > 0) {
      const correctCount = questions.reduce((count, question, index) => {
        const selectedAnswer = selectedAnswers[index];
        return count + (selectedAnswer === parseInt(question.correctAnswer) ? 1 : 0);
      }, 0);

      const grade = Math.round((correctCount / questions.length) * 100);

      const quizResult: QuizResult = {
        topic,
        grade,
        timestamp: new Date().toLocaleString(),
        correctCount,
        totalQuestions: questions.length,
        timeSpent: 60 - timeLeft
      };

      setQuizHistory(prev => [...prev, quizResult]);
      setIsSubmitted(true);
    }
  };

  const handleStartQuiz = async () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
    setTimeLeft(60);
    await generateQuestions(topic);
  };

  return (
    <div className="w-full">
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter any topic (e.g., quantum physics, world history)"
          className="w-full p-4 text-lg border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 
            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <button
          onClick={handleStartQuiz}
          disabled={!topic.trim() || isGenerating}
          className={`w-full py-4 text-lg font-semibold text-white rounded-lg transition-all
            ${!topic.trim() || isGenerating 
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
        >
          {isGenerating ? 'Generating Quiz...' : 'Start Quiz'}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="max-w-4xl mx-auto">
          {!isSubmitted && (
            <div className="mb-8">
              <Timer timeLeft={timeLeft} onTimeUp={handleSubmit} />
              
              {/* Quiz Controls */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length !== questions.length}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors
                    ${Object.keys(selectedAnswers).length !== questions.length
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                    }`}
                >
                  Submit Quiz
                </button>
                <button
                  onClick={handleStartQuiz}
                  className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 
                    dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  New Quiz
                </button>
              </div>
            </div>
          )}

          {/* Questions Grid */}
          <div ref={questionsContainerRef} 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {questions.map((question, index) => (
              <QuestionCard
                key={`question-${index}-${topic}`}
                question={question}
                index={index}
                isSubmitted={isSubmitted}
                selectedAnswer={selectedAnswers[index]}
                onSelectAnswer={(answer) => handleAnswerSelect(index, answer)}
              />
            ))}
          </div>

          {/* Quiz Results */}
          {isSubmitted && (
            <div className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Quiz Results</h2>
              <p className="text-xl mb-4 dark:text-gray-300">
                Score: {quizHistory[quizHistory.length - 1]?.grade}%
              </p>
              <div className="text-gray-600 dark:text-gray-400 mb-4">
                Time taken: {60 - timeLeft} seconds
              </div>
              <button
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quiz History */}
      {quizHistory.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8">
          <QuizHistory history={quizHistory} />
        </div>
      )}

      {/* Error Message */}
      {generationError && (
        <div className="max-w-4xl mx-auto mt-4">
          <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-md">
            {generationError}
          </div>
        </div>
      )}
    </div>
  );
}; 