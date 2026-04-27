const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact  — called when customer submits the contact form
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Thank you! We will contact you shortly.', data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
