const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  phone:     { type: String, required: true },
  email:     { type: String, required: true },
  service:   { type: String, required: true },
  state:     { type: String, default: '' },
  specialty: { type: String, default: '' },
  notes:     { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Demo', demoSchema);
