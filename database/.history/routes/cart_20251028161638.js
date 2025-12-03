const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const checkAuth = require("../middleware/auth.middleware");

// "checkAuth" คือด่านตรวจที่บังคับว่าต้อง login ก่อน
// ถ้าไม่ login (ไม่มี token) จะไม่สามารถเรียก controller ได้เลย

router.post("/add", checkAuth, cartController.addToCart);

router.get("/", checkAuth, cartController.getCart);

router.put("/:id", checkAuth, cartController.updateCartItem);

router.delete("/:id", checkAuth, cartController.removeCartItem);

module.exports = router;
