import React from 'react';
import CognitiveMetricsDashboard from '../components/observability/CognitiveMetricsDashboard';
import Card from '../components/Card';

const ObservabilityView: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Agent Observability</h2>
            <div className="grid grid-cols-1 gap-6">
                <Card title="Cognitive & Performance Metrics" className="lg:col-span-3">
                    <CognitiveMetricsDashboard />
                </Card>
                <Card title="Live Trace Viewer" className="lg:col-span-3">
                    <div className="h-96 bg-gray-900 rounded-md p-4 flex items-center justify-center">
                        <p className="text-gray-500">Live trace data would be visualized here.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ObservabilityView;
