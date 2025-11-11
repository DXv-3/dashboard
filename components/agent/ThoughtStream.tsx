import React from 'react';
import { AgentStep, AgentStepType } from '../../types';
import Spinner from '../Spinner';
import ThoughtIcon from '../icons/ThoughtIcon';
import ActionIcon from '../icons/ActionIcon';
import ObservationIcon from '../icons/ObservationIcon';

interface ThoughtStreamProps {
  steps: AgentStep[];
  isThinking: boolean;
}

const ThoughtStream: React.FC<ThoughtStreamProps> = ({ steps, isThinking }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg h-full">
      <h3 className="font-bold text-lg mb-4 text-white">Agent's Internal Monologue</h3>
      <div className="space-y-4">
        {steps.map((step) => (
          <details key={step.id} className="bg-gray-700 rounded-md p-3" open>
            <summary className="cursor-pointer flex items-center font-semibold text-gray-300">
                {step.type === AgentStepType.Thought && <ThoughtIcon className="h-5 w-5 mr-2 text-blue-400" />}
                {step.type === AgentStepType.Action && <ActionIcon className="h-5 w-5 mr-2 text-green-400" />}
                {step.type === AgentStepType.Observation && <ObservationIcon className="h-5 w-5 mr-2 text-purple-400" />}
                {step.type}
            </summary>
            <div className="mt-2 pl-7 text-sm text-gray-400 border-l-2 border-gray-600 ml-2.5">
                <p className="py-2">{step.content}</p>
            </div>
          </details>
        ))}
        {isThinking && (
           <div className="flex items-center text-gray-500 p-3">
              <Spinner />
              <span className="ml-2">Processing...</span>
          </div>
        )}
        {!isThinking && steps.length === 0 && (
          <p className="text-gray-500 text-center py-8">The agent's thought process will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default ThoughtStream;
