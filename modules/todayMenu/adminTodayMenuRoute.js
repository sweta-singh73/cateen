const express = require('express');
const { createTodayMenu } = require('./todayMenuController');
const adminTodayMenuRoute = express.Router();

//routes
adminTodayMenuRoute.post("/add-today-menu", createTodayMenu);

module.exports = adminTodayMenuRoute