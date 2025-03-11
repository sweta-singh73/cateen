const express = require('express');
const { addTodayMenu } = require('./todayMenuController');

const todayMenuRoute = express.Router();

//routes
todayMenuRoute.post("/add-today-menu", addTodayMenu);

module.exports = todayMenuRoute