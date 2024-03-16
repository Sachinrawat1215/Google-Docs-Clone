import React, { useState } from 'react';
import './Login.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here (redirect to another component)
    console.log('Forgot password clicked');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here (submit email and password)
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Sign In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <a href="#" className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </a>
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="#">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
