const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjM1ZmE4YjRjNmMwYjk2OWIyNmJjYSIsImlhdCI6MTc0NzE0ODc2N30.WDMNSiKQl112nWi4hOAQZfijXZNXyryJKkgDDZSY490
//68236042c774e41531dfd6ef
// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '1h' }); // Add expiration time if needed
    const refreshToken = jwt.sign({ id: user._id }, "secret", { expiresIn: '7d' }); // Refresh token for longer validity

    res.json({
      token,
      refreshToken,
 user: { _id: user._id, username: user.username, email: user.email }, // Send user info
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
