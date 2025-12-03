const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    product_sku: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    product_name: {
      type: String,
      required: true, // ต้องมีชื่อ
      trim: true,
    },
    product_description: {
      type: String,
      trim: true,
    },
    product_price: {
      type: Number,
      required: true,
      min: 0, // ราคาไม่ควรติดลบ
    },
    // เปลี่ยนชื่อ qty ให้สื่อความหมายมากขึ้น
    stock_quantity: {
      type: Number,
      required: true,
      default: 0, // ค่าเริ่มต้น
      min: 0,
    },

    // --- สิ่งที่ควรเพิ่ม ---

    // 1. รูปภาพ (สำคัญมาก)
    product_images: [
      { type: String, required: true }, // เก็บเป็น Array ของ URL
    ],

    // 2. หมวดหมู่ (สำหรับการค้นหา)
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // อ้างอิงไปยัง Collection 'categories'
      required: true,
    },

    // 3. สถานะสินค้า
    status: {
      type: String,
      enum: ["active", "draft", "archived"], // สถานะที่เป็นไปได้
      default: "draft", // เริ่มต้นเป็นฉบับร่าง
    },
  },
  // 4. เวลา (สำคัญมาก)
  { timestamps: true } // จะสร้าง `createdAt` และ `updatedAt` ให้อัตโนมัติ
);
