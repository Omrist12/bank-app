import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
