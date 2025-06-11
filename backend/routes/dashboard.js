const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.email}!` });
});

module.exports = router;
