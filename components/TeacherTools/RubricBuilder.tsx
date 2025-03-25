import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

interface RubricCriteria {
  name: string;
  description: string;
  weight: number;
}

export const RubricBuilder = () => {
  const [assignment, setAssignment] = useState('');
  const [subject, setSubject] = useState('');
  const [criteria, setCriteria] = useState<RubricCriteria[]>([
    { name: '', description: '', weight: 0 }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [rubric, setRubric] = useState('');

  const handleAddCriteria = () => {
    setCriteria([...criteria, { name: '', description: '', weight: 0 }]);
  };

  const handleCriteriaChange = (index: number, field: keyof RubricCriteria, value: string | number) => {
    const newCriteria = [...criteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setCriteria(newCriteria);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = `Create a detailed rubric for ${assignment} in ${subject} with these criteria:
        ${criteria.map(c => `${c.name} (${c.weight}%): ${c.description}`).join('\n')}
        
        For each criterion, provide:
        1. Excellent (4 points)
        2. Good (3 points)
        3. Fair (2 points)
        4. Needs Improvement (1 point)
        
        Include specific examples and clear expectations for each level.`;
      
      const result = await chatAI.getResponse(prompt, 'study');
      setRubric(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Rubric Builder</h2>
      
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Assignment Name"
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        
        <div className="space-y-4">
          {criteria.map((criterion, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Criterion Name"
                value={criterion.name}
                onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
                className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                placeholder="Description"
                value={criterion.description}
                onChange={(e) => handleCriteriaChange(index, 'description', e.target.value)}
                className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="number"
                placeholder="Weight (%)"
                value={criterion.weight}
                onChange={(e) => handleCriteriaChange(index, 'weight', parseInt(e.target.value))}
                className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleAddCriteria}
          className="w-full py-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          + Add Criterion
        </button>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading || !assignment || !subject || !criteria[0].name}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !assignment || !subject || !criteria[0].name
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
      >
        {isLoading ? 'Generating...' : 'Generate Rubric'}
      </button>

      {rubric && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{rubric}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}; 