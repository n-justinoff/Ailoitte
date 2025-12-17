import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-white text-xl font-bold mb-2">AIloitte</h2>
          <p className="text-sm">Solving What Matters with AI</p>
        </div>
        
        <div className="text-xs text-center md:text-right">
          <p>&copy; 2026 AIloitte. All rights reserved.</p>
          <p className="mt-1 opacity-60">
            *Dates are subject to change based on moon sightings or official notifications.
          </p>
        </div>
      </div>
    </footer>
  );
};