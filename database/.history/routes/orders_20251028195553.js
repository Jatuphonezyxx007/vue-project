const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const checkAuth = require("../middleware/auth.middleware");
const uploadSlip = require("../middleware/uploadSlip.middleware");

// POST /orders/create
// เราใช้ .single('slipImage') - "slipImage" ต้องตรงกับชื่อ field ใน FormData
router.post(
  "/create",
  checkAuth,
  uploadSlip.single("slipImage"),
  orderController.createOrder
);

module.exports = router;
