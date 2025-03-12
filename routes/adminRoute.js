const express = require('express')
const adminAuthRoute = require('../modules/auth/adminRouter');
const verifyToken = require('../middlewares/auth');
const authorizedRole = require('../middlewares/authorizedRole');
const menuRoute = require('../modules/menu/menuRoute');
const subMenuRoute = require('../modules/submenu/submenuRoute');
const adminTodayMenuRoute = require('../modules/todayMenu/adminTodayMenuRoute');
const app = express()

//routes
app.use("/auth", verifyToken, authorizedRole(['admin']), adminAuthRoute);
app.use("/menu",verifyToken, authorizedRole(['admin']), menuRoute);
app.use("/submenu",verifyToken, authorizedRole(['admin']), subMenuRoute);
app.use("/today", adminTodayMenuRoute);


module.exports = app;



