const express = require('express');
const userAuthRoute = require('../modules/auth/userRouter');
const userTodayMenuRoute = require('../modules/todayMenu/userTodatMenuRoute');
const cartRoute = require('../modules/cart/cartRoute');
const verifyToken = require('../middlewares/auth');

const app = express()

//routes
app.use("/auth", userAuthRoute);
app.use("/today", userTodayMenuRoute);
app.use("/cart", verifyToken, cartRoute);

module.exports = app;



