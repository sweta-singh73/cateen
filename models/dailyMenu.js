
const mongoose = require("mongoose");
const subMenuSchema = new mongoose.Schema(
  {
    menu_id: {
      type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
      ref: "Menu", // Reference to the menu model
      required: true,
    },
    sub_menu_id:
      {
        type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
        ref: "Submenu", // Reference to the menu model
        required: true,
      },
    

    quantity: {
      type: Number,
      default: 1,
    },

    date: {
      type: String,
      required: true,
    },
    time:{
      type: String,
      required:true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Dailymenu = mongoose.model("Dailymenu", subMenuSchema);
module.exports = Dailymenu;
