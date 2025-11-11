import React from 'react';
import { ChatMessage } from '../types';
import Spinner from './Spinner';

interface VirtualChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

// Replaced react-window virtualization with a simple scrollable div for stability.
// The parent container in QueryView.tsx provides the scrolling behavior.
const VirtualChatMessageList: React.FC<VirtualChatMessageListProps> = ({ messages, isLoading }) => {
  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-sm lg:max-w-md ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.sender === 'agent' && msg.sources && (
                <div className="mt-3 border-t border-gray-600 pt-2">
                    <h4 className="font-bold text-sm mb-1">Sources:</h4>
                    <ul className="space-y-1">
                    {msg.sources.map((source, idx) => (
                        <li key={idx} className="text-xs p-2 bg-gray-600 rounded">
                        <p className="font-semibold text-primary">{source.title}</p>
                        <p className="text-gray-400 italic">"{source.snippet}"</p>
                        </li>
                    ))}
                    </ul>
                </div>
                )}
            </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg p-4 inline-block">
                <Spinner />
            </div>
        </div>
      )}
    </div>
  );
};

export default VirtualChatMessageList;
