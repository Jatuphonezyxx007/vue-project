var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model");


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
