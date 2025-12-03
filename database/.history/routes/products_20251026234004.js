var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model");
var categorySchema = require("../models/category.model");
const { Query } = require("mongoose");

router.get("/", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    let products = await productSchema.find({}).skip(skip).limit(limit);
    res.json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

router.get("?:id", async function (req, res, next) {
  try {
    const productId = req.params.id;
    
  }
})

// ===== เพิ่ม Route ใหม่นี้เข้าไป =====
router.get("/by-category", async function (req, res, next) {
  try {
    // 1. $lookup: ทำการ "JOIN" กับ collection 'categories' (ผมเดาชื่อ collection)
    // 2. $unwind: แตก array 'categoryData'
    // 3. $sort: เรียงสินค้า (เช่น เอาใหม่สุดก่อน)
    // 4. $group: "จัดกลุ่ม" คืน โดยใช้ _id และ name ของ category
    //    และ $push: เอารายการสินค้าทั้งหมดใส่ใน array 'products'
    const groupedProducts = await productSchema.aggregate([
      {
        $lookup: {
          from: "categories", // <-- (สำคัญ!) ชื่อ collection หมวดหมู่ของคุณ
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData", // แตก array ที่ join มา
      },
      {
        $sort: { createdAt: -1 }, // เรียงสินค้าใหม่สุดก่อน (ถ้ามี timestamps)
      },
      {
        $group: {
          _id: "$categoryData._id",
          name: { $first: "$categoryData.category_name" }, // เอาชื่อหมวดหมู่
          products: { $push: "$$ROOT" }, // เอารายการสินค้าทั้งหมดใส่ใน array
        },
      },
      {
        $sort: { name: 1 }, // เรียงลำดับหมวดหมู่ตามตัวอักษร
      },
      {
        $project: {
          // เลือกเฉพาะ field ที่จะส่งกลับไป
          _id: 1,
          name: 1,
          products: {
            // จำกัดให้แสดงผลแค่ 10-12 ชิ้นต่อแถว (เพื่อ performance)
            $slice: ["$products", 12],
          },
        },
      },
    ]);

    res.json(groupedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching grouped products",
      error: error.message,
    });
  }
});
// ===== สิ้นสุด Route ใหม่ =====

module.exports = router;
