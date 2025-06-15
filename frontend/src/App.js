import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return <h1>Home Page</h1>;
}

function Signup() {
  return <h1>Signup Page</h1>;
}

function Login() {
  return <h1>Login Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard Page</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
