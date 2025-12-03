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
var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model");
var categorySchema = require("../models/category.model");
const { Query } = require("mongoose");
const multer = require("multer");

// ===== 📌 [เพิ่ม] Import path และ fs =====
const path = require("path");
const fs = require("fs");
// ======================================

// ===== 📌 [แก้ไข] การตั้งค่า Multer =====

// 1. เปลี่ยนชื่อตัวแปรเดิม (สำหรับ form-data ที่ไม่มีไฟล์)
const textOnlyUpload = multer();

// 2. สร้าง Path สำหรับอัปโหลด
// (เราใช้ path.join และ __dirname เพื่อให้ได้ path ที่ถูกต้อง
// โดยจะชี้ไปที่โฟลเดอร์ 'uploads/products' ที่อยู่นอกโฟลเดอร์ 'routes' นี้)
const productUploadPath = path.join(__dirname, "../uploads/products");

// 3. ตรวจสอบและสร้างโฟลเดอร์ 'uploads/products' หากยังไม่มี
if (!fs.existsSync(productUploadPath)) {
  fs.mkdirSync(productUploadPath, { recursive: true });
}

// 4. กำหนดค่า DiskStorage สำหรับ Multer
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // กำหนดโฟลเดอร์ที่จะบันทึก
    cb(null, productUploadPath);
  },
  filename: function (req, file, cb) {
    // ดึง product_sku จาก req.body
    const { product_sku } = req.body;
    // ดึงนามสกุลไฟล์
    const extension = path.extname(file.originalname);
    // สร้างชื่อไฟล์ใหม่
    const newFilename = `${product_sku}${extension}`;
    cb(null, newFilename);
  },
});

// 5. สร้างตัวกรองไฟล์ (อนุญาตเฉพาะรูปภาพ)
const imageFileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(
    new Error(
      "Error: อนุญาตเฉพาะไฟล์รูปภาพ (jpeg, jpg, png, gif, webp) เท่านั้น"
    )
  );
};

// 6. สร้าง Multer instance สำหรับอัปโหลดรูปสินค้า
const productImageUpload = multer({
  storage: productStorage,
  fileFilter: imageFileFilter,
}).single("product_image_file"); // ❗️ 'product_image_file' คือชื่อ field ที่ Frontend ต้องส่งมา
// ======================================

