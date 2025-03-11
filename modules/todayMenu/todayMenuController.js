
const Dailymenu = require('../../models/dailyMenu');
const Menu = require('../../models/menu');
const Submenu = require('../../models/submenu');

const addTodayMenu = async (req, res) => {
  try {
    // Extract sub_menu_id, date, quantity, and time from the request body
    const { sub_menu_id, date, quantity, time } = req.body;

    // Check if the submenu exists by its ID
    const submenuExist = await Submenu.findById(sub_menu_id);
    if (!submenuExist) {
      return res.status(400).json({ error: "Submenu does not exist" });
    }

    // Check if the corresponding menu exists for the submenu
    const menuExist = await Menu.findById(submenuExist.menu_id);
    if (!menuExist) {
      return res.status(400).json({ error: "Menu for this submenu does not exist" });
    }

    // Ensure time is provided
    if (!time) {
      return res.status(400).json({ error: "Time is required" });
    }

    // Check if a daily menu already exists for the given submenu, date, and time
    const existingMenu = await Dailymenu.findOne({
      sub_menu_items: submenuExist._id,
      date: date || new Date().toISOString().split('T')[0], // Default to today's date if not provided
      time: time, // Check for matching time
    });

    if(existingMenu)return res.status(400).json({error:'daily menu alrady exist'})

    // Prepare the data for the daily menu
    const dailyMenuData = {
      menu_id: submenuExist.menu_id,
      sub_menu_items: submenuExist._id,
      quantity: quantity || 1, // Default to 1 if no quantity provided
      date: date || new Date().toISOString().split('T')[0], // Default to today's date if not provided
      time: time, // Include the time from request
    };

      // If no existing daily menu, create a new one
      const dailyMenu = new Dailymenu(dailyMenuData);
      await dailyMenu.save();

      return res.status(201).json({ message: "Daily menu added successfully", dailyMenu });
    

  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ error: error.message });
  }
};

//delete today menu ******************************************************************
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



module.exports = { addTodayMenu, deleteTodayMenu };





