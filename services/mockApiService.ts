import { HealthMetric, IngestionRecord, ChatMessage, GraphData, AgentStep, AgentStepType } from '../types';

// Mock database for ingestion records
let ingestionRecords: IngestionRecord[] = [];

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const ingestData = async (file: File): Promise<void> => {
  console.log(`Ingesting ${file.name}...`);
  await delay(1000 + Math.random() * 2000); // Simulate processing time
  if (Math.random() < 0.1) { // 10% chance of failure
    throw new Error(`Failed to ingest ${file.name}`);
  }
  console.log(`Successfully ingested ${file.name}`);
};

export const storeIngestionRecord = (record: IngestionRecord): void => {
  ingestionRecords.push(record);
};

export const getIngestionHistory = (): IngestionRecord[] => {
    return [...ingestionRecords].sort((a, b) => new Date(b.ingestedAt).getTime() - new Date(a.ingestedAt).getTime());
};

export const getSystemHealth = (): HealthMetric[] => {
  const services = ['API Gateway', 'Ingestion Pipeline', 'Vector DB', 'Agent Service'];
  return services.map(name => {
    const rand = Math.random();
    let status: 'ok' | 'warning' | 'error';
    if (rand < 0.8) status = 'ok';
    else if (rand < 0.95) status = 'warning';
    else status = 'error';
    
    return {
      name,
      status,
      latency: Math.floor(20 + Math.random() * (status === 'ok' ? 80 : 200)),
    };
  });
};

const generateTimePoints = (numPoints: number) => {
  const now = new Date();
  return Array.from({ length: numPoints }, (_, i) => {
    const d = new Date(now.getTime() - (numPoints - 1 - i) * 5000);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  });
};

let pipelineMetricsData: any[] = generateTimePoints(20).map(time => ({
    time,
    ingest: Math.floor(100 + Math.random() * 400),
    enrich: Math.floor(200 + Math.random() * 600),
    query: Math.floor(50 + Math.random() * 250),
    throughput: Math.floor(500 + Math.random() * 1500),
}));

export const getPipelineMetrics = (): any[] => {
    // remove first element and add a new one
    pipelineMetricsData.shift();
    const lastPoint = pipelineMetricsData[pipelineMetricsData.length - 1];
    const now = new Date();
    const newTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    pipelineMetricsData.push({
        time: newTime,
        ingest: Math.max(50, lastPoint.ingest + (Math.random() - 0.5) * 50),
        enrich: Math.max(100, lastPoint.enrich + (Math.random() - 0.5) * 80),
        query: Math.max(30, lastPoint.query + (Math.random() - 0.5) * 40),
        throughput: Math.max(200, lastPoint.throughput + (Math.random() - 0.5) * 200),
    });
  return [...pipelineMetricsData];
};

const mockAgentSteps: Omit<AgentStep, 'id'>[] = [
  { type: AgentStepType.Thought, content: "The user is asking for sales performance in Q4. I need to query the sales database and the marketing campaign records." },
  { type: AgentStepType.Action, content: "Executing tool `query_sales_db` with parameters: `{'quarter': 'Q4', 'year': 2023}`" },
  { type: AgentStepType.Observation, content: "Sales data shows a 15% increase in revenue. Key products were 'Project X' and 'Service Y'." },
  { type: AgentStepType.Thought, content: "Now I'll check the marketing data to see if there's a correlation." },
  { type: AgentStepType.Action, content: "Executing tool `query_marketing_analytics` with parameters: `{'campaign_type': 'social_media', 'period': 'Q4'}`" },
  { type: AgentStepType.Observation, content: "The 'Winter Wonderland' campaign on social media had a 200% ROI and directly correlates with 'Project X' sales spikes." },
  { type: AgentStepType.Thought, content: "I have enough information to form a comprehensive answer. I will summarize the findings and highlight the successful marketing campaign's impact." },
];

export async function* runQueryStream(query: string): AsyncGenerator<ChatMessage | AgentStep> {
  await delay(500);
  
  for (const step of mockAgentSteps) {
    yield { ...step, id: crypto.randomUUID() };
    await delay(700 + Math.random() * 500);
  }

  yield {
    id: crypto.randomUUID(),
    sender: 'agent',
    text: `In Q4 2023, sales performance saw a significant 15% increase in revenue, primarily driven by "Project X" and "Service Y". This success is strongly correlated with the "Winter Wonderland" social media campaign, which achieved a 200% ROI and directly influenced sales spikes for "Project X".`,
    sources: [
      { title: 'Q4 2023 Sales Report.pdf', snippet: '...total revenue reached $1.2M, a 15% increase over Q3...' },
      { title: 'Marketing Analytics Dashboard', snippet: '...Winter Wonderland campaign resulted in 5M impressions and a 200% ROI...' },
    ],
  };
}


export const getGraphData = (): GraphData => {
  return {
    nodes: [
        { id: 'Project X', label: 'Project X', type: 'Product' },
        { id: 'Service Y', label: 'Service Y', type: 'Service' },
        { id: 'Q4 Sales Report', label: 'Q4 Sales Report', type: 'Document' },
        { id: 'Winter Campaign', label: 'Winter Campaign', type: 'Campaign' },
        { id: 'Social Media', label: 'Social Media', type: 'Channel' },
    ],
    links: [
        { source: 'Q4 Sales Report', target: 'Project X' },
        { source: 'Q4 Sales Report', target: 'Service Y' },
        { source: 'Winter Campaign', target: 'Project X' },
        { source: 'Winter Campaign', target: 'Social Media' },
    ],
  };
};
