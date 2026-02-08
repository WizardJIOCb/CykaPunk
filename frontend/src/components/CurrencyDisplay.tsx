import React from 'react';

interface CurrencyDisplayProps {
  currencies: {
    soft: number;
    hard: number;
    upgrade: number;
  };
  className?: string;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ 
  currencies, 
  className = '' 
}) => {
  return (
    <div className={`flex space-x-6 ${className}`}>
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-xs font-bold text-white">$</span>
        </div>
        <span className="text-green-400 terminal-text">{currencies.soft.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
          <span className="text-xs font-bold text-white">●</span>
        </div>
        <span className="text-purple-400 terminal-text">{currencies.hard.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
          <span className="text-xs font-bold text-black">↑</span>
        </div>
        <span className="text-yellow-400 terminal-text">{currencies.upgrade.toLocaleString()}</span>
      </div>
    </div>
  );
};