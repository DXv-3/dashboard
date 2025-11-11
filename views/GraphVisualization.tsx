import React, { useEffect } from 'react';
import { useGraphStore } from '../stores/graphStore';
import GraphControls from '../components/graph/GraphControls';

const GraphVisualization: React.FC = () => {
    const { graphData, fetchGraphData } = useGraphStore();

    useEffect(() => {
        fetchGraphData();
    }, [fetchGraphData]);

    return (
        <div className="relative w-full h-full min-h-[400px] bg-gray-900 rounded-lg overflow-auto p-4">
             <GraphControls />
             <div className="text-gray-400">
                <h4 className="font-bold text-white">Nodes ({graphData.nodes.length})</h4>
                <ul className="list-disc pl-5 text-sm max-h-48 overflow-y-auto">
                    {graphData.nodes.map(node => <li key={node.id}>{node.label} ({node.type})</li>)}
                </ul>
                <h4 className="font-bold text-white mt-4">Links ({graphData.links.length})</h4>
                 <ul className="list-disc pl-5 text-sm max-h-48 overflow-y-auto">
                    {graphData.links.map((link, i) => <li key={`${link.source}-${link.target}-${i}`}>{String(link.source)} → {String(link.target)}</li>)}
                </ul>
             </div>
        </div>
    );
};

export default GraphVisualization;
