import { create } from 'zustand';
// FIX: This import now works because types.ts has been populated with content and exports.
import { View } from '../types';

interface ViewState {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  currentView: View.Dashboard,
  setCurrentView: (view) => set({ currentView: view }),
}));
