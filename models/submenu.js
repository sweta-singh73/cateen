const mongoose = require('mongoose');

const subMenuSchema = new mongoose.Schema({
  menu_id: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Menu model
    ref: "Menu",  // Reference to the Menu model
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  }
}, {
  timestamps: true,
  versionKey: false,
});

const Submenu = mongoose.model("Submenu", subMenuSchema);  // Changed model name to "Submenu"
module.exports = Submenu;
