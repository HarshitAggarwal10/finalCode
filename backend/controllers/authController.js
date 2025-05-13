const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, isSeller } = req.body;
  try {
    const user = new User({ name, email, password, isSeller });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) res.json(user);
    else res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
};
