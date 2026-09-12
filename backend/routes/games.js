const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// جلب جميع الألعاب
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({ isActive: true });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ في جلب الألعاب' });
  }
});

// إضافة لعبة جديدة (للآدمن)
router.post('/', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json({ success: true, game });
  } catch (err) {
    res.status(400).json({ message: 'فشل إضافة اللعبة' });
  }
});

module.exports = router;
