import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="dark">
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <main className="pt-16 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}; 