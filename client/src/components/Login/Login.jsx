import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { STRINGS } from '../../utils/contants';
import { loginUser } from '../../api/api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
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
    } else { // Removed confirm password check
      try {
        const loginResponse = await loginUser(formData.email, formData.password);
        localStorage.setItem(
          process.env.REACT_APP_LOCAL_STORAGE_USER_DATA,
          JSON.stringify(loginResponse.data)
        );
        console.log('Login successful:', loginResponse);
        navigate('/');
        // Handle successful login (e.g., store token, redirect)
      } catch (error) {
        console.error('Login error:', error);
        // Handle login failure (e.g., display error message)
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/images/co-write-logo.svg" alt="logo" />
      </div>
      <div className="login-content">
        <h1>
          {STRINGS.SIGN_IN_HEADING}
          <span className="blue">.</span>
        </h1>
        <p className="login-text">
          {STRINGS.NEW_USER}{' '}
          <span className="blue">
            <Link to="/register"> {STRINGS.CREATE_ACCOUNT_BUTTON_TEXT}</Link>
          </span>
        </p>
        <div className="input-container">
          <label htmlFor="email">{STRINGS.EMAIL_LABEL}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={STRINGS.EMAIL_PLACEHOLDER}
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
            placeholder={STRINGS.PASSWORD_PLACEHOLDER}
            onChange={handleChange}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="buttons">
          <button className="forgot-btn" onClick={handleForgotPassword}>
            {STRINGS.FORGOT_PASSWORD_TEXT}
          </button>
          <button type="submit" className="create-btn" onClick={handleSubmit}>
            {STRINGS.LOGIN_LINK_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
