const express = require('express');
const { createEmp, getUserByName, viewUser } = require('./authController');
const adminAuthRoute = express.Router();


//routes
adminAuthRoute.post("/create-employee",  createEmp);
adminAuthRoute.get("/get-emp-name", getUserByName);
adminAuthRoute.get("/view-employee", viewUser);




module.exports = adminAuthRoute;