import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

interface LessonDetails {
  subject: string;
  topic: string;
  gradeLevel: string;
  activity: string;
}

interface StudentNeeds {
  ell: boolean;
  iep: boolean;
  gifted: boolean;
  visual: boolean;
  auditory: boolean;
  kinesthetic: boolean;
}

export const DifferentiationHelper = () => {
  const [lessonDetails, setLessonDetails] = useState<LessonDetails>({
    subject: '',
    topic: '',
    gradeLevel: '',
    activity: '',
  });

  const [studentNeeds, setStudentNeeds] = useState<StudentNeeds>({
    ell: false,
    iep: false,
    gifted: false,
    visual: false,
    auditory: false,
    kinesthetic: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modifications, setModifications] = useState('');

  const needsLabels = {
    ell: 'English Language Learners',
    iep: 'Students with IEPs',
    gifted: 'Gifted/Advanced Learners',
    visual: 'Visual Learners',
    auditory: 'Auditory Learners',
    kinesthetic: 'Kinesthetic Learners',
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const selectedNeeds = Object.entries(studentNeeds)
        .filter(([_, value]) => value)
        .map(([key, _]) => needsLabels[key as keyof typeof needsLabels]);

      const prompt = `Create differentiated modifications for this lesson:

        Subject: ${lessonDetails.subject}
        Topic: ${lessonDetails.topic}
        Grade Level: ${lessonDetails.gradeLevel}
        Activity: ${lessonDetails.activity}

        Provide specific modifications and accommodations for:
        ${selectedNeeds.join(', ')}

        For each group, include:
        1. Content modifications
        2. Process adjustments
        3. Product alternatives
        4. Learning environment adaptations
        5. Specific materials or resources needed
        6. Assessment modifications`;
      
      const result = await chatAI.getResponse(prompt, 'study');
      setModifications(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Differentiation Helper</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Subject"
          value={lessonDetails.subject}
          onChange={(e) => setLessonDetails(prev => ({ ...prev, subject: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Topic"
          value={lessonDetails.topic}
          onChange={(e) => setLessonDetails(prev => ({ ...prev, topic: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Grade Level"
          value={lessonDetails.gradeLevel}
          onChange={(e) => setLessonDetails(prev => ({ ...prev, gradeLevel: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          placeholder="Describe the activity or lesson"
          value={lessonDetails.activity}
          onChange={(e) => setLessonDetails(prev => ({ ...prev, activity: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={3}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 dark:text-white">Select Student Needs</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(needsLabels).map(([key, label]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={studentNeeds[key as keyof StudentNeeds]}
                onChange={(e) => setStudentNeeds(prev => ({ ...prev, [key]: e.target.checked }))}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading || !lessonDetails.subject || !lessonDetails.activity || 
          !Object.values(studentNeeds).some(Boolean)}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !lessonDetails.subject || !lessonDetails.activity || 
            !Object.values(studentNeeds).some(Boolean)
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
      >
        {isLoading ? 'Generating...' : 'Generate Modifications'}
      </button>

      {modifications && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{modifications}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}; 