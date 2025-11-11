import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import GraphVisualization from './GraphVisualization';
import { useGraphStore } from '../stores/graphStore';
import { getIngestionHistory } from '../services/mockApiService';
import { IngestionRecord } from '../types';

const KnowledgeBaseView: React.FC = () => {
  const { fetchGraphData } = useGraphStore();
  const [ingestionHistory, setIngestionHistory] = useState<IngestionRecord[]>([]);

  useEffect(() => {
    fetchGraphData();
    setIngestionHistory(getIngestionHistory());
  }, [fetchGraphData]);
  
  const formatBytes = (bytes: number, decimals = 2) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Knowledge Graph Explorer" className="lg:col-span-2 h-[600px]">
        <GraphVisualization />
      </Card>
      <Card title="Recent Ingestions" className="lg:col-span-2">
         <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-gray-700 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3">File Name</th>
                        <th scope="col" className="px-6 py-3">Size</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Ingested At</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ingestionHistory.length > 0 ? ingestionHistory.map(record => (
                        <tr key={record.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{record.name}</td>
                            <td className="px-6 py-4">{formatBytes(record.size)}</td>
                            <td className="px-6 py-4">{record.type}</td>
                            <td className="px-6 py-4">{new Date(record.ingestedAt).toLocaleString()}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${record.status === 'Processed' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                    {record.status}
                                </span>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="text-center py-8 text-gray-500">No ingestion records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};

export default KnowledgeBaseView;
