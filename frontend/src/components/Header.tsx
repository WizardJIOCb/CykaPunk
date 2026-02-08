import React from 'react';
import { Link } from 'wouter';

export const Header: React.FC = () => {
  return (
    <header className="header-cyber p-4">
      <nav className="container mx-auto">
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/character" 
              className="terminal-text hover:text-cyan-300 transition-colors duration-200 font-medium uppercase tracking-wider"
            >
              Персонаж
            </Link>
          </li>
          <li>
            <Link 
              to="/location" 
              className="terminal-text hover:text-cyan-300 transition-colors duration-200 font-medium uppercase tracking-wider"
            >
              Локация
            </Link>
          </li>
          <li>
            <Link 
              to="/shop" 
              className="terminal-text hover:text-cyan-300 transition-colors duration-200 font-medium uppercase tracking-wider"
            >
              Магазин
            </Link>
          </li>
          <li>
            <Link 
              to="/battles" 
              className="terminal-text hover:text-cyan-300 transition-colors duration-200 font-medium uppercase tracking-wider"
            >
              Бои
            </Link>
          </li>
          <li>
            <Link 
              to="/logout" 
              className="terminal-text hover:text-cyan-300 transition-colors duration-200 font-medium uppercase tracking-wider"
            >
              Выход
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};