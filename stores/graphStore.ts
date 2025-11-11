import { create } from 'zustand';
import { GraphData } from '../types';
import { getGraphData } from '../services/mockApiService';

interface GraphState {
    graphData: GraphData;
    fetchGraphData: () => void;
}

export const useGraphStore = create<GraphState>((set) => ({
    graphData: { nodes: [], links: [] },
    fetchGraphData: () => {
        const data = getGraphData();
        set({ graphData: data });
    },
}));
