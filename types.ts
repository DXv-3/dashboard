// FIX: Add import for 'd3' to resolve missing namespace and provide types for graph visualization.
import * as d3 from 'd3';

export enum View {
  Ingest = 'Data Ingestion',
  Query = 'Cognitive Core',
  Dashboard = 'System Dashboard',
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'entity' | 'concept' | 'document';
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  label: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  graphData?: GraphData;
  sources?: { title: string; snippet: string }[];
}

export interface HealthMetric {
    name: string;
    status: 'ok' | 'warning' | 'error';
    latency: number;
}