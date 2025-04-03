import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/logo.png';

function Login({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'test' && password === '1234') {
      console.log('Login successful');
      setErrorMessage('');
      onLogin();
      navigate('/homepage');
    } else {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={logo} alt="Campus Bazaar Logo" className="login-logo" />
      </div>

      <div className="login-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>

          <div className="button-group">
            <button type="button" onClick={validateLogin}>Login</button>
            <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>

          {errorMessage && (
            <div className="error-message visible">
              {errorMessage}
            </div>
          )}

          <div className="forgot-password-container">
            <span className="forgot-password" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
