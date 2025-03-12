const express = require('express');
const { addToCart } = require('./cartController');
const cartRoute = express.Router();

//routes
cartRoute.post("/add-to-cart", addToCart);


module.exports = cartRoute