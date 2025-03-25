import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

interface StudentData {
  className: string;
  subject: string;
  grades: string;
  observations: string;
}

export const StudentAnalytics = () => {
  const [data, setData] = useState<StudentData>({
    className: '',
    subject: '',
    grades: '',
    observations: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = `Analyze this class data and provide insights:
        
        Class: ${data.className}
        Subject: ${data.subject}
        
        Grades/Performance Data:
        ${data.grades}
        
        Teacher Observations:
        ${data.observations}
        
        Please provide:
        1. Performance trends analysis
        2. Areas needing attention
        3. Suggested interventions
        4. Differentiation strategies
        5. Resources for improvement`;
      
      const result = await chatAI.getResponse(prompt, 'study');
      setAnalysis(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Student Analytics</h2>
      
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Class Name/Period"
          value={data.className}
          onChange={(e) => setData(prev => ({ ...prev, className: e.target.value }))}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Subject"
          value={data.subject}
          onChange={(e) => setData(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          placeholder="Enter grades or performance data (e.g., Quiz 1: 75, 82, 90...)"
          value={data.grades}
          onChange={(e) => setData(prev => ({ ...prev, grades: e.target.value }))}
          rows={4}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          placeholder="Additional observations or concerns"
          value={data.observations}
          onChange={(e) => setData(prev => ({ ...prev, observations: e.target.value }))}
          rows={4}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isLoading || !data.className || !data.subject || !data.grades}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !data.className || !data.subject || !data.grades
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Class Data'}
      </button>

      {analysis && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}; 