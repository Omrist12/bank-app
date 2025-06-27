// frontend/src/components/TransactionForm.js

import React, { useState } from "react";

function TransactionForm({ token }) {
  const [toEmail, setToEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ toEmail, amount: parseFloat(amount) }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Transaction successful");
        setToEmail("");
        setAmount("");
      } else {
        setError(data.message || "Transaction failed");
      }
    } catch (err) {
      console.error("Transaction error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Make a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Recipient's Email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TransactionForm;
