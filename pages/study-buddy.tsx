import { useState } from 'react';
import { FaLightbulb, FaBook, FaQuestion } from 'react-icons/fa';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

const TOPIC_SUGGESTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Literature',
  'Computer Science',
  'Economics',
];

export default function StudyBuddy() {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const result = await chatAI.getResponse(`${topic}: ${question}`, 'study');
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
          Study Buddy
        </h1>
        
        {/* Topic Suggestions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {TOPIC_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setTopic(suggestion)}
                className={`px-4 py-2 rounded-full transition-colors
                  ${topic === suggestion
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Question Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic..."
              className="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask your question..."
              rows={4}
              className="w-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !topic || !question}
            className={`w-full py-4 rounded-lg font-semibold text-white
              ${isLoading || !topic || !question
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Thinking...' : 'Get Help'}
          </button>
        </form>

        {/* Response Area */}
        {response && (
          <div className="mt-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Answer</h3>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 