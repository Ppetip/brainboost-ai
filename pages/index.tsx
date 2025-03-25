import { FaBook, FaChalkboardTeacher, FaBrain } from 'react-icons/fa';
import Link from 'next/link';
import { Features } from '@/components/Home/Features';
import PricingPlans from '../components/PricingPlans';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">BrainBoost AI</h1>
          <p className="text-xl mb-8">Revolutionize Learning with AI-Powered Education Tools</p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/study-buddy"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              Try Study Buddy
            </Link>
            <Link 
              href="/teacher"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
            >
              Teacher Tools
            </Link>
          </div>
        </div>
      </section>

      <Features />

      <PricingPlans type="student" />
    </main>
  );
}

const FeatureCard = ({ icon, title, description, link }) => (
  <Link href={link}>
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-blue-600 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
); 