const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// POST /login route to handle user login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email });

    // Validate credentials
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Optional: warn if phone is not verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Phone number is not verified." });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

/* This code handles user login in a Node.js application using Express.js and Mongoose. 
It validates the user's email and password, checks if the user exists in the MongoDB database,
and generates a JWT token if the credentials are valid.
If the user's phone number is not verified, it returns an error message.
The JWT token is signed with a secret key and includes an expiration time defined in environment variables.
The route expects a POST request with the user's email and password in the request body. */
