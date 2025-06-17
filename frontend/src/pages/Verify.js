import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Verify() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  // Populate email from location.state if available
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          "Phone number verified successfully. Redirecting to login..."
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Verification failed");
      }
    } catch (err) {
      console.error("Error verifying:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "2rem" }}>
      <h2>Verify Phone Number</h2>
      <form onSubmit={handleVerify}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label>Verification Code:</label>
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Verify</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Verify;
