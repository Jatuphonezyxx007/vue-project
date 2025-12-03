const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const checkAuth = require("../middleware/auth.middleware");

// "checkAuth" คือด่านตรวจที่บังคับว่าต้อง login ก่อน
// ถ้าไม่ login (ไม่มี token) จะไม่สามารถเรียก controller ได้เลย

// POST /cart/add (เพิ่มของเข้าตะกร้า)
router.post("/add", checkAuth, cartController.addToCart);

// GET /cart (ดูของทั้งหมดในตะกร้า)
router.get("/", checkAuth, cartController.getCart);

// PUT /cart/:id (อัปเดตจำนวน)
router.put("/:id", checkAuth, cartController.updateCartItem);

// DELETE /cart/:id (ลบสินค้า)
router.delete("/:id", checkAuth, cartController.removeCartItem);

module.exports = router;
