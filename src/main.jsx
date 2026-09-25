// src/main.jsx
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Initialize i18n before rendering (side-effect import)
import '@/i18n/index.js';

import App from './App';
import './index.css';

// Full-screen loading fallback while i18n / lazy chunks load
function LoadingFallback() {
  return (
    <div className="flex h-dvh items-center justify-center bg-[#0a0a12]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated NEXUS wordmark */}
        <span className="text-3xl font-black tracking-widest text-gradient animate-pulse-glow select-none">
          NEXUS
        </span>
        {/* Spinner ring */}
        <div className="w-8 h-8 rounded-full border-2 border-purple-800 border-t-purple-400 animate-spin" />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);
