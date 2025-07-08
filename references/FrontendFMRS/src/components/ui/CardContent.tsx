import React from 'react';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => {
  return (
    <div className={`p-4 flex flex-col gap-2 ${className}`}>
      {children}
    </div>
  );
};

export default CardContent; 