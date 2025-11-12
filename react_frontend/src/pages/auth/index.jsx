import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import VerifyEmail from './VerifyEmail';
import Callback from './Callback';

/**
 * PUBLIC_INTERFACE
 * Auth routes container under /auth/*
 */
export default function AuthRoutes() {
  return (
    <div style={{ padding: 24 }}>
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Authentication</h2>
        <nav style={{ marginTop: 8 }}>
          <Link to="/auth/sign-in" style={link}>Sign in</Link>
          <Link to="/auth/sign-up" style={link}>Sign up</Link>
          <Link to="/auth/forgot-password" style={link}>Forgot password</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" replace />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="callback" element={<Callback />} />
      </Routes>
    </div>
  );
}

const link = {
  marginRight: 12,
  textDecoration: 'none',
  color: '#3b82f6',
  fontWeight: 600,
};
