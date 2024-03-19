import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { STRINGS } from '../../utils/contants';
import { registerUser } from '../../api/api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
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
    } else if (formData.password !== formData.confirmPassword) {
      setPasswordError(STRINGS.CONFIRM_PASSWORD_MISMATCH_ERROR); // New constant
    } else {
      try {
        const registerResponse = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (registerResponse.status) {
          navigate('/login');
        } else {
          console.log(`Failed to register user`);
        }
      } catch (error) {
        console.error('Login error:', error);
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
          {STRINGS.CREATE_ACCOUNT_TITLE}
          <span className="blue">.</span>
        </h1>
        <p className="login-text">
          {STRINGS.ALREADY_MEMBER_TEXT}{' '}
          <span className="blue">
            <Link to="/login"> {STRINGS.LOGIN_LINK_TEXT}</Link>
          </span>
        </p>
        <div className="input-container">
          <label htmlFor="name">{STRINGS.FULL_NAME_LABEL}</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={STRINGS.NAME_PLACEHOLDER}
            onChange={handleChange}
            required
          />
        </div>
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
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password">
            {STRINGS.CONFIRM_PASSWORD_LABEL}
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder={STRINGS.CONFIRM_PASSWORD_PLACEHOLDER}
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
            {STRINGS.CREATE_ACCOUNT_BUTTON_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
