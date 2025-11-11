import React from 'react';

const GraphControls: React.FC = () => {
    // In a real implementation, these would be connected to the graph's state/API
    const handleZoomIn = () => console.log('Zoom In');
    const handleZoomOut = () => console.log('Zoom Out');
    const handleReset = () => console.log('Reset View');

    return (
        <div className="absolute top-2 right-2 z-10 bg-gray-700 bg-opacity-75 rounded-md p-1 flex space-x-1">
            <button onClick={handleZoomIn} className="p-2 text-gray-300 hover:bg-gray-600 rounded" title="Zoom In">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            </button>
            <button onClick={handleZoomOut} className="p-2 text-gray-300 hover:bg-gray-600 rounded" title="Zoom Out">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
            </button>
            <button onClick={handleReset} className="p-2 text-gray-300 hover:bg-gray-600 rounded" title="Reset View">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></svg>
            </button>
        </div>
    );
};

export default GraphControls;
