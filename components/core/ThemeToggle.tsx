import React, { useEffect } from 'react';
import { useUiStore } from '../../stores/uiStore';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useUiStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  return (
    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
