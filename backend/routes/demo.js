const express = require('express');
const router  = express.Router();
const Demo    = require('../models/Demo');

// POST /api/demo  — called when customer submits the request demo form
router.post('/', async (req, res) => {
  try {
    const demo = await Demo.create(req.body);
    res.status(201).json({ success: true, message: 'Demo request submitted! We will contact you within 24 hours.', data: demo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
