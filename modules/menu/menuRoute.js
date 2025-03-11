const express = require('express');
const { addMenu, updateMenu, deleteMenu, menuList } = require('./menuController');
const menuRoute = express.Router();

//routes
menuRoute.post("/add-menu", addMenu);
menuRoute.put("/update-menu/:id", updateMenu);
menuRoute.delete("/delete-menu/:id", deleteMenu);
menuRoute.get("/menu-list", menuList);


module.exports = menuRoute