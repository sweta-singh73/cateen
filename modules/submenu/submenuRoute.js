const express = require('express');
const { addSubMenu, subMenuList, updateSubMenu, deleteSubMenu } = require('./submenuController');
const subMenuRoute = express.Router();

//routes
subMenuRoute.post("/add-submenu", addSubMenu);
subMenuRoute.put("/update-sub-menu/:id", updateSubMenu);
subMenuRoute.delete("/delete-sub-menu/:id", deleteSubMenu);
subMenuRoute.get("/submenu-list", subMenuList);


module.exports = subMenuRoute