
const Dailymenu = require('../../models/dailyMenu');
const Menu = require('../../models/menu');
const Submenu = require('../../models/submenu');
const mongoose = require("mongoose");
const moment = require('moment');


//delete today menu *****************************************************************

const createTodayMenu = async (req, res) => {
  let { sub_menu_items, menuType } = req.body;

  try {
    // Get today's date in MM-DD-YYYY format
    const today = moment(Date.now()).format("MM-DD-YYYY");

    // Get current time in HH:mm:ss format
    const currentTime = moment().format("HH:mm:ss");

    // Log the input values to ensure correct data
    console.log("Received request:", { sub_menu_items, menuType });

    // Prepare data for today's menu
    let data = {
      sub_menu_items: sub_menu_items,
      type: menuType, 
      date: today,    
      time: currentTime, 
    };


    console.log("Data to be saved:", data);

    // First, check if the menu already exists for today and the menuType
    const existingMenu = await Dailymenu.findOne({ date: today, type: menuType });
    if (existingMenu) {
      return res.status(400).json({
        statusCode: 400,
        message: "Menu for today already exists for this menu type.",
      });
    }

    // Now, ensure that submenu items belong to the correct menu type
    const menuItems = await Menu.find({ '_id': { $in: sub_menu_items } });

    const invalidItems = menuItems.filter(item => item.menu_id.toString() !== menuType);
    if (invalidItems.length > 0) {
      return res.status(400).json({
        statusCode: 400,
        message: `Some submenu items do not belong to the ${menuType} menu: ${invalidItems.map(item => item.title).join(', ')}`,
      });
    }

    // Add the menu for today if it doesn't exist and submenu items are valid
    await Dailymenu.create(data);

    return res.status(200).json({
      statusCode: 200,
      message: "Menu added successfully for today.",
    });

  } catch (err) {
    console.error("Error creating today menu:", err);  // Add logging for errors
    return res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};




const deleteTodayMenu = async(req, res)=>{
  try {
    const today_menu_id = req.params.id;
    const todayMenu = await Dailymenu.findByIdAndDelete({_id:today_menu_id});

    if(!todayMenu)return res.status(400).json({error:"today menu not found!"});
    return res.status(200).json({message:"today menu deleted successfully"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//get all items**********************************************************************
// const getAllTodayMenus = async (req, res) => {
//   try {
//     const todayMenus = await Dailymenu.find(
 
//     ).populate("")

//     return res.status(200).json({
//       message: "Today menu items fetched successfully",
//       data: todayMenus
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
const getAllTodayMenus = async (req, res) => {
  try {
    const todayMenus = await Dailymenu.find()
      .populate({
        path: "menu_id",  // Populate menu details
        select: "title time",  // Select fields from the Menu model
      })
      .populate({
        path: "sub_menu_id",  // Populate submenus
        select: "item_name quantity price",  // Select fields from the Submenu model
      });

    return res.status(200).json({
      message: "Today menu items fetched successfully",
      data: todayMenus,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};






module.exports = { createTodayMenu, deleteTodayMenu, getAllTodayMenus };





