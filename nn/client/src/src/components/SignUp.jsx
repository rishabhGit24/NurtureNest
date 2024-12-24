import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add useNavigate for redirection
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to right, #007290 50%, #FBB03B 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // For redirection after signup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNumber, password, confirmPassword, address } = formData;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !address) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setErrorMessage('');

    // Send the data to the server for registration
    fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          navigate('/');  // Redirect to the homepage after signup
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>Welcome to NurtureNest</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className="row">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        </div>

        <div className="row">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        </div>

        <div className="row">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
        </div>

        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" rows="4"></textarea>
        
        <button type="submit">Signup</button>
        <p>Already have an account? <a href="/">Login</a></p>
      </form>
    </Container>
  );
}

export default SignUp;
