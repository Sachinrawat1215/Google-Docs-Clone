# COWRITE - Realtime Document Editor

## React Login UI with User Signup Backend (Mongoose, Express)

This repository contains a React UI component for a login form and a backend API for user signup functionality.

## Features

### Frontend (ReactJS):
- Clean and beautiful login UI with email, password input fields, and a "Sign In" button.
- Option for users to sign up (link redirects to a separate component, not implemented yet).

### Backend (NodeJS, Express):
- API endpoint for user signup (`POST /api/users/signup`).
- User registration with name, email, and password.
- Password hashing using bcrypt for secure storage.
- Mongoose schema for user data with validation (required fields, email uniqueness).
- (Optional - not implemented yet) OTP generation and email sending using nodemailer for user verification.
