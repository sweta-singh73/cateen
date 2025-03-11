const express = require('express');
const { login, verifyOtp } = require('./authController');

const userAuthRoute = express.Router();


//routes
userAuthRoute.post("/login", login);
userAuthRoute.post("/verify-otp", verifyOtp);




module.exports = userAuthRoute;