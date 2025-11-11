
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in ${className}`}>
      <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;
