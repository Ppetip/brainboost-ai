import React from 'react';

interface TimerProps {
  timeLeft: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center mb-6">
      <div className="inline-block px-6 py-3 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">
          Time Remaining: {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}; 