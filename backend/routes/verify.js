const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /verify route to verify user's phone via code
router.post("/", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "Email and verification code are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare code
    if (user.verificationCode !== parseInt(code)) {
      return res.status(401).json({ message: "Invalid verification code." });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationCode = undefined; // Optional: clear the code after verification
    await user.save();

    res.status(200).json({ message: "Phone number verified successfully." });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

/* This code verifies the user's phone number using the verification code stored in MongoDB.
If the code is correct, it updates the user document to mark the user as verified. 
It uses Express.js for routing and Mongoose for database interaction.
The route expects a POST request with the user's email and verification code in the request body. */
