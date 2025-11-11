
import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import IngestView from './views/IngestView';
import QueryView from './views/QueryView';
import DashboardView from './views/DashboardView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Query);

  const renderView = () => {
    switch (currentView) {
      case View.Ingest:
        return <IngestView />;
      case View.Query:
        return <QueryView />;
      case View.Dashboard:
        return <DashboardView />;
      default:
        return <QueryView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={currentView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
