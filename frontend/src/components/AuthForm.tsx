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
      const baseUrl = 'http://localhost:3001';
      const url = isLogin ? `${baseUrl}/api/auth/login` : `${baseUrl}/api/auth/register`;
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
    <div className="auth-form-wrapper">
      <div className="pad auth-pad">
        <div className="pad__body">
          <h3 className="text-heading3 auth-title">
            {isLogin ? 'SYSTEM LOGIN' : 'CREATE ACCOUNT'}
          </h3>
          
          <div className="auth-subtitle">
            {isLogin 
              ? 'ACCESS YOUR CYBERNETIC PROFILE' 
              : 'INITIALIZE NEW NETRUNNER IDENTITY'}
          </div>

          {error && (
            <div className="message__body auth-error">
              <div className="auth-error-content">
                <span className="auth-error-icon">⚠</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group auth-form-group">
                <label className="form-label auth-label" htmlFor="username">USERNAME</label>
                <div className="form-control auth-input">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="ENTER_CALLSIGN"
                    required={!isLogin}
                    className="auth-input-field"
                  />
                </div>
              </div>
            )}
            
            <div className="form-group auth-form-group">
              <label className="form-label auth-label" htmlFor="email">EMAIL ADDRESS</label>
              <div className="form-control auth-input">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="USER@CYKAPUNK.NET"
                  required
                  className="auth-input-field"
                />
              </div>
            </div>
            
            <div className="form-group auth-form-group">
              <label className="form-label auth-label" htmlFor="password">ACCESS CODE</label>
              <div className="form-control auth-input">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                  className="auth-input-field"
                />
              </div>
            </div>
            
            <button 
              className={`button button--primary auth-submit ${loading ? 'auth-loading' : ''}`}
              type="submit" 
              disabled={loading}
            >
              <span className="button__content">
                {loading ? (
                  <>
                    <span className="auth-loading-spinner"></span>
                    PROCESSING
                  </>
                ) : (
                  isLogin ? 'ACCESS SYSTEM' : 'INITIALIZE PROFILE'
                )}
              </span>
            </button>
          </form>
          
          <div className="auth-toggle">
            <button 
              className="button auth-toggle-button" 
              onClick={() => setIsLogin(!isLogin)}
              type="button"
            >
              <span className="button__content">
                {isLogin ? 'CREATE NEW IDENTITY' : 'RETURN TO LOGIN'}
              </span>
            </button>
          </div>
          
          <div className="auth-info">
            <div className="auth-info-item">
              <span className="auth-info-label">STATUS:</span>
              <span className="auth-info-value">SECURE_CONNECTION_ESTABLISHED</span>
            </div>
            <div className="auth-info-item">
              <span className="auth-info-label">PROTOCOL:</span>
              <span className="auth-info-value">NETWIRE_AUTH_V2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};