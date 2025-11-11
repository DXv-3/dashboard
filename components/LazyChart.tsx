import React from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './Spinner';

interface LazyChartProps {
  children: React.ReactNode;
}

const LazyChart: React.FC<LazyChartProps> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when the component comes into view
    threshold: 0.1, // Trigger when 10% of the component is visible
    rootMargin: '100px', // Start loading when the component is 100px away from the viewport
  });

  return (
    <div ref={ref} style={{ minHeight: '300px' }}>
      {inView ? children : <div className="flex items-center justify-center h-full"><Spinner /></div>}
    </div>
  );
};

export default LazyChart;
