const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
});

// Compound index to prevent duplicates
citySchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('City', citySchema);
