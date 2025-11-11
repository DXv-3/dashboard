
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, GraphData } from '../types';
import { queryAgent } from '../services/mockApiService';
import Spinner from '../components/Spinner';
import GraphVisualization from './GraphVisualization';
import SynapseIcon from '../components/icons/SynapseIcon';

const QueryView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentGraphData, setCurrentGraphData] = useState<GraphData>({ nodes: [], links: [] });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const agentResponse = await queryAgent(input);
      setMessages((prev) => [...prev, agentResponse]);
      if (agentResponse.graphData) {
        setCurrentGraphData(agentResponse.graphData);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'agent',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Left side: Chat and Agent Actions */}
      <div className="flex flex-col h-full md:w-1/2 lg:w-2/5 animate-fade-in">
        <div className="flex-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">Agent Interaction</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <SynapseIcon className="w-16 h-16 mb-4"/>
                <p className="text-lg">Welcome to the Cognitive Core</p>
                <p>Ask a question to begin exploring the knowledge graph.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-sm lg:max-w-md ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200'}`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.sender === 'agent' && msg.sources && (
                    <div className="mt-3 border-t border-gray-600 pt-2">
                      <h4 className="font-bold text-sm mb-1">Sources:</h4>
                      <ul className="space-y-1">
                        {msg.sources.map((source, index) => (
                           <li key={index} className="text-xs p-2 bg-gray-600 rounded">
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
                <div className="bg-gray-700 rounded-lg p-4">
                  <Spinner />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center bg-gray-700 rounded-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask the agent a question..."
                className="w-full bg-transparent p-3 text-gray-200 focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || input.trim() === ''}
                className="p-3 text-primary disabled:text-gray-500 hover:text-primary-hover disabled:cursor-not-allowed transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Knowledge Graph */}
      <div className="flex-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[400px] md:min-h-0 animate-fade-in">
         <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">Temporal Knowledge Graph</h3>
          </div>
        <GraphVisualization data={currentGraphData} />
      </div>
    </div>
  );
};

export default QueryView;