// (โค้ด router.get("/") ... เหมือนเดิม)
router.get("/", async function (req, res, next) {
  try {
    // 1. ดึงค่าทั้งหมดจาก query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // (เพิ่ม) ดึงค่า search และ sort
    const { search, sort_by, sort_order } = req.query;

    // 2. (เพิ่ม) สร้าง Query Object สำหรับ Mongoose
    let query = {};
    if (search) {
      // ค้นหาจาก 'product_name' และ 'product_description'
      query.$or = [
        { product_name: { $regex: search, $options: "i" } },
        { product_description: { $regex: search, $options: "i" } },
      ];
    }

    // 3. (เพิ่ม) สร้าง Sort Object
    let sortOptions = {};
    if (sort_by) {
      sortOptions[sort_by] = sort_order === "desc" ? -1 : 1;
    }

    // 4. (แก้ไข) ค้นหาข้อมูลพร้อมกัน 2 อย่าง
    const [products, totalProducts] = await Promise.all([
      // A: ค้นหาสินค้า (ใช้ query, sort, skip, limit)
      productSchema.find(query).sort(sortOptions).skip(skip).limit(limit),
      // B: นับจำนวนสินค้าทั้งหมด (ใช้ query)
      productSchema.countDocuments(query),
    ]);

    // 5. (แก้ไข) ส่งข้อมูลกลับใน Format ที่ถูกต้อง
    res.json({
      products: products,
      totalProducts: totalProducts,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// (โค้ด router.put("/:id") ... เหมือนเดิม)
// 📌 [แก้ไข] ใช้ textOnlyUpload.none()
router.put("/:id", textOnlyUpload.none(), async function (req, res, next) {
  try {
    const { id } = req.params;

    // (เราจะใช้ req.body ทั้งหมดในการอัปเดต)
    // หมายเหตุ: Frontend ของคุณต้องส่ง key มาให้ตรงกับ Schema
    // เช่น product_name, product_price, stock_qty, ...

    // *** [ข้อควรระวัง] ***
    // โค้ดส่วนนี้ยังไม่รองรับการ "เปลี่ยน" รูปภาพ
    // มันรองรับแค่การ "แก้ไข" ข้อมูล text เท่านั้น
    // (หาก Frontend ส่ง 'product_images' มา, มันจะเขียนทับของเดิม)

    const updatedProduct = await productSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // { new: true } เพื่อให้ส่งข้อมูลใหม่กลับไป
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Cannot find product to update!" });
    }

    res.json({
      message: "Update product successfully!!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// (โค้ด router.delete("/:id") ... เหมือนเดิม)
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const deletedProduct = await productSchema.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Cannot find product to delete!" });
    }

    res.status(200).json({ message: "Delete product successfully!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== 📌 [แก้ไข] Route POST / (เพิ่มสินค้า) =====
router.post(
  "/",
  // 1. Middleware: เรียกใช้ Multer ที่เราสร้าง (productImageUpload)
  (req, res, next) => {
    productImageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred (e.g., file size limit)
        return res
          .status(400)
          .json({ message: "Multer upload error", error: err.message });
      } else if (err) {
        // An unknown error occurred (e.g., file filter error)
        return res
          .status(400)
          .json({ message: "File upload error", error: err.message });
      }
      // Everything went fine, proceed to the next handler
      next();
    });
  },
  // 2. Main Logic: (หลังจากอัปโหลดไฟล์สำเร็จ)
  async function (req, res, next) {
    try {
      // ดึงข้อมูลจาก req.body
      let {
        product_sku,
        product_name,
        product_description,
        product_price,
        stock_qty,
        // (เราไม่ดึง product_images จาก req.body แล้ว)
        category,
        status,
      } = req.body;

      // 3. ตรวจสอบว่ามีไฟล์อัปโหลดมาหรือไม่
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "Image file is required (product_image_file)." });
      }

      // 4. ดึงชื่อไฟล์ที่ Multer บันทึกให้ (เช่น "SKU001.jpg")
      const uploadedFilename = req.file.filename;

      // (โค้ดตรวจสอบ SKU ซ้ำ (ถ้าคุณต้องการ) )
      const existingProduct = await productSchema.findOne({
        product_sku: product_sku,
      });

      if (existingProduct) {
        // (ข้อควรระวัง: ถ้า SKU ซ้ำ, รูปที่อัปโหลดจะถูกเขียนทับ)
        // คุณอาจต้องลบไฟล์ที่เพิ่งอัปโหลดถ้าไม่ต้องการ
        // fs.unlinkSync(req.file.path); // <-- (ตัวอย่างการลบไฟล์)
        return res.status(400).json({ message: "Product SKU นี้มีในระบบแล้ว" });
      }

      let product = new productSchema({
        product_sku: product_sku,
        product_name: product_name,
        product_description: product_description,
        product_price: product_price,
        stock_qty: stock_qty,
        // 5. [สำคัญ] บันทึกชื่อไฟล์ลงใน Array
        product_images: [uploadedFilename],
        category: category,
        status: status,
      });

      await product.save();

      res.status(201).json({ message: "Add product successfully!!" });
    } catch (error) {
      console.error(error);
      // ถ้าเกิด Error ระหว่าง Save, ลบไฟล์ที่อัปโหลดทิ้ง (ถ้ามี)
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
          console.log("Rolled back uploaded file:", req.file.filename);
        } catch (unlinkError) {
          console.error("Error rolling back file:", unlinkError);
        }
      }
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);
// ======================================

// (โค้ด router.get("/by-category") ... เหมือนเดิม)
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

// (โค้ด router.get("/:id") ... เหมือนเดิม)
router.get("/:id", async function (req, res, next) {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId);
    // .populate("categories");
    if (!product) {
      return res.status(404).json({ message: "Cannot find this product!" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

module.exports = router;
