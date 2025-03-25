import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

interface LessonPlan {
  subject: string;
  topic: string;
  gradeLevel: string;
  duration: string;
}

export const LessonPlanner = () => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>({
    subject: '',
    topic: '',
    gradeLevel: '',
    duration: '60',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = `Create a detailed ${lessonPlan.duration}-minute lesson plan for ${lessonPlan.subject} 
        about ${lessonPlan.topic} for grade ${lessonPlan.gradeLevel}. Include:
        1. Learning objectives
        2. Required materials
        3. Introduction/Hook (5-10 minutes)
        4. Main activities with timing
        5. Assessment strategies
        6. Closing/Summary
        7. Homework/Extension activities`;
      
      const result = await chatAI.getResponse(prompt, 'study');
      setPlan(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Lesson Planner</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Subject (e.g., Mathematics)"
          value={lessonPlan.subject}
          onChange={(e) => setLessonPlan(prev => ({ ...prev, subject: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Topic (e.g., Quadratic Equations)"
          value={lessonPlan.topic}
          onChange={(e) => setLessonPlan(prev => ({ ...prev, topic: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Grade Level (e.g., 9)"
          value={lessonPlan.gradeLevel}
          onChange={(e) => setLessonPlan(prev => ({ ...prev, gradeLevel: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          value={lessonPlan.duration}
          onChange={(e) => setLessonPlan(prev => ({ ...prev, duration: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
        </select>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={handleGenerate}
          disabled={isLoading || !lessonPlan.subject || !lessonPlan.topic || !lessonPlan.gradeLevel}
          className={`px-6 py-3 rounded-lg font-semibold text-white
            ${isLoading || !lessonPlan.subject || !lessonPlan.topic || !lessonPlan.gradeLevel
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
        >
          {isLoading ? 'Generating...' : 'Generate Lesson Plan'}
        </button>
        {plan && (
          <button
            onClick={handleGenerate}
            className="px-6 py-3 rounded-lg font-semibold text-white
              bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Regenerate
          </button>
        )}
      </div>

      {plan && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{plan}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}; 