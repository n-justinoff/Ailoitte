import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-1 font-sans ${className}`}>
      {/* Abstract Icon representing the A/i design */}
      <div className="relative w-8 h-8 mr-1">
        <div className="absolute inset-0 border-4 border-[#0f172a] rounded-full rounded-tr-none"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#2563eb]"></div>
      </div>
      
      <span className="text-3xl font-bold tracking-tight text-[#0f172a]">
        ailoitte
      </span>
      <span className="text-xs font-normal text-gray-500 self-start mt-1">TM</span>
    </div>
  );
};