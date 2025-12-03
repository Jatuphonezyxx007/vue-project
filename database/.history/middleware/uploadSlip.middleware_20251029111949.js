// middleware/uploadSlip.middleware.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const slipDir = "uploads/e-slips";

// สร้าง directory ถ้ายังไม่มี
fs.mkdirSync(slipDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, slipDir);
  },
  filename: (req, file, cb) => {
    // เราจะตั้งชื่อไฟล์เป็น order_id ในภายหลัง
    // ตอนนี้ตั้งชื่อชั่วคราวไปก่อน
    const tempName = `${Date.now()}-${file.originalname}`;
    cb(null, tempName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น"), false);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter });
