import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Simpan token ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect ke dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Dekorasi Sakura */}
      <div className="sakura sakura-1">🌸</div>
      <div className="sakura sakura-2">🌸</div>
      <div className="sakura sakura-3">🌸</div>
      <div className="sakura sakura-4">🌸</div>

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1 className="app-title">
            Saku<span className="highlight">Kurata</span>
          </h1>
          <p className="app-subtitle">Kelola keuangan dengan mudah</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Email Input */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="masukkan email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="masukkan password"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Loading...
              </>
            ) : (
              <>
                <span className="button-icon">🔐</span>
                Masuk
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="register-link">
          <p>
            Belum punya akun?{' '}
            <a href="#" className="link">Daftar sekarang</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="footer-text">
        &copy; 2025 SakuKurata. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
