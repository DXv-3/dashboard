/**
 * Measures the render time of a component and logs it to the console in development.
 * Uses the browser's Performance API.
 * @param componentName The name of the component to measure.
 * @returns A function to be called at the end of the measured block.
 */
export const measureRender = (componentName: string): (() => void) => {
  if (process.env.NODE_ENV === 'development') {
    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    
    performance.mark(startMark);

    return () => {
      performance.mark(endMark);
      const measure = performance.measure(
        `[Perf] ${componentName} Render`,
        startMark,
        endMark
      );
      console.log(`[Perf] ${componentName} rendered in: ${measure.duration.toFixed(2)}ms`);
      // Clean up marks to avoid memory leaks
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(`[Perf] ${componentName} Render`);
    };
  }
  // Return a no-op function in production
  return () => {};
};
