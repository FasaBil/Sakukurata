import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sementara console.log dulu
      console.log('Register Data:', { name, email, password });

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Register failed');
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
          <p className="app-subtitle">Daftar akun baru</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleRegister} className="login-form">
          {/* Name Input */}
          <div className="form-group">
            <label className="form-label">Nama</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="masukkan nama"
                required
              />
            </div>
          </div>

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

          {/* Register Button */}
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
                <span className="button-icon">✨</span>
                Daftar
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="register-link">
          <p>
            Sudah punya akun?{' '}
            <a href="/" className="link">Masuk</a>
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

export default RegisterPage;
