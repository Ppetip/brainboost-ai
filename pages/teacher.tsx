import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaFileAlt, FaBook, FaChartBar, FaBrain, FaClock, FaFilm, FaChair, FaGraduationCap, FaPoll, FaTimes } from 'react-icons/fa';
import { TeacherQuizMaker } from '@/components/TeacherTools/TeacherQuizMaker';
import { LessonPlanner } from '@/components/TeacherTools/LessonPlanner';
import { GradingAssistant } from '@/components/TeacherTools/GradingAssistant';
import { StudentAnalytics } from '@/components/TeacherTools/StudentAnalytics';
import { SubPlanner } from '@/components/TeacherTools/SubPlanner';
import { MovieDatabase } from '@/components/TeacherTools/MovieDatabase';
import { SeatingChart } from '@/components/TeacherTools/SeatingChart';
import { EssayFeedback } from '@/components/TeacherTools/EssayFeedback';
import { SyllabusBuilder } from '@/components/TeacherTools/SyllabusBuilder';
import { PollCreator } from '@/components/TeacherTools/PollCreator';
import PricingPlans from '../components/PricingPlans';

type Tool = 'quiz' | 'lesson' | 'grading' | 'analytics' | 'sub' | 'movies' | 'seating' | 'essay-feedback' | 'syllabus' | 'poll' | null;

// Set the app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90vw',
    width: '1200px',
    maxHeight: '90vh',
    padding: '0',
    border: 'none',
    background: 'transparent',
    overflow: 'visible',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
  },
};

export default function TeacherTools() {
  const [selectedTool, setSelectedTool] = useState<Tool>(null);
  const [showPricingModal, setShowPricingModal] = useState(true);

  const handleCloseModal = () => {
    setShowPricingModal(false);
  };

  const tools = [
    {
      id: 'quiz',
      title: 'Quiz Generator',
      icon: <FaFileAlt className="text-4xl mb-4" />,
      description: 'Create professional quizzes with automatic PDF generation. Customize questions and reroll until perfect.',
    },
    {
      id: 'lesson',
      title: 'Lesson Planner',
      icon: <FaBook className="text-4xl mb-4" />,
      description: 'Generate detailed lesson plans with objectives, activities, and assessments aligned to standards.',
    },
    {
      id: 'grading',
      title: 'Grading Assistant',
      icon: <FaChartBar className="text-4xl mb-4" />,
      description: 'AI-powered essay and assignment grading with detailed feedback and rubric alignment.',
    },
    {
      id: 'analytics',
      title: 'Student Analytics',
      icon: <FaBrain className="text-4xl mb-4" />,
      description: 'Analyze student performance patterns and get personalized intervention suggestions.',
    },
    {
      id: 'sub',
      title: 'Sub Planner',
      icon: <FaClock className="text-4xl mb-4" />,
      description: 'Generate comprehensive substitute teacher plans with materials and instructions.',
    },
    {
      id: 'movies',
      title: 'Educational Movies',
      icon: <FaFilm className="text-4xl mb-4" />,
      description: 'Searchable database of curriculum-aligned movies organized by subject and topic.',
    },
    {
      id: 'seating',
      title: 'Seating Chart',
      icon: <FaChair className="text-4xl mb-4" />,
      description: 'Generate optimal seating arrangements based on class size and student names.',
    },
    {
      id: 'essay-feedback',
      title: 'Essay Feedback',
      icon: <span className="text-5xl mb-4 text-blue-600 dark:text-blue-400">✍️</span>,
      description: 'Get detailed feedback on student essays with AI-powered analysis',
    },
    {
      id: 'syllabus',
      title: 'Syllabus Builder',
      icon: <FaGraduationCap className="text-4xl mb-4" />,
      description: 'Generate comprehensive course syllabi with subject-specific requirements and policies.',
    },
    {
      id: 'poll',
      title: 'Interactive Polls',
      icon: <FaPoll className="text-4xl mb-4" />,
      description: 'Create real-time polls with QR code access for instant student feedback.',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Modal
        isOpen={showPricingModal}
        onRequestClose={handleCloseModal}
        style={customModalStyles}
        contentLabel="Teacher Pricing Plans"
      >
        <div className="relative bg-gray-900 rounded-lg shadow-2xl border border-gray-800">
          <button
            onClick={handleCloseModal}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-200 z-10"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <PricingPlans type="teacher" onClose={handleCloseModal} />
        </div>
      </Modal>

      <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
        Teacher Tools
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
        AI-powered tools to streamline your teaching workflow
      </p>

      {!selectedTool ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id as Tool)}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                hover:shadow-xl transition-all text-center hover:scale-105
                border-2 border-transparent hover:border-blue-500
                flex flex-col items-center"
            >
              {tool.image ? (
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={tool.image} 
                    alt={tool.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-blue-600 dark:text-blue-400">
                  {tool.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                {tool.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {tool.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTool(null)}
            className="mb-6 px-4 py-2 text-blue-600 dark:text-blue-400 
              hover:underline flex items-center gap-2"
          >
            ← Back to Tools
          </button>

          {selectedTool === 'quiz' && <TeacherQuizMaker />}
          {selectedTool === 'lesson' && <LessonPlanner />}
          {selectedTool === 'grading' && <GradingAssistant />}
          {selectedTool === 'analytics' && <StudentAnalytics />}
          {selectedTool === 'sub' && <SubPlanner />}
          {selectedTool === 'movies' && <MovieDatabase />}
          {selectedTool === 'seating' && <SeatingChart />}
          {selectedTool === 'essay-feedback' && <EssayFeedback />}
          {selectedTool === 'syllabus' && <SyllabusBuilder />}
          {selectedTool === 'poll' && <PollCreator />}
        </div>
      )}
    </div>
  );
} 