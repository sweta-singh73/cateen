const express = require('express');
const { getAllTodayMenus } = require('./todayMenuController');
const userTodayMenuRoute = express.Router();

//routes
userTodayMenuRoute.get("/get-today-menu", getAllTodayMenus);

module.exports = userTodayMenuRoute