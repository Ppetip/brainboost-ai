import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

type MovieCategory = 'general' | 'math' | 'science' | 'history' | 'english' | 'arts' | 'foreign';

interface MovieSearch {
  category: MovieCategory;
  gradeLevel: string;
  topic: string;
}

const CATEGORIES: Record<MovieCategory, string> = {
  general: 'General Educational',
  math: 'Mathematics',
  science: 'Science',
  history: 'History & Social Studies',
  english: 'English & Literature',
  arts: 'Arts & Music',
  foreign: 'Foreign Languages',
};

const GRADE_LEVELS = [
  'Elementary (K-5)',
  'Middle School (6-8)',
  'High School (9-12)',
  'All Grades'
];

export const MovieDatabase = () => {
  const [search, setSearch] = useState<MovieSearch>({
    category: 'general',
    gradeLevel: '',
    topic: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = `Create a comprehensive list of educational movies for:
        
        Category: ${CATEGORIES[search.category]}
        Grade Level: ${search.gradeLevel}
        ${search.topic ? `Topic: ${search.topic}` : ''}

        For each movie, provide only:
        - Title (Year)
        - Duration
        - One-line description
        - Age rating
        - Subject relevance

        Format as a bulleted list.
        Include at least 15-20 relevant movies.
        Focus on variety and educational value.
        Sort by most commonly used in classrooms.`;
      
      const result = await chatAI.getResponse(prompt, 'study');
      setResults(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Educational Movie Database</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={search.category}
            onChange={(e) => setSearch(prev => ({ 
              ...prev, 
              category: e.target.value as MovieCategory 
            }))}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {Object.entries(CATEGORIES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Grade Level
          </label>
          <select
            value={search.gradeLevel}
            onChange={(e) => setSearch(prev => ({ ...prev, gradeLevel: e.target.value }))}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Grade Level</option>
            {GRADE_LEVELS.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., World War II, Space"
            value={search.topic}
            onChange={(e) => setSearch(prev => ({ ...prev, topic: e.target.value }))}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={isLoading || !search.category || !search.gradeLevel}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !search.category || !search.gradeLevel
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
      >
        {isLoading ? 'Searching...' : 'Find Movies'}
      </button>

      {results && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{results}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}; 