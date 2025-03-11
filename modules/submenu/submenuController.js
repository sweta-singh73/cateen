const Menu = require('../../models/menu');
const Submenu = require('../../models/submenu');
const mongoose = require("mongoose");
//add submenu**********************************************************************
const addSubMenu = async(req, res)=>{
  try {
    const cleanedBody = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [key.trim(), value])
    );
    const { menu_id, item_name, price } = cleanedBody;
     if(!menu_id || !item_name || !price)return res.status(400).json({error:"menu_id, item_name, price is required"});

     // Check if menu_id is a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(menu_id)) {
      console.log("Invalid category ID:", menu_id);
      return res.status(400).json({ error: "Invalid menu ID format!" });
    }

    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return res.status(404).json({ error: "menu not found!" });
    }

    const subMenu = new Submenu({
      menu_id,
      item_name,
      price
      
    });

    await subMenu.save();

    console.log("submenu created:", subMenu);
    return res.status(201).json({
      message: "submenu added successfully!",
      data: subMenu,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//list submenu*********************************************************************
const subMenuList = async(req, res)=>{
  try {
    const submenu = await Submenu.find();
    if(!submenu)return res.status(400).json({error:"submenu not found!"});
    return res.status(200).json({message:"Submenu list fetch successfully", data:submenu});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//update submenu*********************************************************************
const updateSubMenu = async (req, res) => {
  try {
    const subMenuId = req.params.id;

    const subMenu = await Submenu.findOne({_id: subMenuId });

    if (!subMenu) return res.status(400).json({ error: "menu not found" });

    const updateData = {
      menu_id:req.body.menu_id,
      item_name: req.body.item_name,
      price: req.body.price,
    };
    const updateSubMenu = await Submenu.findByIdAndUpdate(
      { _id: subMenuId },
      updateData
    );

    if (!updateSubMenu) return res.status(400).json({ error: "data not found!" });
    return res.status(200).json({ message: "menu updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete submenu***********************************************************
const deleteSubMenu = async (req, res) => {
  try {
    const subMenuId = req.params.id;
    const subMenu = await Submenu.findOne({ _id: subMenuId });
    if (!subMenu) return res.status(400).json({ error: "submenu detail not found" });

    await Submenu.findByIdAndDelete({ _id: subMenuId });
    return res
      .status(200)
      .json({ message: "submenu details delete successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {addSubMenu, subMenuList, subMenuList, updateSubMenu, deleteSubMenu}