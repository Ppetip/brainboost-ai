import { FaBook, FaChalkboardTeacher, FaBrain, FaQuestionCircle } from 'react-icons/fa';
import { FeatureCard } from './FeatureCard';

export const Features = () => {
  const features = [
    {
      title: 'Study Buddy AI',
      description: 'Your personal AI tutor that helps explain complex topics, answers questions, and guides your learning journey.',
      icon: FaBrain,
      href: '/study-buddy'
    },
    {
      title: 'Quiz Generator',
      description: 'Create custom quizzes instantly with AI-powered question generation for any subject or topic.',
      icon: FaQuestionCircle,
      href: '/quiz-generator'
    },
    {
      title: 'Teacher Tools',
      description: 'Comprehensive suite of tools for educators including lesson planning, grading assistance, and classroom management.',
      icon: FaChalkboardTeacher,
      href: '/teacher'
    },
    {
      title: 'Learning Resources',
      description: 'Access a vast library of educational materials, study guides, and practice exercises.',
      icon: FaBook,
      href: '/resources'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Empowering education with AI-driven tools and resources
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 