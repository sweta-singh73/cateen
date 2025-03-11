const mongoose = require('mongoose');
const subMenuSchema = new mongoose.Schema({
  menu_id: {
    type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
    ref: "Menu", // Reference to the menu model
    required: true,
  },
  item_name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    default:1
  }
},
{
 timestamps:true,
 versionKey:false
});

const Submenu = mongoose.model("submenu", subMenuSchema);
module.exports = Submenu;