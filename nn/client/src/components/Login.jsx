import { animated, useSpring } from "@react-spring/web";
import axios from "axios";
import $ from "jquery";
import "jquery.ripples";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import "./styles/login.css";

// Keyframes definitions (unchanged)
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(83, 174, 198, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(83, 174, 198, 0); }
  100% { box-shadow: 0 0 0 0 rgba(83, 174, 198, 0); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px #53AEC6, 0 0 10px #53AEC6, 0 0 15px #53AEC6; }
  50% { text-shadow: 0 0 10px #53AEC6, 0 0 20px #53AEC6, 0 0 30px #53AEC6; }
  100% { text-shadow: 0 0 5px #53AEC6, 0 0 10px #53AEC6, 0 0 15px #53AEC6; }
`;

// Styled components with responsive adjustments
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1A6A7D 40%, #A3D5E0 60%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

const RippleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: url("https://www.transparenttextures.com/patterns/water.jpg") repeat;
  background-size: 150px 150px; // Reduced for mobile
  opacity: 0.3;

  @media (max-width: 768px) {
    background-size: 100px 100px;
  }
`;

const FormWrapper = styled(animated.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 50px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(83, 174, 198, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${pulse} 2.5s infinite;

  @media (max-width: 768px) {
    padding: 30px;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 10px;
  }
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.8rem;
  color: #fff;
  margin-bottom: 35px;
  text-shadow: 0 0 12px #53AEC6;
  animation: ${glow} 2.5s infinite;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
  text-align: left;
  width: 100%;
  position: relative;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  color: #fff;
  display: block;
  margin-bottom: 10px;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid rgba(83, 174, 198, 0.6);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 1.1rem;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 1rem;
    border-radius: 8px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(45deg, #468FA5, #53AEC6);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    background: linear-gradient(45deg, #53AEC6, #468FA5);
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 1.1rem;
    border-radius: 8px;
  }
`;

const Footbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

const Link = styled.a`
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 0.95rem;
  text-decoration: none;
  margin: 0 5px;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-family: "Roboto", sans-serif;
  font-size: 0.95rem;
  margin: 12px 0;
  width: 100%;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin: 10px 0;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const rippleRef = useRef(null);

  const [springProps, setSpring] = useSpring(() => ({
    transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    const rotateX = (y - centerY) / centerY * 20;
    const rotateY = (centerX - x) / centerX * 20;

    setSpring({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
    });
  };

  const handleMouseLeave = () => {
    setSpring({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  };

  useEffect(() => {
    if (rippleRef.current) {
      $(rippleRef.current).ripples({
        resolution: 512, // Reduced for better mobile performance
        dropRadius: 25,
        perturbance: 0.08,
        interactive: true,
        color: "rgba(199, 230, 239, 0.5)",
      });

      const addRandomRipple = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = Math.random() * width;
        const y = Math.random() * height;
        $(rippleRef.current).ripples("drop", x, y, 15, 0.03);
      };

      const interval = setInterval(addRandomRipple, Math.random() * 2000 + 2000);

      return () => {
        clearInterval(interval);
        if (rippleRef.current) {
          $(rippleRef.current).ripples("destroy");
        }
      };
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.109:4000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container>
      <RippleBackground ref={rippleRef} />
      <FormWrapper
        style={springProps}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Title>Welcome to NurtureNest</Title>
        <Form onSubmit={handleLogin} style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
          <InputGroup>
            <Title style={{ textAlign: "center", fontSize: "2rem" }}>LOGIN</Title>
            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <Button type="submit">Login</Button>

          <Footbox>
            <Link href="/forgot-password">Forgot password?</Link>
            <Link href="/signup">Don't have an account? Signup</Link>
          </Footbox>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Login;