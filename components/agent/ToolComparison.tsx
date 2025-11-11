import React from 'react';
import Card from '../Card';

const mockTools = [
    { name: 'query_sales_db', confidence: 0.95, description: 'Queries the sales transaction database for revenue and product data.' },
    { name: 'query_marketing_analytics', confidence: 0.88, description: 'Retrieves data about marketing campaign performance and ROI.' },
    { name: 'search_internal_docs', confidence: 0.65, description: 'Performs a semantic search over internal documentation and reports.' },
    { name: 'general_web_search', confidence: 0.32, description: 'Uses a web search engine for general knowledge queries.' },
];

const ToolComparison: React.FC = () => {
  return (
    <Card title="Tool Selection Analysis">
        <div className="space-y-4">
            <p className="text-gray-400 text-sm">The agent considered the following tools for the current task, with their respective confidence scores.</p>
            {mockTools.map(tool => (
                <div key={tool.name} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-primary font-semibold">{tool.name}</span>
                        <span className="text-sm font-bold text-white">{ (tool.confidence * 100).toFixed(1) }%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${tool.confidence * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{tool.description}</p>
                </div>
            ))}
        </div>
    </Card>
  );
};

export default ToolComparison;
