const express = require('express');
const userAuthRoute = require('../modules/auth/userRouter');

const app = express()

//routes
app.use("/auth", userAuthRoute);



module.exports = app;



