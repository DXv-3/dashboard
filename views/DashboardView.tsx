import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';
import { useDashboardStore } from '../stores/dashboardStore';
import LazyChart from '../components/LazyChart';

const COLORS = { ok: '#4caf50', warning: '#ffc107', error: '#f44336' };
const PIE_COLORS = ['#4caf50', '#ffc107', '#f44336'];

const DashboardView: React.FC = () => {
  const { healthData, pipelineData, fetchMetrics } = useDashboardStore();

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Refresh data every 5 seconds
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  const pieData = [
    { name: 'OK', value: healthData.filter(s => s.status === 'ok').length },
    { name: 'Warning', value: healthData.filter(s => s.status === 'warning').length },
    { name: 'Error', value: healthData.filter(s => s.status === 'error').length },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Service Health Status */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthData.map((service) => (
          <Card key={service.name} title={service.name}>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold`} style={{ color: COLORS[service.status] }}>
                {service.status.toUpperCase()}
              </span>
              <div className="text-right">
                <p className="text-2xl font-semibold text-white">{service.latency}ms</p>
                <p className="text-xs text-gray-400">Latency</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Pipeline Latency Chart */}
      <Card title="Pipeline Latency (ms)" className="lg:col-span-2">
        <LazyChart>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
              <XAxis dataKey="time" stroke="#9a9a9a" />
              <YAxis stroke="#9a9a9a" />
              <Tooltip contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #4a4a4a' }} isAnimationActive={false} />
              <Legend />
              <Line type="monotone" dataKey="ingest" stroke="#00aaff" strokeWidth={2} dot={false} isAnimationActive={false} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="enrich" stroke="#ff4081" strokeWidth={2} dot={false} isAnimationActive={false} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="query" stroke="#4caf50" strokeWidth={2} dot={false} isAnimationActive={false} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </LazyChart>
      </Card>
      
      {/* Service Health Overview Pie Chart */}
      <Card title="Service Health Overview">
        <LazyChart>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                isAnimationActive={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
               <Tooltip contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #4a4a4a' }} isAnimationActive={false} />
            </PieChart>
          </ResponsiveContainer>
        </LazyChart>
      </Card>
      
       {/* Data Throughput Chart */}
      <Card title="Data Throughput (events/min)" className="lg:col-span-3">
        <LazyChart>
          <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                  <XAxis dataKey="time" stroke="#9a9a9a" />
                  <YAxis stroke="#9a9a9a" />
                  <Tooltip contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #4a4a4a' }} cursor={{fill: '#2d2d2d'}} isAnimationActive={false} />
                  <Legend />
                  <Bar dataKey="throughput" fill="#00aaff" isAnimationActive={false} />
              </BarChart>
          </ResponsiveContainer>
        </LazyChart>
      </Card>

    </div>
  );
};

export default DashboardView;