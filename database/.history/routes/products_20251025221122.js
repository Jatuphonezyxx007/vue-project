var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model");
const { Query } = require("mongoose");

router.get("/", async function (req, res, next) {
  try {
    let page = parseInt(req.query.page) || 1;
    

    let products = await productSchema.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

module.exports = router;
