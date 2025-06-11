const express = require("express");
const router = express.Router();

// Import the users array from signup.js
const { users } = require("./signup");

// POST /login route to handle user login
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // Check user existence and password match
  const user = users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // Successful login with JWT
  const jwt = require("jsonwebtoken");

  const token = jwt.sign(
    // payload
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(200).json({ message: "Login successful", token });
});

// Export the router
module.exports = router;
