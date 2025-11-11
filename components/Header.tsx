
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800 shadow-md h-16 flex items-center px-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </header>
  );
};

export default Header;
