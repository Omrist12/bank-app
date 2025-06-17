const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const authenticateToken = require("../middleware/authMiddleware");

// POST /transactions – Make a new transaction
router.post("/", authenticateToken, async (req, res) => {
  try {
    const fromEmail = req.user.email; // Extracted from JWT
    const { toEmail, amount } = req.body;

    if (!toEmail || !amount) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const fromUser = await User.findOne({ email: fromEmail });
    const toUser = await User.findOne({ email: toEmail });

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    // Perform balance updates
    fromUser.balance -= amount;
    toUser.balance += amount;

    await fromUser.save();
    await toUser.save();

    // Record the transactions
    await Transaction.create([
      {
        from: fromUser._id,
        to: toUser._id,
        amount,
        type: "outcome",
      },
      {
        from: fromUser._id,
        to: toUser._id,
        amount,
        type: "income",
      },
    ]);

    res.status(200).json({ message: "Transaction successful." });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /transactions – Get transaction history for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const transactions = await Transaction.find({
      $or: [{ from: user._id }, { to: user._id }],
    })
      .sort({ timestamp: -1 })
      .populate("from", "email")
      .populate("to", "email");

    const enriched = transactions.map((tx) => ({
      from: tx.from.email,
      to: tx.to.email,
      amount: tx.amount,
      type: tx.type,
      date: tx.timestamp,
    }));

    res.status(200).json(enriched);
  } catch (err) {
    console.error("Fetch history error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
