import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ViewRenderer from './views/ViewRenderer';
import { useViewStore } from './stores/viewStore';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const { currentView } = useViewStore();

  return (
    <div className="h-screen w-screen bg-gray-900 flex text-white font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen">
        <Header title={currentView} />
        <div className="flex-1 overflow-hidden">
            <ErrorBoundary>
                <ViewRenderer />
            </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

export default App;
