const express = require("express");
const router = express.Router();

// In memory user storage + verification code setup
const users = [];
const verificationCodes = new Map();

// POST /signup route to handle user registration
router.post("/", (req, res) => {
  const { email, password, phone, balance, useRandomBalance } = req.body;

  // Basic validation
  if (!email || !password || !phone) {
    return res
      .status(400)
      .json({ message: "Email, password, and phone are required" });
  }

  // Email checks
  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Email format validation (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password checks
  // Check password length (at least 8 characters)
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  // Check password complexity (at least one uppercase, one lowercase, one digit)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
    });
  }

  // Phone number checks
  // Check phone number format (simple regex)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  // Check phone number length
  if (phone.length < 9 || phone.length > 15) {
    return res
      .status(400)
      .json({ message: "Phone number must be between 9 and 15 digits" });
  }

  //Balance checks
  let initialBalance;

  // If user requests random balance or doesn’t provide one
  if (useRandomBalance || balance === undefined) {
    initialBalance = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // random between 1000 and 9999
  } else {
    // Validate manual balance
    const parsedBalance = parseFloat(balance);
    if (isNaN(parsedBalance) || parsedBalance < 0) {
      return res
        .status(400)
        .json({ message: "Balance must be a valid non-negative number" });
    }
    initialBalance = parsedBalance;
  }

  // End of checks
  // Create new user
  const newUser = { email, password, phone, balance: initialBalance };
  users.push(newUser);

  // Send verification code
  // 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000);
  // Store in memory (by email or phone)
  verificationCodes.set(email, code);
  // Log instead of sending SMS (mock Twilio)
  console.log(`Verification code for ${email}: ${code}`);

  // Respond with success message
  res.status(200).json({ message: "User registered successfully" });
});

// Export the router
module.exports = { router, verificationCodes, users };
