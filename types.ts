export enum View {
  Dashboard = 'Dashboard',
  Ingest = 'Ingest',
  Query = 'Query',
  KnowledgeBase = 'Knowledge Base',
  Observability = 'Observability',
}

export interface IngestionRecord {
  id: string;
  name: string;
  size: number;
  type: string;
  ingestedAt: string;
  status: 'Processed' | 'Failed' | 'Pending';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  sources?: Source[];
}

export interface Source {
  title: string;
  snippet: string;
}

export interface HealthMetric {
  name: string;
  status: 'ok' | 'warning' | 'error';
  latency: number;
}

export enum AgentStepType {
  Thought = 'Thought',
  Action = 'Action',
  Observation = 'Observation',
}

export interface AgentStep {
  id: string;
  type: AgentStepType;
  content: string;
}

export interface GraphNode {
    id: string | number;
    label: string;
    type: string;
    x?: number;
    y?: number;
}

export interface GraphLink {
    source: string | number;
    target: string | number;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

export type QueryStrategy = 'Simple' | 'Multi-hop' | 'Agentic';
