const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Menu = mongoose.model("Menu", menuSchema);  // Updated to use "Menu" (capitalized)
module.exports = Menu;
