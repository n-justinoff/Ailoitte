import React, { useRef } from 'react';

interface LogoProps {
  className?: string;
  src?: string;
  onUpload?: (file: File) => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  src = "https://www.ailoitte.com/wp-content/uploads/2022/09/Ailoitte-Logo-1.svg",
  onUpload
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (onUpload && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUpload) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`flex flex-col items-start justify-center group relative ${className} ${onUpload ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      title={onUpload ? "Click to change logo" : "Ailoitte"}
    >
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div className="relative">
        <img 
          src={src}
          alt="Company Logo" 
          className="h-8 w-auto object-contain mb-0.5"
        />
        {onUpload && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
            <span className="text-[8px] bg-black/75 text-white px-1 rounded">Edit</span>
          </div>
        )}
      </div>

      <span className="text-[10px] font-medium text-[#0f172a] tracking-wide ml-0.5 leading-none">
        Solving What Matters with AI
      </span>
    </div>
  );
};