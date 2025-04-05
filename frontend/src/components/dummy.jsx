import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/logo.png';

function Signup({ onSignup }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateSignup = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('passwordconf').value;

    if (username === 'test2' && password === '12345') {
      console.log('Account created! Please proceed to login now');
      setErrorMessage('');
      onSignup();
      navigate('/login');
    } else {
      setErrorMessage('An account with that already exists. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="logo-container">
        <img src={logo} alt="Campus Bazaar Logo" className="signup-logo" />
      </div>

      <div className="signup-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Signup</h2>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>

          <div className="input-group">
            <label htmlFor="confirm password">Password</label>
            <input type="passwordconfirm" id="passwordconfirm" required />
          </div>

          {/* <div className="button-group">
            <button type="button" onClick={validateLogin}>Login</button>
            <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
          </div> */}

          {errorMessage && (
            <div className="error-message visible">
              {errorMessage}
            </div>
          )}

          {/* <div className="forgot-password-container">
            <span className="forgot-password" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </span>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Signup;
