import { create } from 'zustand';
// FIX: These imports now work because the corresponding files have been populated with content and exports.
import { HealthMetric } from '../types';
import { getSystemHealth, getPipelineMetrics } from '../services/mockApiService';

interface DashboardState {
  healthData: HealthMetric[];
  pipelineData: any[];
  fetchMetrics: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  healthData: [],
  pipelineData: [],
  fetchMetrics: () => {
    const newHealthData = getSystemHealth();
    const newPipelineData = getPipelineMetrics();
    set({ healthData: newHealthData, pipelineData: newPipelineData });
  },
}));
