import React from 'react';
import { GraphData } from '../../types';

interface D3ForceGraphProps {
    data: GraphData;
}

const D3ForceGraph: React.FC<D3ForceGraphProps> = ({ data }) => {
  // A simple, stable list-based representation of the graph, with no external libraries.
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-auto p-4 text-gray-400">
        <h4 className="font-bold text-white">Nodes ({data.nodes.length})</h4>
        <ul className="list-disc pl-5 text-sm max-h-48 overflow-y-auto">
            {data.nodes.map(node => <li key={node.id}>{node.label} ({node.type})</li>)}
        </ul>
        <h4 className="font-bold text-white mt-4">Links ({data.links.length})</h4>
         <ul className="list-disc pl-5 text-sm max-h-48 overflow-y-auto">
            {data.links.map((link, i) => <li key={`${link.source}-${link.target}-${i}`}>{String(link.source)} → {String(link.target)}</li>)}
        </ul>
    </div>
  );
};

export default D3ForceGraph;
