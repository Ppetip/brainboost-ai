import React, { useState } from 'react';
import { ChatAIClass } from '@/lib/ChatAIClass';
import { FaSpinner } from 'react-icons/fa';

interface SyllabusResponse {
  courseInfo: {
    title: string;
    description: string;
    prerequisites?: string[];
    materials: string[];
  };
  objectives: string[];
  policies: {
    attendance: string;
    grading: string;
    lateWork: string;
    academicIntegrity: string;
    communication: string;
  };
  schedule: {
    unit: string;
    topics: string[];
    duration: string;
    assessments: string[];
  }[];
  gradeBreakdown: {
    category: string;
    percentage: number;
    description: string;
  }[];
  accommodations: string;
  contactInfo: {
    officeHours: string;
    email: string;
    responseTime: string;
  };
}

export const SyllabusBuilder = () => {
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [courseLength, setCourseLength] = useState('semester');
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [syllabus, setSyllabus] = useState<SyllabusResponse | null>(null);

  const subjects = [
    'Mathematics',
    'Science',
    'English Language Arts',
    'History',
    'Foreign Language',
    'Computer Science',
    'Art',
    'Music',
    'Physical Education',
  ];

  const gradeLevels = [
    'Middle School',
    'High School (9-10)',
    'High School (11-12)',
    'AP/IB',
    'College',
  ];

  const generateSyllabus = async () => {
    if (!subject || !gradeLevel) return;
    
    setIsLoading(true);
    try {
      const chatAI = new ChatAIClass();
      const prompt = `Create a detailed ${courseLength} syllabus for a ${isAdvanced ? 'advanced ' : ''}${gradeLevel} ${subject} course.

      Consider these subject-specific elements:
      ${getSubjectSpecificPrompt(subject)}

      Return the response in this JSON format:
      {
        "courseInfo": {
          "title": "Course title",
          "description": "Course description",
          "prerequisites": ["List of prerequisites"],
          "materials": ["Required materials"]
        },
        "objectives": ["Learning objectives"],
        "policies": {
          "attendance": "Attendance policy",
          "grading": "Grading policy",
          "lateWork": "Late work policy",
          "academicIntegrity": "Academic integrity policy",
          "communication": "Communication expectations"
        },
        "schedule": [
          {
            "unit": "Unit title",
            "topics": ["Topics covered"],
            "duration": "Time allocation",
            "assessments": ["Assessment methods"]
          }
        ],
        "gradeBreakdown": [
          {
            "category": "Category name",
            "percentage": "Percentage value",
            "description": "Category description"
          }
        ],
        "accommodations": "Accommodation statement",
        "contactInfo": {
          "officeHours": "Office hours",
          "email": "Email policy",
          "responseTime": "Response time expectation"
        }
      }

      Ensure the content is appropriate for ${gradeLevel} level and follows standard educational practices.`;

      const response = await chatAI.getResponse(prompt, 'syllabus');
      const syllabusData = JSON.parse(response);
      setSyllabus(syllabusData);
    } catch (error) {
      console.error('Error generating syllabus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubjectSpecificPrompt = (subject: string) => {
    const prompts = {
      'Mathematics': `
        - Include specific mathematical concepts and progression
        - Add calculator and technology requirements
        - Include problem-solving methodology
        - Specify homework frequency and type
        - Include mathematical practice standards
        - Consider prerequisites carefully
        - Add resources for additional practice`,
      'Science': `
        - Include laboratory safety guidelines
        - Specify lab report requirements
        - List required lab equipment
        - Include field trip possibilities
        - Add scientific method emphasis
        - Consider lab work percentage in grading
        - Include scientific journal requirements`,
      'English Language Arts': `
        - List required texts and reading materials
        - Include writing assignment types and formats
        - Specify citation style requirements
        - Add discussion participation expectations
        - Include peer review processes
        - Consider presentation requirements
        - Add language conventions emphasis`,
      'History': `
        - Include primary source analysis methods
        - Specify research paper requirements
        - Add debate and discussion formats
        - Include current events integration
        - Consider historical thinking skills
        - Add source evaluation criteria
        - Include historical period coverage`,
      'Foreign Language': `
        - Include language proficiency expectations
        - Specify immersion activities
        - Add cultural component requirements
        - Include oral presentation guidelines
        - Consider conversation practice methods
        - Add language lab requirements
        - Include target language usage policy`,
      'Computer Science': `
        - List required software and hardware
        - Include coding standards
        - Specify project requirements
        - Add collaboration guidelines
        - Consider version control usage
        - Include testing requirements
        - Add code review processes`,
      'Art': `
        - List required materials and supplies
        - Include portfolio requirements
        - Specify critique methods
        - Add exhibition expectations
        - Consider studio time requirements
        - Include artistic process documentation
        - Add materials handling guidelines`,
      'Music': `
        - Include performance requirements
        - Specify practice expectations
        - Add ensemble participation guidelines
        - Include music theory components
        - Consider instrument care guidelines
        - Add performance attendance policy
        - Include repertoire requirements`,
      'Physical Education': `
        - Include fitness assessment methods
        - Specify dress code requirements
        - Add safety guidelines
        - Include participation expectations
        - Consider medical documentation needs
        - Add skill progression metrics
        - Include health education components`,
    };

    return prompts[subject] || 'Include standard course elements and progression';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Syllabus Builder</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Subject</option>
            {subjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
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
            <option value="">Select Grade Level</option>
            {gradeLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Course Length
          </label>
          <select
            value={courseLength}
            onChange={(e) => setCourseLength(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="semester">Semester</option>
            <option value="year">Full Year</option>
            <option value="quarter">Quarter</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={isAdvanced}
              onChange={(e) => setIsAdvanced(e.target.checked)}
              className="mr-2 h-4 w-4 rounded border-gray-300"
            />
            Advanced/Honors Course
          </label>
        </div>
      </div>

      <button
        onClick={generateSyllabus}
        disabled={isLoading || !subject || !gradeLevel}
        className={`w-full py-3 rounded-lg font-semibold text-white mb-8
          ${isLoading || !subject || !gradeLevel
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" />
            Generating Syllabus...
          </span>
        ) : (
          'Generate Syllabus'
        )}
      </button>

      {syllabus && (
        <div className="space-y-8 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          {/* Course Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {syllabus.courseInfo.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {syllabus.courseInfo.description}
            </p>
            {syllabus.courseInfo.prerequisites && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Prerequisites</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {syllabus.courseInfo.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Required Materials</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {syllabus.courseInfo.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Objectives */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Course Objectives
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              {syllabus.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          {/* Course Schedule */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Course Schedule
            </h3>
            <div className="space-y-4">
              {syllabus.schedule.map((unit, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {unit.unit} ({unit.duration})
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Topics</h5>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        {unit.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Assessments</h5>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        {unit.assessments.map((assessment, i) => (
                          <li key={i}>{assessment}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grading */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Grade Breakdown
            </h3>
            <div className="grid gap-4">
              {syllabus.gradeBreakdown.map((grade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      {grade.category}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {grade.description}
                    </p>
                  </div>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {grade.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Course Policies
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Attendance</h4>
                <p className="text-gray-700 dark:text-gray-300">{syllabus.policies.attendance}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Late Work</h4>
                <p className="text-gray-700 dark:text-gray-300">{syllabus.policies.lateWork}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Academic Integrity</h4>
                <p className="text-gray-700 dark:text-gray-300">{syllabus.policies.academicIntegrity}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Information
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Office Hours:</strong> {syllabus.contactInfo.officeHours}</p>
              <p><strong>Email Policy:</strong> {syllabus.contactInfo.email}</p>
              <p><strong>Response Time:</strong> {syllabus.contactInfo.responseTime}</p>
            </div>
          </div>

          {/* Accommodations */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Accommodations
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{syllabus.accommodations}</p>
          </div>
        </div>
      )}
    </div>
  );
}; 