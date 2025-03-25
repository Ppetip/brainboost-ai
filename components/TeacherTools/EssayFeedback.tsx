import React, { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import { FaSpinner } from 'react-icons/fa';

interface FeedbackResponse {
  overview: string;
  structure: {
    introduction: string;
    bodyParagraphs: string;
    conclusion: string;
  };
  content: {
    strengths: string[];
    improvements: string[];
  };
  grammar: string;
  score: number;
  suggestions: string[];
}

export const EssayFeedback = () => {
  const [essay, setEssay] = useState('');
  const [prompt, setPrompt] = useState('');
  const [gradeLevel, setGradeLevel] = useState('high-school');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);

  const generateFeedback = async () => {
    if (!essay.trim()) return;
    
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const aiPrompt = `Analyze this ${gradeLevel} level essay${prompt ? ` about "${prompt}"` : ''}:

      "${essay}"

      Provide detailed feedback in this JSON format:
      {
        "overview": "Brief overall assessment",
        "structure": {
          "introduction": "Feedback on introduction",
          "bodyParagraphs": "Feedback on body paragraphs",
          "conclusion": "Feedback on conclusion"
        },
        "content": {
          "strengths": ["List of strengths"],
          "improvements": ["Areas for improvement"]
        },
        "grammar": "Grammar and mechanics feedback",
        "score": "Score out of 100",
        "suggestions": ["Specific suggestions for improvement"]
      }`;

      const response = await chatAI.getResponse(aiPrompt, 'essay');
      const feedbackData = JSON.parse(response);
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Error generating feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Essay Feedback Tool</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Essay Prompt (Optional)
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter the essay prompt or topic"
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Grade Level
          </label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="middle-school">Middle School</option>
            <option value="high-school">High School</option>
            <option value="college">College</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Essay Text
        </label>
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Paste the student's essay here..."
          rows={10}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <button
        onClick={generateFeedback}
        disabled={isLoading || !essay.trim()}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !essay.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" />
            Analyzing Essay...
          </span>
        ) : (
          'Generate Feedback'
        )}
      </button>

      {feedback && (
        <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Overall Assessment
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{feedback.overview}</p>
            <div className="mt-2 flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {feedback.score}/100
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Structure Analysis
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Introduction</h4>
                <p className="text-gray-700 dark:text-gray-300">{feedback.structure.introduction}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Body Paragraphs</h4>
                <p className="text-gray-700 dark:text-gray-300">{feedback.structure.bodyParagraphs}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Conclusion</h4>
                <p className="text-gray-700 dark:text-gray-300">{feedback.structure.conclusion}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Strengths
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {feedback.content.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Areas for Improvement
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {feedback.content.improvements.map((improvement, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{improvement}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Grammar and Mechanics
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{feedback.grammar}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Suggestions for Improvement
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}; 