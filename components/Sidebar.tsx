import React from 'react';
import { useViewStore } from '../stores/viewStore';
import { View } from '../types';
import DashboardIcon from './icons/DashboardIcon';
import IngestIcon from './icons/IngestIcon';
import QueryIcon from './icons/QueryIcon';
import SynapseIcon from './icons/SynapseIcon';
import KnowledgeBaseIcon from './icons/KnowledgeBaseIcon';

const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useViewStore();

  const navItems = [
    { view: View.Dashboard, label: 'Dashboard', icon: DashboardIcon },
    { view: View.Ingest, label: 'Ingest', icon: IngestIcon },
    { view: View.Query, label: 'Query', icon: QueryIcon },
    { view: View.KnowledgeBase, label: 'Knowledge Base', icon: KnowledgeBaseIcon },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <SynapseIcon className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold ml-3 text-white">Synapse</h1>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.view} className="mb-2">
              <button
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center py-3 px-4 rounded-lg transition-colors ${
                  currentView === item.view
                    ? 'bg-primary text-white shadow-lg'
                    : 'hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-6 w-6 mr-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>Synapse Platform MVP</p>
        <p>&copy; 2024</p>
      </div>
    </aside>
  );
};

export default Sidebar;
