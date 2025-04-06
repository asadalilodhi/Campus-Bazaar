import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/Forgotpassword';
import Homepage from './components/Homepage';
import ResetPassword from './components/ResetPassword'; // ✅ New import

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log('Logged in!');
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/homepage" /> : <Login onLogin={handleLogin} />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} /> {/* ✅ New route */}
      <Route
        path="/homepage"
        element={
          isLoggedIn ? <Homepage /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
