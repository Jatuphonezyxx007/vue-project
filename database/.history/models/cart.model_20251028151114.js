const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    // นี่คือส่วนที่ "เชื่อม" กับผู้ใช้
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", // ชื่อ Model ที่มาจากไฟล์ user.model.js
      required: true,
    },
    // นี่คือส่วนที่ "เชื่อม" กับสินค้า (คุณต้องมี product.model.js ด้วย)
    product: {
      type: Schema.Types.ObjectId,
      ref: "product", // สมมติว่า Model สินค้าชื่อ "product"
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { timestamps: true }
);

// สร้าง Index เพื่อให้ค้นหาเร็วขึ้น
cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("cartItem", cartItemSchema);
