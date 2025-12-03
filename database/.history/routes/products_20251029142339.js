// var express = require("express");
// var router = express.Router();
// var productSchema = require("../models/product.model");
// var categorySchema = require("../models/category.model");
// const { Query } = require("mongoose");
// const multer = require("multer");

// const upload = multer();

// // router.get("/", async function (req, res, next) {
// //   try {
// //     const page = parseInt(req.query.page) || 1;
// //     const limit = parseInt(req.query.limit) || 12;

// //     const skip = (page - 1) * limit;

// //     let products = await productSchema.find({}).skip(skip).limit(limit);
// //     res.json(products);
// //   } catch (error) {
// //     console.log(error);
// //     res
// //       .status(500)
// //       .json({ message: "Error fetching products", error: error.message });
// //   }
// // });

// // (โค้ด import ... เหมือนเดิม)

// router.get("/", async function (req, res, next) {
//   try {
//     // 1. ดึงค่าทั้งหมดจาก query string
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 12;
//     const skip = (page - 1) * limit;

//     // (เพิ่ม) ดึงค่า search และ sort
//     const { search, sort_by, sort_order } = req.query;

//     // 2. (เพิ่ม) สร้าง Query Object สำหรับ Mongoose
//     let query = {};
//     if (search) {
//       // ค้นหาจาก 'product_name' และ 'product_description'
//       query.$or = [
//         { product_name: { $regex: search, $options: "i" } },
//         { product_description: { $regex: search, $options: "i" } },
//       ];
//     }

//     // 3. (เพิ่ม) สร้าง Sort Object
//     let sortOptions = {};
//     if (sort_by) {
//       sortOptions[sort_by] = sort_order === "desc" ? -1 : 1;
//     }

//     // 4. (แก้ไข) ค้นหาข้อมูลพร้อมกัน 2 อย่าง
//     const [products, totalProducts] = await Promise.all([
//       // A: ค้นหาสินค้า (ใช้ query, sort, skip, limit)
//       productSchema.find(query).sort(sortOptions).skip(skip).limit(limit),
//       // B: นับจำนวนสินค้าทั้งหมด (ใช้ query)
//       productSchema.countDocuments(query),
//     ]);

//     // 5. (แก้ไข) ส่งข้อมูลกลับใน Format ที่ถูกต้อง
//     res.json({
//       products: products,
//       totalProducts: totalProducts,
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "Error fetching products", error: error.message });
//   }
// });

// // (วางโค้ดนี้ต่อจาก router.post("/"))

// // Update Data
// router.put("/:id", upload.none(), async function (req, res, next) {
//   try {
//     const { id } = req.params;

//     // (เราจะใช้ req.body ทั้งหมดในการอัปเดต)
//     // หมายเหตุ: Frontend ของคุณต้องส่ง key มาให้ตรงกับ Schema
//     // เช่น product_name, product_price, stock_qty, ...

//     const updatedProduct = await productSchema.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true } // { new: true } เพื่อให้ส่งข้อมูลใหม่กลับไป
//     );

//     if (!updatedProduct) {
//       return res
//         .status(404)
//         .json({ message: "Cannot find product to update!" });
//     }

//     res.json({
//       message: "Update product successfully!!",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // (วางโค้ดนี้ต่อจาก router.put("/:id") ที่คุณเพิ่งเพิ่ม)

// // Delete Data
// router.delete("/:id", async function (req, res, next) {
//   try {
//     const { id } = req.params;

//     const deletedProduct = await productSchema.findByIdAndDelete(id);

//     if (!deletedProduct) {
//       return res
//         .status(404)
//         .json({ message: "Cannot find product to delete!" });
//     }

//     res.status(200).json({ message: "Delete product successfully!!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Post Data
// router.post("/", upload.none(), async function (req, res, next) {
//   try {
//     let {
//       product_sku,
//       product_name,
//       product_description,
//       product_price,
//       stock_qty,
//       product_images,
//       category,
//       status,
//     } = req.body;

//     // const existingProduct = await productSchema.findOne({
//     //   _id: _id,
//     // });

//     // if (existingProduct) {
//     //   return res.status(400).json({ message: "Product ID นี้มีในระบบแล้ว" });
//     // }

//     let product = new productSchema({
//       product_sku: product_sku,
//       product_name: product_name,
//       product_description: product_description,
//       product_price: product_price,
//       stock_qty: stock_qty,
//       product_images: product_images,
//       category: category,
//       status: status,
//     });

//     await product.save();

//     res.status(201).json({ message: "Add product successfully!!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ===== เพิ่ม Route ใหม่นี้เข้าไป =====
// router.get("/by-category", async function (req, res, next) {
//   try {
//     // 1. $lookup: ทำการ "JOIN" กับ collection 'categories' (ผมเดาชื่อ collection)
//     // 2. $unwind: แตก array 'categoryData'
//     // 3. $sort: เรียงสินค้า (เช่น เอาใหม่สุดก่อน)
//     // 4. $group: "จัดกลุ่ม" คืน โดยใช้ _id และ name ของ category
//     //    และ $push: เอารายการสินค้าทั้งหมดใส่ใน array 'products'
//     const groupedProducts = await productSchema.aggregate([
//       {
//         $lookup: {
//           from: "categories", // <-- (สำคัญ!) ชื่อ collection หมวดหมู่ของคุณ
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryData",
//         },
//       },
//       {
//         $unwind: "$categoryData", // แตก array ที่ join มา
//       },
//       {
//         $sort: { createdAt: -1 }, // เรียงสินค้าใหม่สุดก่อน (ถ้ามี timestamps)
//       },
//       {
//         $group: {
//           _id: "$categoryData._id",
//           name: { $first: "$categoryData.category_name" }, // เอาชื่อหมวดหมู่
//           products: { $push: "$$ROOT" }, // เอารายการสินค้าทั้งหมดใส่ใน array
//         },
//       },
//       {
//         $sort: { name: 1 }, // เรียงลำดับหมวดหมู่ตามตัวอักษร
//       },
//       {
//         $project: {
//           // เลือกเฉพาะ field ที่จะส่งกลับไป
//           _id: 1,
//           name: 1,
//           products: {
//             // จำกัดให้แสดงผลแค่ 10-12 ชิ้นต่อแถว (เพื่อ performance)
//             $slice: ["$products", 12],
//           },
//         },
//       },
//     ]);

//     res.json(groupedProducts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error fetching grouped products",
//       error: error.message,
//     });
//   }
// });
// // ===== สิ้นสุด Route ใหม่ =====

// router.get("/:id", async function (req, res, next) {
//   try {
//     const productId = req.params.id;
//     const product = await productSchema.findById(productId);
//     // .populate("categories");
//     if (!product) {
//       return res.status(404).json({ message: "Cannot find this product!" });
//     }
//     res.json(product);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "Error fetching product", error: error.message });
//   }
// });

// module.exports = router;
