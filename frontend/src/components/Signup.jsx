// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/signup.css';

// function Signup() {
//     return (
//       <div className="signup">
//         <h1>Sign Up– To be done</h1>
//       </div>
//     );
//   }

//     export default Signup;
// // this is where the sign up front html goes


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
    const confirmpassword = document.getElementById('passwordconfirm').value;

    //to be updated: if username does NOT equal to any in the database
    if (password !== confirmpassword) {
      setErrorMessage('Passwords do not match.');
    } else if (username === 'test2') {
      setErrorMessage('An account with that username already exists.');
    } else {
      console.log('Account created! Please proceed to login now');
      setErrorMessage('');
      //onSignup();
      navigate('/login');
    }
    

  
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={logo} alt="Campus Bazaar Logo" className="login-logo" />
      </div>

      <div className="login-container">
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
            <label htmlFor="passwordconfirm">Confirm Password</label>
            <input type="password" id="passwordconfirm" required />
          </div>

          <div className="button-group">
          <button type="button" onClick={() => navigate('/login')}>Back to Login</button>
            <button type="button" onClick={validateSignup}>Signup</button>
            {/* <button type="button" onClick={() => navigate('/signup')}>Sign Up</button> */}
          </div>

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
