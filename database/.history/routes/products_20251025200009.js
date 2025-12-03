var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model"); // (ผมเดาว่านี่คือ Mongoose Model นะครับ)


router.get("/", async function (req, res, next) {
  try {
    let products = await productSchema.find({});
    res.json(products); // 2. ใช้ res.json() จะชัดเจนกว่า
  } catch (error) {
    console.log(error);
    // 3. ปรับการส่ง error ให้เป็นมาตรฐาน (ส่ง status 500)
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

module.exports = router;
