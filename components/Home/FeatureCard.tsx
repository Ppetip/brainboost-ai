import { IconType } from 'react-icons';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconType;
  href: string;
}

export const FeatureCard = ({ title, description, icon: Icon, href }: FeatureCardProps) => {
  return (
    <Link href={href} className="block">
      <div className="p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
        hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
          <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Link>
  );
}; 