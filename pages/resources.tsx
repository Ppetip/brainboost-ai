import { useState } from 'react';
import { FaBook, FaVideo, FaFileAlt, FaTools, FaFilter, FaStar } from 'react-icons/fa';

type ResourceCategory = 'all' | 'textbooks' | 'videos' | 'worksheets' | 'tools';
type SubjectFilter = 'all' | 'math' | 'science' | 'english' | 'history' | 'languages' | 'computer';

interface Resource {
  title: string;
  description: string;
  category: ResourceCategory;
  link: string;
  subject: string;
  level: string;
  featured?: boolean;
  rating?: number;
}

// Add these resources to the existing resources array
const newResources: Resource[] = [
  {
    title: 'edX',
    description: 'Take courses from world-class universities. Includes certificates and degree programs.',
    category: 'videos',
    link: 'https://www.edx.org',
    subject: 'Multiple',
    level: 'College',
    featured: true,
    rating: 4.8
  },
  {
    title: 'Wolfram Alpha',
    description: 'Computational knowledge engine for mathematics, science, and more.',
    category: 'tools',
    link: 'https://www.wolframalpha.com',
    subject: 'Mathematics',
    level: 'High School & College',
    featured: true,
    rating: 4.9
  },
  {
    title: 'National Geographic Education',
    description: 'Educational resources for geography, science, and history with interactive content.',
    category: 'videos',
    link: 'https://education.nationalgeographic.org',
    subject: 'Science',
    level: 'K-12',
    rating: 4.6
  },
  {
    title: 'Quizlet',
    description: 'Create and study flashcards, practice tests, and learning games.',
    category: 'tools',
    link: 'https://quizlet.com',
    subject: 'Multiple',
    level: 'All Levels',
    featured: true,
    rating: 4.7
  },
  {
    title: 'Codecademy',
    description: 'Interactive coding tutorials and courses for programming languages.',
    category: 'tools',
    link: 'https://www.codecademy.com',
    subject: 'Computer Science',
    level: 'All Levels',
    featured: true,
    rating: 4.8
  },
  {
    title: 'PBS Learning Media',
    description: 'Educational videos and interactive content across multiple subjects.',
    category: 'videos',
    link: 'https://www.pbslearningmedia.org',
    subject: 'Multiple',
    level: 'K-12',
    rating: 4.5
  },
  {
    title: 'IXL Learning',
    description: 'Personalized learning platform with practice exercises and assessments.',
    category: 'tools',
    link: 'https://www.ixl.com',
    subject: 'Multiple',
    level: 'K-12',
    featured: true,
    rating: 4.6
  },
  {
    title: 'Rosetta Stone',
    description: 'Language learning software with interactive lessons and speech recognition.',
    category: 'tools',
    link: 'https://www.rosettastone.com',
    subject: 'Languages',
    level: 'All Levels',
    featured: true,
    rating: 4.7
  },
  {
    title: 'Brilliant',
    description: 'Interactive courses in math, science, and computer science with challenging problems.',
    category: 'tools',
    link: 'https://brilliant.org',
    subject: 'Multiple',
    level: 'High School & College',
    featured: true,
    rating: 4.8
  },
  {
    title: 'NASA Education',
    description: 'Space science education resources, activities, and multimedia content.',
    category: 'videos',
    link: 'https://www.nasa.gov/education',
    subject: 'Science',
    level: 'All Levels',
    rating: 4.7
  },
  {
    title: 'Memrise',
    description: 'Language learning app using spaced repetition and mnemonics.',
    category: 'tools',
    link: 'https://www.memrise.com',
    subject: 'Languages',
    level: 'All Levels',
    rating: 4.5
  },
  {
    title: 'Crash Course',
    description: 'Educational video series covering various subjects in an engaging way.',
    category: 'videos',
    link: 'https://thecrashcourse.com',
    subject: 'Multiple',
    level: 'High School & College',
    featured: true,
    rating: 4.9
  },
  {
    title: 'GeoGebra',
    description: 'Interactive mathematics software for geometry, algebra, and calculus.',
    category: 'tools',
    link: 'https://www.geogebra.org',
    subject: 'Mathematics',
    level: 'Middle School & High School',
    rating: 4.7
  },
  {
    title: 'Smithsonian Learning Lab',
    description: 'Digital resources from the Smithsonian Institution for history and culture.',
    category: 'textbooks',
    link: 'https://learninglab.si.edu',
    subject: 'History',
    level: 'All Levels',
    rating: 4.6
  },
  {
    title: 'Grammarly',
    description: 'Writing assistance tool for grammar, spelling, and style improvements.',
    category: 'tools',
    link: 'https://www.grammarly.com',
    subject: 'English',
    level: 'All Levels',
    featured: true,
    rating: 4.8
  }
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const resources: Resource[] = [
    {
      title: 'Khan Academy',
      description: 'Free world-class education for anyone, anywhere. Comprehensive lessons in math, science, and more.',
      category: 'videos',
      link: 'https://www.khanacademy.org',
      subject: 'Multiple',
      level: 'All Levels',
      featured: true,
      rating: 5
    },
    {
      title: 'OpenStax Textbooks',
      description: 'Free, peer-reviewed, openly licensed textbooks for college and high school courses.',
      category: 'textbooks',
      link: 'https://openstax.org',
      subject: 'Multiple',
      level: 'High School & College',
      featured: true,
      rating: 4.8
    },
    {
      title: 'Desmos Graphing Calculator',
      description: 'Free online graphing calculator with advanced features for math visualization.',
      category: 'tools',
      link: 'https://www.desmos.com',
      subject: 'Mathematics',
      level: 'All Levels',
      rating: 4.9
    },
    {
      title: 'Coursera',
      description: 'Access courses from top universities worldwide. Covers various subjects with certificates available.',
      category: 'videos',
      link: 'https://www.coursera.org',
      subject: 'Multiple',
      level: 'College',
      featured: true,
      rating: 4.7
    },
    {
      title: 'PhET Interactive Simulations',
      description: 'Interactive science and math simulations for hands-on learning experiences.',
      category: 'tools',
      link: 'https://phet.colorado.edu',
      subject: 'Science',
      level: 'All Levels',
      featured: true,
      rating: 4.8
    },
    {
      title: 'Project Gutenberg',
      description: 'Free digital library with over 60,000 eBooks, perfect for literature studies.',
      category: 'textbooks',
      link: 'https://www.gutenberg.org',
      subject: 'English',
      level: 'All Levels',
      rating: 4.6
    },
    {
      title: 'Duolingo',
      description: 'Free language learning platform with interactive lessons and progress tracking.',
      category: 'tools',
      link: 'https://www.duolingo.com',
      subject: 'Languages',
      level: 'Beginner to Intermediate',
      featured: true,
      rating: 4.7
    },
    {
      title: 'MIT OpenCourseWare',
      description: 'Free access to MIT course materials, including lectures, assignments, and exams.',
      category: 'videos',
      link: 'https://ocw.mit.edu',
      subject: 'Multiple',
      level: 'College',
      featured: true,
      rating: 4.9
    },
    {
      title: 'CK-12',
      description: 'Free digital textbooks and learning resources for K-12 subjects.',
      category: 'textbooks',
      link: 'https://www.ck12.org',
      subject: 'Multiple',
      level: 'K-12',
      rating: 4.5
    },
    {
      title: 'Code.org',
      description: 'Learn computer science with interactive coding tutorials and projects.',
      category: 'tools',
      link: 'https://code.org',
      subject: 'Computer Science',
      level: 'Beginner',
      featured: true,
      rating: 4.8
    },
    ...newResources
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: FaBook },
    { id: 'textbooks', name: 'Textbooks', icon: FaBook },
    { id: 'videos', name: 'Video Lessons', icon: FaVideo },
    { id: 'worksheets', name: 'Worksheets', icon: FaFileAlt },
    { id: 'tools', name: 'Learning Tools', icon: FaTools },
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'math', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'english', name: 'English' },
    { id: 'history', name: 'History' },
    { id: 'languages', name: 'Languages' },
    { id: 'computer', name: 'Computer Science' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSubject = selectedSubject === 'all' || resource.subject.toLowerCase().includes(selectedSubject);
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || resource.featured;
    return matchesCategory && matchesSubject && matchesSearch && matchesFeatured;
  });

  // Sort resources by rating (highest first)
  const sortedResources = [...filteredResources].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover a curated collection of educational materials and tools
          </p>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-4 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${showFeaturedOnly
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
            >
              <FaStar className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as ResourceCategory)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Subject Filters */}
          <div className="flex flex-wrap gap-4">
            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id as SubjectFilter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors
                  ${selectedSubject === subject.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {resource.title}
                </h3>
                {resource.featured && (
                  <FaStar className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {resource.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {resource.subject}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {resource.level}
                </span>
              </div>
              {resource.rating && (
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(resource.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {resource.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 