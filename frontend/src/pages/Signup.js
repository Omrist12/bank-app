import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    balance: "",
    useRandomBalance: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setFormData({
          email: "",
          password: "",
          phone: "",
          balance: "",
          useRandomBalance: false,
        });
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "2rem" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />

        <label>Balance (optional):</label>
        <input
          type="number"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          disabled={formData.useRandomBalance}
        />
        <br />

        <label>
          <input
            type="checkbox"
            name="useRandomBalance"
            checked={formData.useRandomBalance}
            onChange={handleChange}
          />
          Use random balance
        </label>
        <br />
        <br />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
