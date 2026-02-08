import React, { useState } from 'react';

interface AuthFormProps {
  onAuthSuccess: (token: string, user: any, character: any) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Call success callback
      onAuthSuccess(data.token, data.user, data.character);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-form-container">
      <div className="pad">
        <div className="pad__body">
          <h3 className="text-heading3">{isLogin ? 'Login' : 'Register'}</h3>
          
          {error && (
            <div className="message__body" style={{ borderColor: '#fed33f', color: '#fed33f', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="username">Username</label>
                <div className="form-control">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" htmlFor="email">Email</label>
              <div className="form-control">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
            
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <div className="form-control">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            
            <button 
              className="button button--primary" 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>
          
          <div className="text-paragraph1" style={{ textAlign: 'center' }}>
            <button 
              className="button" 
              onClick={() => setIsLogin(!isLogin)}
              style={{ border: 'none', background: 'transparent', color: '#2be4ea', textDecoration: 'underline' }}
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};