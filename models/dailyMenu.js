const mongoose = require("mongoose");
const dailyMenuSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,  // ObjectId for referencing the Menu model
      ref: "Menu",  // Reference to the Menu model
      required: true,  // Ensure the type is required
    },
    sub_menu_items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submenu",  // Reference to Submenu
        required: true,
      },
    ],
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Dailymenu = mongoose.model("Dailymenu", dailyMenuSchema);
module.exports = Dailymenu;
