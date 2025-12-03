// const express = require("express");
// const router = express.Router();
// const orderController = require("../controllers/orderController");
// const checkAuth = require("../middleware/auth.middleware");
// const uploadSlip = require("../middleware/uploadSlip.middleware");
// const orderSchema = require("../models/order.model");

// // POST /orders/create

// router.get("/", async function (req, res, next) {
//   try {
//     let orders = await orderSchema.find({});
//     res.send(orders);
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// });
// // เราใช้ .single('slipImage') - "slipImage" ต้องตรงกับชื่อ field ใน FormData
// router.post(
//   "/create",
//   checkAuth,
//   uploadSlip.single("slipImage"),
//   orderController.createOrder
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const checkAuth = require("../middleware/auth.middleware");
const uploadSlip = require("../middleware/uploadSlip.middleware");
const orderSchema = require("../models/order.model"); // นี่คือ Model 'order'

// ==========================================================
// 1. GET /orders (อัปเดตให้รองรับ Pagination และ Filter)
// ==========================================================
// ตัวอย่างการเรียกใช้:
// GET /orders?page=1&limit=12
// GET /orders?paymentStatus=pending
// GET /orders?page=2&paymentStatus=paid

router.get("/", async function (req, res, next) {
  try {
    // --- 1. การตั้งค่า Pagination ---
    const page = parseInt(req.query.page) || 1; // หน้าปัจจุบัน (default คือ 1)
    const limit = parseInt(req.query.limit) || 12; // จำนวนต่อหน้า (default คือ 12 ตามที่คุณขอ)
    const skip = (page - 1) * limit; // คำนวณว่าจะข้ามไปกี่ docs

    // --- 2. การตั้งค่า Filter ---
    const queryOptions = {};
    const { paymentStatus } = req.query;

    if (paymentStatus) {
      // ถ้ามี query ?paymentStatus=... ให้เพิ่มเงื่อนไขใน query
      queryOptions.paymentStatus = paymentStatus;
    }
    // (คุณสามารถเพิ่ม filter อื่นๆ ที่นี่ได้อีก เช่น customerId)

    // --- 3. ดึงข้อมูลจาก DB ---
    // ดึงข้อมูลแบบแบ่งหน้า พร้อม filter
    const orders = await orderSchema
      .find(queryOptions)
      .populate("customer", "username email") // ดึงข้อมูล user ที่เกี่ยวข้อง (เอาแค่ username, email)
      .sort({ createdAt: -1 }) // เรียงจากใหม่ไปเก่า
      .limit(limit)
      .skip(skip);

    // นับจำนวนเอกสารทั้งหมดที่ตรงตามเงื่อนไข (สำหรับคำนวณหน้าทั้งหมด)
    const totalOrders = await orderSchema.countDocuments(queryOptions);
    const totalPages = Math.ceil(totalOrders / limit);

    // --- 4. ส่งข้อมูลกลับ ---
    res.status(200).json({
      data: orders,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalOrders,
        limit: limit,
      },
    });
  } catch (error) {
    console.log(error);
    // ใช้ .status(500).json() เพื่อการจัดการ Error ที่ดีกว่า
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล", error: error.message });
  }
});

// ==========================================================
// 2. PATCH /orders/:id/status (สำหรับอัปเดตสถานะการชำระเงิน)
// ==========================================================
// นี่คือ Route ที่ตรงกับ ${ORDER_API_URL}/${order._id}/status
// ใช้ Method PATCH (หรือ PUT) สำหรับการ "อัปเดต"
// ตัวอย่างการส่ง body: { "newStatus": "paid" }

router.patch("/:id/status", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body; // รับค่า status ใหม่จาก JSON body

    // ตรวจสอบว่า status ที่ส่งมาถูกต้องตาม enum ใน Model หรือไม่
    const validStatuses = ["pending", "paid", "cod"];
    if (!newStatus || !validStatuses.includes(newStatus)) {
      return res
        .status(400)
        .json({
          message:
            "Invalid or missing 'newStatus'. ต้องเป็น pending, paid, หรือ cod",
        });
    }

    // ค้นหาและอัปเดต Order
    const updatedOrder = await orderSchema.findByIdAndUpdate(
      id,
      { $set: { paymentStatus: newStatus } },
      { new: true } // { new: true } คือการสั่งให้ Mongoose ส่งข้อมูล *หลัง* อัปเดตกลับมา
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "ไม่พบ Order ที่ต้องการอัปเดต" });
    }

    res.status(200).json({
      message: "อัปเดตสถานะการชำระเงินสำเร็จ",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "เกิดข้อผิดพลาดในการอัปเดตสถานะ",
        error: error.message,
      });
  }
});

// ==========================================================
// Routes เดิมของคุณ
// ==========================================================

// POST /orders/create
// เราใช้ .single('slipImage') - "slipImage" ต้องตรงกับชื่อ field ใน FormData
router.post(
  "/create",
  checkAuth,
  uploadSlip.single("slipImage"),
  orderController.createOrder
);

module.exports = router;
