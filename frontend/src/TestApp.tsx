import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// MINIMAL TEST APP - FORCE AUTH SCREEN
function TestApp() {
  console.log('TEST APP LOADED - AUTH FORCED');
  
  return (
    <div style={{ 
      background: '#1a1a1a', 
      color: '#ff6b6b', 
      padding: '20px', 
      fontFamily: 'monospace',
      minHeight: '100vh'
    }}>
      <h1>CYKAPUNK - AUTHENTICATION REQUIRED</h1>
      <div style={{ 
        background: '#2a2a2a', 
        padding: '20px', 
        border: '2px solid #ff6b6b',
        marginTop: '20px'
      }}>
        <h2>LOGIN SCREEN</h2>
        <p>This is a forced authentication screen for debugging.</p>
        <p>If you see this, React is working correctly.</p>
        <button 
          style={{
            background: '#4ecdc4',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Test button clicked!')}
        >
          TEST BUTTON
        </button>
      </div>
    </div>
  );
}

// Mount the test app
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<TestApp />);
  console.log('Test app mounted to root element');
} else {
  console.error('Root element not found!');
}