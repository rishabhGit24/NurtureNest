import axios from "axios";
import React, { useCallback, useState } from "react";
import Particles from "react-particles";
import { useNavigate } from "react-router-dom";
import { Tilt } from "react-tilt";
import styled, { keyframes } from "styled-components";
import { loadSlim } from "tsparticles-slim";
import "./styles/login.css";

// Keyframes for animations
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(83, 174, 198, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(83, 174, 198, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(83, 174, 198, 0);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 5px #53AEC6, 0 0 10px #53AEC6, 0 0 15px #53AEC6;
  }
  50% {
    text-shadow: 0 0 10px #53AEC6, 0 0 20px #53AEC6, 0 0 30px #53AEC6;
  }
  100% {
    text-shadow: 0 0 5px #53AEC6, 0 0 10px #53AEC6, 0 0 15px #53AEC6;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1A6A7D 40%, #A3D5E0 60%);
  position: relative;
  overflow: hidden;

  /* Ensure the container takes full height on smaller screens */
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ParticlesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  /* Adjust particle density on smaller screens */
  @media (max-width: 768px) {
    & > canvas {
      transform: scale(0.8); /* Slightly scale down particles for better performance */
    }
  }
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 40px;
  width: 450px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(83, 174, 198, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${pulse} 2s infinite;

  /* Responsive styles */
  @media (max-width: 768px) {
    width: 90%;
    max-width: 350px;
    padding: 20px;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px;
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-family: "Orbitron", sans-serif;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 0 0 10px #53AEC6;
  animation: ${glow} 2s infinite;
  letter-spacing: 2px;

  /* Responsive font sizes */
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  color: #fff;
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(83, 174, 198, 0.5);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(83, 174, 198, 0.5);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(83, 174, 198, 0.3);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: #53AEC6;
    box-shadow: 0 0 15px rgba(83, 174, 198, 0.7);
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.8rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #53AEC6;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 1.1rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(83, 174, 198, 0.5);
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(45deg, #468FA5, #53AEC6);
    box-shadow: 0 0 25px rgba(83, 174, 198, 0.8);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

const Link = styled.a`
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  text-decoration: none;
  margin: 0 5px;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px rgba(83, 174, 198, 0.5);

  &:hover {
    color: #53AEC6;
    text-shadow: 0 0 10px #53AEC6;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin: 0 3px;
  }
`;

const Footbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 15px;
    flex-direction: column;
    gap: 10px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  margin: 10px 0;
  width: 100%;
  text-align: center;
  text-shadow: 0 0 5px rgba(255, 107, 107, 0.5);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin: 8px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#53AEC6",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
      links: {
        enable: true,
        distance: 150,
        color: "#53AEC6",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          quantity: 4,
        },
      },
    },
    retina_detect: true,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.109:4000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token in local storage
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container>
      <ParticlesWrapper>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      </ParticlesWrapper>

      <Tilt options={{ max: 25, scale: 1.05, speed: 400 }}>
        <FormWrapper>
          <Title>Welcome to NurtureNest</Title>
          <Form onSubmit={handleLogin} style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
            <InputGroup>
              <Title style={{ textAlign: "center" }}>LOGIN</Title>
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
      </Tilt>
    </Container>
  );
};

export default Login;