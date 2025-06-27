// frontend/src/pages/Dashboard.js

import React from "react";
import TransactionForm from "../components/TransactionForm";

function Dashboard() {
  const token = localStorage.getItem("token"); // assumes token is stored here

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <TransactionForm token={token} />
    </div>
  );
}

export default Dashboard;
