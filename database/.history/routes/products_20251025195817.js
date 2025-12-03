var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model");

router.get("/", function (req, res, next) {
  try {
    let products = await productSchema.find({})
    res.send(products);
  } catch (error) {
    
  }
});

module.exports = router;
