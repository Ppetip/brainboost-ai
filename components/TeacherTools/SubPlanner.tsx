import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';

interface SubPlanDetails {
  subject: string;
  grade: string;
  date: string;
  periods: string;
  topics: string;
  materials: string;
}

export const SubPlanner = () => {
  const [details, setDetails] = useState<SubPlanDetails>({
    subject: '',
    grade: '',
    date: '',
    periods: '',
    topics: '',
    materials: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = `Create a detailed substitute teacher plan following best practices and professional guidelines. Use your knowledge of effective substitute teaching plans to provide:

        Class Details:
        Subject: ${details.subject}
        Grade Level: ${details.grade}
        Date: ${details.date}
        Class Periods: ${details.periods}
        Topics: ${details.topics}
        Available Materials: ${details.materials}

        Include these essential sections:

        1. QUICK REFERENCE (Top of Plan)
        - Teacher name and contact information
        - School schedule/bell times
        - Emergency procedures and contacts
        - Location of important items (attendance system, supplies, etc.)
        - Class rules and routines

        2. CLASSROOM MANAGEMENT
        - Seating chart location/details
        - Behavior management system
        - Specific student accommodations/medical needs (no names, just procedures)
        - Bathroom/hall pass procedures
        - Electronic device policies

        3. DETAILED SCHEDULE (For Each Period)
        - Bell-to-bell timing
        - Warm-up/entry activity (5-10 minutes)
        - Main lesson activities with step-by-step instructions
        - Early finisher activities
        - Clean-up procedures
        - Exit tickets/closure

        4. LESSON MATERIALS
        - Detailed description of handouts/materials
        - Technology instructions (if needed)
        - Answer keys location
        - Alternative activities if technology fails

        5. STUDENT SUPPORT
        - List of reliable student helpers
        - Special needs accommodations (general terms)
        - ESL/ELL support strategies
        - Extension activities for advanced students

        6. END OF DAY
        - Collection/organization of student work
        - Required paperwork
        - Attendance submission process
        - Substitute teacher report template
        - Next day preparation notes

        7. ADDITIONAL NOTES
        - Duty responsibilities (if any)
        - Staff bathroom locations
        - Lunch procedures
        - Nearby teachers for assistance

        Format the plan clearly with headers, bullet points, and emphasis on critical information. Make it easy to follow during a busy school day.`;
      
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
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Sub Plan Generator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Subject"
          value={details.subject}
          onChange={(e) => setDetails(prev => ({ ...prev, subject: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Grade Level"
          value={details.grade}
          onChange={(e) => setDetails(prev => ({ ...prev, grade: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="date"
          value={details.date}
          onChange={(e) => setDetails(prev => ({ ...prev, date: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Class Periods (e.g., 1st, 3rd, 5th)"
          value={details.periods}
          onChange={(e) => setDetails(prev => ({ ...prev, periods: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          placeholder="Topics to Cover"
          value={details.topics}
          onChange={(e) => setDetails(prev => ({ ...prev, topics: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={3}
        />
        <textarea
          placeholder="Available Materials and Resources"
          value={details.materials}
          onChange={(e) => setDetails(prev => ({ ...prev, materials: e.target.value }))}
          className="p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={3}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading || !details.subject || !details.grade || !details.topics}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !details.subject || !details.grade || !details.topics
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
      >
        {isLoading ? 'Generating...' : 'Generate Sub Plan'}
      </button>

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