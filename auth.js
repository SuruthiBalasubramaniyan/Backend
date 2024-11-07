// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.json({ token, user: { name: user.name, email: user.email, image: user.image } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
