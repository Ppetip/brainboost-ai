import React from 'react';
import { PricingTier, PricingPlansProps } from '../types/pricing';
import { useRouter } from 'next/router';

const studentTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out BrainBoost',
    features: [
      { name: 'Unlimited Resource Surfing', included: true },
      { name: 'Study Buddy Chats', included: true, limit: '5 total' },
      { name: 'Quiz Generations', included: true, limit: '5 total' },
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Student Plus',
    price: 15,
    period: 'month',
    description: 'Great for active students',
    features: [
      { name: 'Unlimited Resource Surfing', included: true },
      { name: 'Study Buddy Chats', included: true, limit: '20 per week' },
      { name: 'Quiz Generations', included: true, limit: '20 per month' },
    ],
    buttonText: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Student Pro',
    price: 50,
    period: 'month',
    description: 'For serious academic achievers',
    features: [
      { name: 'Unlimited Resource Surfing', included: true },
      { name: 'Study Buddy Chats', included: true, limit: 'Unlimited' },
      { name: 'Quiz Generations', included: true, limit: 'Unlimited' },
    ],
    buttonText: 'Start Free Trial',
  },
];

const teacherTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Try our teacher tools',
    features: [
      { name: 'All Student Free Features', included: true },
      { name: 'Lesson Plan Generation', included: true, limit: '2 total' },
      { name: 'Quiz Creation & Export', included: true, limit: '2 total' },
      { name: 'Assignment Generator', included: true, limit: '2 total' },
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Teacher Plus',
    price: 20,
    period: 'month',
    description: 'Essential teaching assistant',
    features: [
      { name: 'All Student Plus Features', included: true },
      { name: 'Lesson Plan Generation', included: true, limit: '10 per month' },
      { name: 'Quiz Creation & Export', included: true, limit: '15 per month' },
      { name: 'Assignment Generator', included: true, limit: '10 per month' },
    ],
    buttonText: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Teacher Pro',
    price: 100,
    period: 'month',
    description: 'Ultimate teaching toolkit',
    features: [
      { name: 'All Student Pro Features', included: true },
      { name: 'Lesson Plan Generation', included: true, limit: 'Unlimited' },
      { name: 'Quiz Creation & Export', included: true, limit: 'Unlimited' },
      { name: 'Assignment Generator', included: true, limit: 'Unlimited' },
    ],
    buttonText: 'Start Free Trial',
  },
];

interface ExtendedPricingPlansProps extends PricingPlansProps {
  onClose?: () => void;
}

const PricingPlans: React.FC<ExtendedPricingPlansProps> = ({ type, onClose }) => {
  const router = useRouter();
  const tiers = type === 'student' ? studentTiers : teacherTiers;

  const handlePlanClick = (tier: PricingTier) => {
    if (type === 'student') {
      if (tier.name === 'Free') {
        router.push('/study-buddy');
      } else {
        router.push('/signup?plan=' + tier.name.toLowerCase().replace(' ', '-'));
      }
    } else {
      if (tier.name === 'Free') {
        if (onClose) {
          onClose();
        }
      } else {
        router.push('/signup?plan=teacher-' + tier.name.toLowerCase().replace(' ', '-'));
      }
    }
  };

  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {type === 'student' ? 'Student Plans' : 'Teacher Plans'}
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Choose the perfect plan for your needs
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-700 bg-gray-800 ${
                tier.highlighted
                  ? 'border-2 border-blue-400'
                  : 'border border-gray-700'
              }`}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white">
                  {tier.name}
                </h2>
                <p className="mt-4 text-sm text-gray-300">
                  {tier.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">
                    ${tier.price}
                  </span>
                  <span className="text-base font-medium text-gray-300">
                    /{tier.period}
                  </span>
                </p>
                <button
                  onClick={() => handlePlanClick(tier)}
                  className={`mt-8 block w-full py-3 px-6 rounded-md text-center font-medium ${
                    tier.highlighted
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wide">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.name}
                      className="flex space-x-3"
                    >
                      <svg
                        className={`flex-shrink-0 h-5 w-5 ${
                          feature.included ? 'text-blue-400' : 'text-gray-400'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-300">
                        {feature.name}
                        {feature.limit && ` (${feature.limit})`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans; 