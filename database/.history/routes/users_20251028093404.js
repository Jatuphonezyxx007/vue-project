var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model");
const { Query } = require("mongoose");
const multer = require("multer");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
