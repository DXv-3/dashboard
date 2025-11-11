
import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: The error "File 'file:///App.tsx' is not a module." was caused by App.tsx being empty. With the file content provided, this import now works.
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);