const express = require("express");
const router = express.Router();
// export it from signup.js
const verificationCodes = require("./signup").verificationCodes;
// In memory verification code storage
router.post("/", (req, res) => {
  const { email, code } = req.body;

  // Basic validation
  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required." });
  }

  // Check if the email exists in the verification codes map
  const storedCode = verificationCodes.get(email);
  if (!storedCode) {
    return res.status(400).json({ message: "No code found for this email." });
  }

  // Check if the provided code matches the stored code
  if (storedCode.toString() !== code.toString()) {
    return res.status(400).json({ message: "Invalid verification code." });
  }

  // One-time use
  verificationCodes.delete(email);
  res.status(200).json({ message: "Phone verified successfully." });
});

module.exports = router;
