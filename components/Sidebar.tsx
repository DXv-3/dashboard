
import React from 'react';
import { View } from '../types';
import IngestIcon from './icons/IngestIcon';
import QueryIcon from './icons/QueryIcon';
import DashboardIcon from './icons/DashboardIcon';
import SynapseIcon from './icons/SynapseIcon';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  view: View;
  label: string;
  currentView: View;
  onClick: (view: View) => void;
  children: React.ReactNode;
}> = ({ view, label, currentView, onClick, children }) => {
  const isActive = currentView === view;
  return (
    <li
      onClick={() => onClick(view)}
      className={`flex items-center p-3 my-2 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-lg'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
      <span className="ml-4 font-medium hidden md:block">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="bg-gray-800 text-white w-16 md:w-64 flex flex-col transition-all duration-300">
      <div className="flex items-center justify-center md:justify-start p-4 border-b border-gray-700 h-16">
         <SynapseIcon className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold ml-3 hidden md:block">Synapse</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul>
          <NavItem
            view={View.Query}
            label="Cognitive Core"
            currentView={currentView}
            onClick={setCurrentView}
          >
            <QueryIcon className="h-6 w-6" />
          </NavItem>
          <NavItem
            view={View.Ingest}
            label="Data Ingestion"
            currentView={currentView}
            onClick={setCurrentView}
          >
            <IngestIcon className="h-6 w-6" />
          </NavItem>
          <NavItem
            view={View.Dashboard}
            label="Dashboard"
            currentView={currentView}
            onClick={setCurrentView}
          >
            <DashboardIcon className="h-6 w-6" />
          </NavItem>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-500 hidden md:block">
        <p>Synapse Platform MVP</p>
        <p>&copy; 2024</p>
      </div>
    </aside>
  );
};

export default Sidebar;
