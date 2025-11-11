
import { ChatMessage, HealthMetric, GraphData } from '../types';

// Simulate API calls with a delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ingestData = async (text: string, file: File | null): Promise<{ message: string }> => {
  await sleep(1500);
  if (Math.random() > 0.9) {
    throw new Error('Ingestion pipeline failed. Please retry.');
  }
  const dataType = file ? `file (${file.name})` : 'text data';
  return { message: `Successfully ingested ${dataType}.` };
};

const mockGraphData: GraphData = {
  nodes: [
    { id: '1', label: 'FastAPI', type: 'entity', fx: 400, fy: 300 },
    { id: '2', label: 'Python', type: 'concept', fx: 450, fy: 200 },
    { id: '3', label: 'API Gateway', type: 'concept', fx: 350, fy: 200 },
    { id: '4', label: 'Doc A', type: 'document', fx: 500, fy: 350 },
    { id: '5', label: 'Microservices', type: 'concept', fx: 300, fy: 350 },
  ],
  links: [
    { source: '1', target: '2', label: 'written_in' },
    { source: '1', target: '3', label: 'is_a' },
    { source: '4', target: '1', label: 'mentions' },
    { source: '1', target: '5', label: 'enables' },
  ],
};

export const queryAgent = async (query: string): Promise<ChatMessage> => {
  await sleep(2000);

  if (query.toLowerCase().includes('error')) {
    throw new Error('Failed to query the agent.');
  }

  const response: ChatMessage = {
    id: 'agent-' + Date.now(),
    sender: 'agent',
    text: `Based on your query about "${query}", I've analyzed the knowledge graph. FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It's often used for creating API gateways in microservice architectures.`,
    graphData: mockGraphData,
    sources: [
        { title: 'Doc A: FastAPI Best Practices', snippet: '...when building a microservice, FastAPI provides robust performance...' },
        { title: 'VectorDB Chunk 281', snippet: '...Python type hints are leveraged by FastAPI for data validation...' },
    ]
  };
  return response;
};

const services = ['API Gateway', 'Kafka', 'Spark Enrich', 'Neo4j Graph'];

export const getSystemHealth = (): HealthMetric[] => {
    return services.map(name => {
        const rand = Math.random();
        let status: 'ok' | 'warning' | 'error' = 'ok';
        if (rand > 0.9) status = 'error';
        else if (rand > 0.7) status = 'warning';
        return {
            name,
            status,
            latency: Math.floor(Math.random() * (status === 'error' ? 300 : 100)) + 20
        };
    });
};

let time = 0;
const pipelineMetricsData: any[] = [];
export const getPipelineMetrics = (): any[] => {
    time++;
    const newDataPoint = {
        time: `T+${time}`,
        ingest: Math.floor(Math.random() * 50) + 100,
        enrich: Math.floor(Math.random() * 80) + 200,
        query: Math.floor(Math.random() * 60) + 150,
        throughput: Math.floor(Math.random() * 200) + 500,
    };

    if(pipelineMetricsData.length >= 10) {
        pipelineMetricsData.shift();
    }
    pipelineMetricsData.push(newDataPoint);
    
    return [...pipelineMetricsData];
}
