import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { STRINGS } from '../../utils/contants';
import { loginUser } from '../../api/api';
import './Login.scss';

const Login = () => {
  const [formData, setFormData] = useState({ email: 'sachin@gmail.com', password: 'hesdfllo' });
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here (redirect to another component)
    console.log('Forgot password clicked');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password.length < 8) {
      setPasswordError(STRINGS.PASSWORD_LENGTH_ERROR_MESSAGE);
    } else {
      try {
        const loginResponse = await loginUser(
          formData.email,
          formData.password
        );
        localStorage.setItem('COWRITE', JSON.stringify(loginResponse.data))
        console.log('Login successful:', loginResponse);
        navigate('/home')
        // Handle successful login (e.g., store token, redirect)
      } catch (error) {
        console.error('Login error:', error);
        // Handle login failure (e.g., display error message)
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">{STRINGS.SIGN_IN_HEADING}</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          <label htmlFor="email">{STRINGS.EMAIL_LABEL}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">{STRINGS.PASSWORD_LABEL}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <a href="#" className="forgot-password" onClick={handleForgotPassword}>
          {STRINGS.FORGOT_PASSWORD_TEXT}
        </a>
        <button type="submit" className="login-button">
          {STRINGS.SIGN_IN_BUTTON_TEXT}
        </button>
      </form>
      <p className="signup-link">{STRINGS.SIGN_UP_LINK_TEXT}</p>
    </div>
  );
};

export default Login;
