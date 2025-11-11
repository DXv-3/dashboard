import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/Card';
import { useAgentStore } from '../stores/agentStore';
import AgentThoughtStream from '../components/agent/AgentThoughtStream';
import VirtualChatMessageList from '../components/VirtualChatMessageList';

const QueryView: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, steps, isThinking, runQuery } = useAgentStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isThinking) {
      runQuery(inputValue.trim());
      setInputValue('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
    }
  };

  useEffect(() => {
      if (inputRef.current) {
          inputRef.current.style.height = 'auto';
          const scrollHeight = inputRef.current.scrollHeight;
          inputRef.current.style.height = `${scrollHeight}px`;
      }
  }, [inputValue]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full max-h-[calc(100vh-4rem)]">
      <div className="lg:col-span-2 flex flex-col h-full">
        <Card title="Agent Interaction" className="flex-grow flex flex-col">
          <div className="flex-grow overflow-y-auto mb-4 pr-2">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Ask the agent a question to start the conversation.</p>
                </div>
            ) : (
                <VirtualChatMessageList messages={messages} isLoading={isThinking && steps.length > 0} />
            )}
          </div>
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your data..."
              disabled={isThinking}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-4 pr-28 text-white focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
              rows={1}
              style={{maxHeight: '200px'}}
            />
            <button
              type="submit"
              disabled={isThinking || !inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition"
            >
              Send
            </button>
          </form>
        </Card>
      </div>
      <div className="lg:col-span-1 h-full">
        <Card title="Cognitive Flow" className="h-full overflow-y-auto">
            <AgentThoughtStream steps={steps} isThinking={isThinking} />
        </Card>
      </div>
    </div>
  );
};

export default QueryView;
