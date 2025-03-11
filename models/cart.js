const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({

  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
  },
  items: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submenu", // Ensure it matches your Product model name
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
},
{
  timestamps:true
}
)

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;