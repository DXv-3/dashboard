import React from 'react';

const TemporalSlider: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl bg-gray-700 bg-opacity-75 p-3 rounded-lg z-10">
        <label htmlFor="time-slider" className="block text-sm font-medium text-gray-300 text-center mb-2">
            Time Range: Jan 2023 - Dec 2023
        </label>
        <input 
            id="time-slider"
            type="range"
            min="1"
            max="12"
            defaultValue="12"
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Jan</span>
            <span>Mar</span>
            <span>Jun</span>
            <span>Sep</span>
            <span>Dec</span>
        </div>
    </div>
  );
};

export default TemporalSlider;
