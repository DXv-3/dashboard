import React from 'react';
import { useViewStore } from '../stores/viewStore';
import { View } from '../types';
import DashboardView from './DashboardView';
import IngestView from './IngestView';
import QueryView from './QueryView';
import KnowledgeBaseView from './KnowledgeBaseView';

const ViewRenderer: React.FC = () => {
  const { currentView } = useViewStore();

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <DashboardView />;
      case View.Ingest:
        return <IngestView />;
      case View.Query:
        return <QueryView />;
      case View.KnowledgeBase:
        return <KnowledgeBaseView />;
      default:
        return <DashboardView />;
    }
  };

  return <div className="p-6 h-full overflow-y-auto">{renderView()}</div>;
};

export default ViewRenderer;
