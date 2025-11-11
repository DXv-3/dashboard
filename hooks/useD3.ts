import React from 'react';
import * as d3 from 'd3';

export const useD3 = <T extends d3.BaseType>(renderChartFn: (selection: d3.Selection<T, unknown, null, undefined>) => void, dependencies: React.DependencyList) => {
    const ref = React.useRef<T>(null);

    React.useEffect(() => {
        if (ref.current) {
            renderChartFn(d3.select(ref.current));
        }
        return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
    
    return ref;
}
