import { QuizGenerator } from '@/components/QuizGenerator/QuizGenerator';

export default function QuizPractice() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
          Quiz Practice
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Test your knowledge with AI-generated quizzes on any topic
        </p>
        <QuizGenerator />
      </div>
    </div>
  );
} 