import React, { useState } from 'react';
import { QueryStrategy } from '../../types';

const strategies: QueryStrategy[] = ['Simple', 'Multi-hop', 'Agentic'];

const StrategySelector: React.FC = () => {
    const [selected, setSelected] = useState<QueryStrategy>('Agentic');

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Query Strategy</label>
            <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
                {strategies.map(strategy => (
                    <button 
                        key={strategy}
                        onClick={() => setSelected(strategy)}
                        className={`w-full text-center px-4 py-2 text-sm font-semibold rounded-md transition ${
                            selected === strategy ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        {strategy}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StrategySelector;
