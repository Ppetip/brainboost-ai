import React from 'react';

interface IntroSectionProps {
  onComplete: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 z-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">QuizWhiz</h1>
      <p className="text-xl text-gray-600">Master Any Topic, One Quiz at a Time</p>
      <button 
        onClick={onComplete}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Get Started
      </button>
    </div>
  );
}; 