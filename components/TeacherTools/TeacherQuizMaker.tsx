import { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';

interface QuizDetails {
  subject: string;
  section: string;
  title: string;
  questionCount: number;
}

interface Question {
  question: string;
  choices: string[];
  correctAnswer: number;
}

// Subject sections mapping
const SUBJECT_SECTIONS: Record<string, string[]> = {
  'Mathematics': [
    'Algebra',
    'Geometry',
    'Trigonometry',
    'Calculus',
    'Statistics',
    'Number Theory',
  ],
  'Science': [
    'Biology',
    'Chemistry',
    'Physics',
    'Earth Science',
    'Astronomy',
    'Environmental Science',
  ],
  'English': [
    'Literature',
    'Grammar',
    'Writing',
    'Poetry',
    'Shakespeare',
    'Vocabulary',
  ],
  'History': [
    'World History',
    'US History',
    'Ancient Civilizations',
    'Modern History',
    'Geography',
    'Civics',
  ],
  'Foreign Language': [
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Latin',
  ],
};

const SUBJECTS = Object.keys(SUBJECT_SECTIONS);

export const TeacherQuizMaker = () => {
  const [quizDetails, setQuizDetails] = useState<QuizDetails>({
    subject: '',
    section: '',
    title: '',
    questionCount: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const generatePrompt = (details: QuizDetails) => {
    return `Create a multiple choice quiz with these specifications:
      Subject: ${details.subject}
      Topic: ${details.section}
      Title: ${details.title || 'Quiz'}
      Questions: ${details.questionCount}

      Return the response in this exact JSON format:
      {
        "questions": [
          {
            "question": "What is the capital of France?",
            "choices": [
              "Paris",
              "London",
              "Berlin",
              "Madrid"
            ],
            "correctAnswer": 0
          }
        ]
      }

      Requirements:
      1. Generate exactly ${details.questionCount} questions
      2. Each question must have exactly 4 choices
      3. correctAnswer must be 0-3 (index of correct choice)
      4. Questions must be about ${details.subject} - ${details.section}
      5. Return only valid JSON
      6. Ensure questions are appropriate for the subject
      7. Mix easy, medium, and hard questions
      8. Distribute correct answers evenly`;
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = generatePrompt(quizDetails);
      console.log('Sending prompt:', prompt); // Debug log

      const response = await chatAI.getResponse(prompt, 'quiz');
      console.log('Raw AI Response:', response); // Debug log

      if (!response) {
        console.error('No response received from AI');
        return;
      }

      try {
        // Clean the response
        const jsonStr = response.replace(/```json\n?|\n?```/g, '').trim();
        console.log('Cleaned JSON string:', jsonStr); // Debug log

        const parsed = JSON.parse(jsonStr);
        console.log('Parsed response:', parsed); // Debug log

        if (!parsed.questions || !Array.isArray(parsed.questions)) {
          console.error('Invalid response structure:', parsed);
          return;
        }

        const validQuestions = parsed.questions.map((q: any) => {
          if (!q.question || !Array.isArray(q.choices) || q.choices.length !== 4) {
            console.error('Invalid question format:', q);
            return null;
          }
          return {
            question: q.question,
            choices: q.choices,
            correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : parseInt(q.correctAnswer)
          };
        }).filter(q => q !== null);

        console.log('Valid questions:', validQuestions); // Debug log

        if (validQuestions.length > 0) {
          setQuestions(validQuestions);
        } else {
          console.error('No valid questions generated');
        }
      } catch (parseError) {
        console.error('Parse Error:', parseError);
        console.error('Failed to parse response:', response);
      }
    } catch (error) {
      console.error('Generation Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const lineHeight = 7;

    // Add title
    doc.setFontSize(16);
    doc.text(quizDetails.title || 'Quiz', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 2;

    // Add quiz details
    doc.setFontSize(12);
    doc.text(`Name: _______________________`, margin, yPos);
    doc.text(`Date: ________________________`, pageWidth - margin, yPos, { align: 'right' });
    yPos += lineHeight * 2;

    // Add questions
    doc.setFontSize(12);
    questions.forEach((q, i) => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.text(`${i + 1}. ${q.question}`, margin, yPos);
      yPos += lineHeight;

      // Add choices
      q.choices.forEach((choice, j) => {
        doc.text(`${String.fromCharCode(97 + j)}) ${choice}`, margin + 10, yPos);
        yPos += lineHeight;
      });

      yPos += lineHeight; // Space between questions
    });

    // Add answer key on a new page
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(14);
    doc.text('Answer Key', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 2;

    doc.setFontSize(12);
    questions.forEach((q, i) => {
      doc.text(
        `${i + 1}. ${String.fromCharCode(97 + q.correctAnswer)}`,
        margin,
        yPos
      );
      yPos += lineHeight;
    });

    doc.save(`${quizDetails.title || 'quiz'}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Quiz Generator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <select
            value={quizDetails.subject}
            onChange={(e) => {
              setQuizDetails(prev => ({
                ...prev,
                subject: e.target.value,
                section: '', // Reset section when subject changes
              }));
            }}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Subject</option>
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Section
          </label>
          <select
            value={quizDetails.section}
            onChange={(e) => setQuizDetails(prev => ({ ...prev, section: e.target.value }))}
            disabled={!quizDetails.subject}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white
              disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
          >
            <option value="">Select Section</option>
            {quizDetails.subject && SUBJECT_SECTIONS[quizDetails.subject].map(section => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quiz Title
          </label>
          <input
            type="text"
            placeholder="Enter quiz title"
            value={quizDetails.title}
            onChange={(e) => setQuizDetails(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Questions
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={quizDetails.questionCount}
            onChange={(e) => setQuizDetails(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={handleGenerate}
          disabled={isLoading || !quizDetails.subject || !quizDetails.section}
          className={`px-6 py-3 rounded-lg font-semibold text-white
            ${isLoading || !quizDetails.subject || !quizDetails.section
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
        >
          {isLoading ? 'Generating...' : 'Generate Quiz'}
        </button>
        {questions.length > 0 && (
          <>
            <button
              onClick={handleGenerate}
              className="px-6 py-3 rounded-lg font-semibold text-white
                bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            >
              Regenerate
            </button>
            <button
              onClick={generatePDF}
              className="px-6 py-3 rounded-lg font-semibold text-white
                bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              Download PDF
            </button>
          </>
        )}
      </div>

      {/* Display Generated Quiz */}
      {questions.length > 0 && (
        <div className="space-y-6 mt-8">
          <h3 className="text-xl font-semibold dark:text-white mb-4">
            {quizDetails.title || 'Generated Quiz'}
          </h3>
          
          {questions.map((q, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="font-semibold mb-4 dark:text-white">
                {i + 1}. {q.question}
              </p>
              <div className="space-y-2 pl-6">
                {q.choices.map((choice, j) => (
                  <p key={j} className="dark:text-gray-300">
                    {String.fromCharCode(97 + j)}) {choice}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Add Answer Key Display */}
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4 dark:text-white">Answer Key</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {questions.map((q, i) => (
                <div key={i} className="dark:text-gray-300">
                  {i + 1}. {String.fromCharCode(97 + q.correctAnswer)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 