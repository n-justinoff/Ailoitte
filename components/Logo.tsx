import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-start justify-center ${className}`}>
      <img 
        src="https://www.ailoitte.com/wp-content/uploads/2022/09/Ailoitte-Logo-1.svg" 
        alt="Ailoitte" 
        className="h-8 w-auto object-contain mb-0.5"
      />
      <span className="text-[10px] font-medium text-[#0f172a] tracking-wide ml-0.5 leading-none">
        Solving What Matters with AI
      </span>
    </div>
  );
};