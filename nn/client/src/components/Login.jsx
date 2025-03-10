import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add useNavigate for redirection
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #007290 50%, #FBB03B 50%);
  color: white;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // For redirection after login

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the API request to login
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          navigate('/home');  // Redirect to home page on login success
        } else {
          setError(data.error);  // Handle login failure
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>Welcome to NurtureNest</h1>
        
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="footbox">
          <button type="submit" style={{ marginBottom: '13px' }}>Login</button>
          <a href="/forgot-password" style={{ paddingLeft: '13px' }}>Forgot password?</a>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p><a href="/signup">Don't have an account? Signup</a></p>
      </form>
    </Container>
  );
}

export default Login;
