export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizResult {
  topic: string;
  grade: number;
  timestamp: string;
  correctCount: number;
  totalQuestions: number;
  timeSpent: number;
}

export interface QuizHistoryProps {
  history: QuizResult[];
} 