import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="https://www.ailoitte.com/wp-content/uploads/2022/09/Ailoitte-Logo-1.svg" 
        alt="Ailoitte" 
        className="h-10 w-auto object-contain"
      />
    </div>
  );
};