const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /signup route to handle user registration
router.post("/", async (req, res) => {
  try {
    const { email, password, phone, balance, useRandomBalance } = req.body;

    // Basic validation
    if (!email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Email, password, and phone are required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password length and complexity validation
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
      });
    }

    // Phone format validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    if (phone.length < 9 || phone.length > 15) {
      return res
        .status(400)
        .json({ message: "Phone number must be between 9 and 15 digits" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine balance
    let initialBalance;
    if (useRandomBalance || balance === undefined || balance === null) {
      initialBalance = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    } else {
      const parsedBalance = parseFloat(balance);
      if (isNaN(parsedBalance) || parsedBalance < 0) {
        return res
          .status(400)
          .json({ message: "Balance must be a valid non-negative number" });
      }
      initialBalance = parsedBalance;
    }

    // Generate verification code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Create and save user
    const newUser = new User({
      email,
      password, // (optional: hash password in future)
      phone,
      isVerified: false,
      balance: initialBalance,
      verificationCode: code,
    });

    await newUser.save();

    // Mock sending code
    console.log(`Verification code for ${email}: ${code}`);

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

/* This code defines a signup route for user registration in an Express application.
It includes validation for email, password, and phone number formats, checks for existing users,
and allows for an optional random balance or a specified balance. It generates a verification code
and saves the user to the database, while also logging the verification code for mock purposes. */
