import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signUpUser } from '../redux/users/authSlice';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleSignUp = () => {
    dispatch(signUpUser({ email, password }));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="login-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <button onClick={handleSignUp} className="signup-button">
        Sign Up
      </button>
      {authStatus === 'loading' && <p>Loading...</p>}
      {authStatus === 'failed' && <p>Error: {authError}</p>}
    </div>
  );
};

export default Login;