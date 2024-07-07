const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Giriş yap
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
