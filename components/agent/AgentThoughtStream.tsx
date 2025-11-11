import React from 'react';
// FIX: This import now works because types.ts has been populated with content and exports.
import { AgentStep, AgentStepType } from '../../types';
import Spinner from '../Spinner';
import ThoughtIcon from '../icons/ThoughtIcon';
import ActionIcon from '../icons/ActionIcon';
import ObservationIcon from '../icons/ObservationIcon';

interface AgentThoughtStreamProps {
  steps: AgentStep[];
  isThinking: boolean;
}

const getStepIcon = (type: AgentStepType) => {
    switch(type) {
        case AgentStepType.Thought:
            return <ThoughtIcon className="h-5 w-5 text-blue-400" />;
        case AgentStepType.Action:
            return <ActionIcon className="h-5 w-5 text-green-400" />;
        case AgentStepType.Observation:
            return <ObservationIcon className="h-5 w-5 text-purple-400" />;
        default:
            return null;
    }
}

const getStepTitle = (type: AgentStepType) => {
    switch(type) {
        case AgentStepType.Thought:
            return "Thought";
        case AgentStepType.Action:
            return "Action";
        case AgentStepType.Observation:
            return "Observation";
        default:
            return "Step";
    }
}

const AgentThoughtStream: React.FC<AgentThoughtStreamProps> = ({ steps, isThinking }) => {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.id} className="flex items-start animate-fade-in-up">
            <div className="flex-shrink-0 mt-1 mr-3">
                {getStepIcon(step.type)}
            </div>
            <div>
                <h4 className="font-semibold text-gray-300">{getStepTitle(step.type)}</h4>
                <p className="text-sm text-gray-400">{step.content}</p>
            </div>
        </div>
      ))}
      {isThinking && (
         <div className="flex items-center text-gray-500">
            <Spinner />
            <span className="ml-2">Agent is thinking...</span>
        </div>
      )}
      {!isThinking && steps.length === 0 && (
        <p className="text-gray-500 text-center py-8">The agent's thought process will appear here when you run a query.</p>
      )}
    </div>
  );
};

export default AgentThoughtStream;