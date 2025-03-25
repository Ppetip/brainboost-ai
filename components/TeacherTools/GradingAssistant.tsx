import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

interface GradingInput {
  subject: string;
  assignment: string;
  rubric: string;
  response: string;
}

export const GradingAssistant = () => {
  const [input, setInput] = useState<GradingInput>({
    subject: '',
    assignment: '',
    rubric: '',
    response: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleGrade = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = `As a grading assistant for ${input.subject}, evaluate this student response:
        
        Assignment: ${input.assignment}
        
        Rubric:
        ${input.rubric}
        
        Student Response:
        ${input.response}
        
        Provide:
        1. Numerical grade
        2. Detailed feedback
        3. Areas for improvement
        4. Positive aspects
        5. Suggested resources for improvement`;
      
      const result = await chatAI.getResponse(prompt, 'study');
      setFeedback(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Grading Assistant</h2>
      
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Subject"
          value={input.subject}
          onChange={(e) => setInput(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Assignment Description"
          value={input.assignment}
          onChange={(e) => setInput(prev => ({ ...prev, assignment: e.target.value }))}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          placeholder="Grading Rubric"
          value={input.rubric}
          onChange={(e) => setInput(prev => ({ ...prev, rubric: e.target.value }))}
          rows={4}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          placeholder="Student Response"
          value={input.response}
          onChange={(e) => setInput(prev => ({ ...prev, response: e.target.value }))}
          rows={6}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <button
        onClick={handleGrade}
        disabled={isLoading || !input.subject || !input.assignment || !input.response}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !input.subject || !input.assignment || !input.response
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
      >
        {isLoading ? 'Analyzing...' : 'Grade Assignment'}
      </button>

      {feedback && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{feedback}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}; 