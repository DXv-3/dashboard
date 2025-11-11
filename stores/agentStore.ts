import { create } from 'zustand';
import { AgentStep, ChatMessage } from '../types';
import { runQueryStream } from '../services/mockApiService';

interface AgentState {
  messages: ChatMessage[];
  steps: AgentStep[];
  isThinking: boolean;
  runQuery: (query: string) => void;
  clearChat: () => void;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  messages: [],
  steps: [],
  isThinking: false,
  clearChat: () => set({ messages: [], steps: [] }),
  runQuery: async (query) => {
    set({ isThinking: true, steps: [] });
    
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: query,
    };
    set(state => ({ messages: [...state.messages, userMessage] }));

    try {
      const stream = runQueryStream(query);
      for await (const chunk of stream) {
        if ('sender' in chunk) { // It's a ChatMessage
          set(state => ({ messages: [...state.messages, chunk] }));
        } else { // It's an AgentStep
          set(state => ({ steps: [...state.steps, chunk] }));
        }
      }
    } catch (error) {
        console.error("Error running query:", error);
        const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            sender: 'agent',
            text: "Sorry, I encountered an error while processing your request."
        };
        set(state => ({ messages: [...state.messages, errorMessage] }));
    } finally {
      set({ isThinking: false });
    }
  },
}));
