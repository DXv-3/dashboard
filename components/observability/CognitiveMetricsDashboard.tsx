import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const toolUsageData = [
  { name: 'query_sales_db', usage: 450 },
  { name: 'search_docs', usage: 280 },
  { name: 'web_search', usage: 150 },
  { name: 'query_marketing_analytics', usage: 320 },
];

const agentAccuracyData = [
  { subject: 'Factuality', A: 95, fullMark: 100 },
  { subject: 'Reasoning', A: 85, fullMark: 100 },
  { subject: 'Tool Use', A: 92, fullMark: 100 },
  { subject: 'Completeness', A: 80, fullMark: 100 },
  { subject: 'Conciseness', A: 88, fullMark: 100 },
];

const CognitiveMetricsDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-[300px]">
        <h4 className="font-semibold text-center text-gray-300 mb-2">Tool Usage Frequency</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={toolUsageData}>
            <XAxis dataKey="name" stroke="#9a9a9a" fontSize={12} interval={0} angle={-20} textAnchor="end" />
            <YAxis stroke="#9a9a9a" />
            <Tooltip contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #4a4a4a' }} cursor={{ fill: 'rgba(100,100,100,0.1)' }}/>
            <Bar dataKey="usage" fill="#00aaff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[300px]">
        <h4 className="font-semibold text-center text-gray-300 mb-2">Agent Accuracy Profile</h4>
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={agentAccuracyData}>
                <PolarGrid stroke="#4a4a4a" />
                <PolarAngleAxis dataKey="subject" stroke="#9a9a9a" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4a4a4a" />
                <Radar name="Accuracy" dataKey="A" stroke="#ff4081" fill="#ff4081" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #4a4a4a' }} />
            </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CognitiveMetricsDashboard;
