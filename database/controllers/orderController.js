// const Order = require("../models/order.model");
// const CartItem = require("../models/cart.model");
// const Counter = require("../models/counter.model");
// const Product = require("../models/product.model");
// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");

// // --- ฟังก์ชัน Helper สำหรับสร้าง Order ID (ord-001) ---
// async function getNextOrderId() {
//   const counter = await Counter.findByIdAndUpdate(
//     "orderId",
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true, session: session }
//   );
//   // 'ord-' ตามด้วยเลข 3 หลัก เช่น 001, 002
//   const orderId = `ord-${String(counter.seq).padStart(3, "0")}`;
//   return orderId;
// }

// // --- ฟังก์ชันหลักในการสร้าง Order ---
// exports.createOrder = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const userId = req.user.id;
//     const {
//       shippingAddress,
//       paymentMethod,
//       paymentDetails,
//       shippingFee,
//       vat,
//       subtotal,
//       total,
//     } = req.body;

//     // 1. ดึงตะกร้าสินค้าของผู้ใช้
//     const cartItems = await CartItem.find({ user: userId })
//       .populate("product")
//       .session(session);
//     if (cartItems.length === 0) {
//       throw new Error("ตะกร้าสินค้าว่างเปล่า");
//     }

//     // 2. สร้าง Order ID
//     const newOrderId = await getNextOrderId();

//     // ==========================================================
//     // 📌 3. (ถ้าโอนเงิน) จัดการไฟล์ Slip (แก้ไขตรงนี้)
//     // ==========================================================
//     let slipImagePath = null; // 👈 นี่คือตัวแปรที่จะเก็บ *ชื่อไฟล์* (เช่น ord-001.jpg)

//     if (paymentMethod === "bank_transfer" && req.file) {
//       const tempPath = req.file.path; // 👈 Path ชั่วคราว (เช่น 'uploads/e-slips/12345-temp.jpg')
//       const targetDir = req.file.destination; // 👈 Folder ปลายทาง ('uploads/e-slips')

//       const fileExt = path.extname(req.file.originalname); // 👈 นามสกุล (เช่น '.jpg')
//       const newFileName = `${newOrderId}${fileExt}`; // 👈 ชื่อไฟล์ใหม่ (เช่น 'ord-001.jpg')

//       // 👈 สร้าง path ปลายทางที่สมบูรณ์ (เช่น 'uploads/e-slips/ord-001.jpg')
//       const newPath = path.join(targetDir, newFileName);

//       // 👈 ย้ายและเปลี่ยนชื่อไฟล์ จาก tempPath ไปยัง newPath
//       fs.renameSync(tempPath, newPath);

//       // 👈 เราจะเก็บ *แค่ชื่อไฟล์* (ord-001.jpg) ไว้ใน DB
//       slipImagePath = newFileName;
//     }
//     // ==========================================================
//     // 📌 สิ้นสุดการแก้ไข
//     // ==========================================================

//     // 4. แปลงข้อมูลตะกร้าสำหรับเก็บใน Order
//     // const orderItems = cartItems.map((item) => ({
//     //   product: item.product._id,
//     //   product_name: item.product.product_name,
//     //   product_price: item.product.product_price,
//     //   quantity: item.quantity,
//     // }));
//     const orderItems = cartItems.map((item) => {
//       // 📌 4.1 (สำคัญ) ตรวจสอบว่ามีของพอหรือไม่
//       if (!item.product || item.product.stock_qty < item.quantity) {
//         throw new Error(
//           `สินค้า '${item.product.product_name}' มีไม่เพียงพอ (คงเหลือ: ${item.product.stock_qty} ชิ้น)`
//         );
//       }
//       return {
//         product: item.product._id,
//         product_name: item.product.product_name,
//         product_price: item.product.product_price,
//         quantity: item.quantity,
//       };
//     });

//     // 5. สร้าง Order ใหม่
//     const newOrder = new Order({
//       order_id: newOrderId,
//       customer: userId,
//       items: orderItems,
//       shippingAddress: JSON.parse(shippingAddress), // ข้อมูลมาจาก FormData
//       subtotal: parseFloat(subtotal),
//       shippingFee: parseFloat(shippingFee),
//       vat: parseFloat(vat),
//       total: parseFloat(total),
//       paymentMethod: paymentMethod,
//       paymentStatus: paymentMethod === "cod" ? "cod" : "pending",
//       paymentDetails:
//         paymentMethod === "bank_transfer"
//           ? // 📌 (จุดนี้ถูกต้องแล้ว) slipImagePath จะเป็น "ord-001.jpg"
//             { ...JSON.parse(paymentDetails), slipImage: slipImagePath }
//           : null,
//     });

//     await newOrder.save({ session });

//     const stockUpdates = orderItems.map((item) => ({
//       updateOne: {
//         filter: { _id: item.product }, // ค้นหาสินค้า
//         update: { $inc: { stock_qty: -item.quantity } }, // $inc เพื่อลบจำนวน (atomic)
//       },
//     }));

//     // สั่ง .bulkWrite เพื่ออัปเดตทั้งหมดในครั้งเดียว
//     await Product.bulkWrite(stockUpdates, { session });

//     // 6. (สำคัญมาก) ล้างตะกร้าสินค้า
//     await CartItem.deleteMany({ user: userId });

//     await session.commitTransaction();

//     res.status(201).json({ message: "สร้างคำสั่งซื้อสำเร็จ", order: newOrder });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     // ลบไฟล์ slip ที่อัปโหลดมา ถ้าเกิด error
//     if (req.file) {
//       // 📌 แก้ไขเล็กน้อย: ถ้า fs.renameSync ล้มเหลว path เก่า (tempPath) อาจยังอยู่
//       // แต่ถ้า rename สำเร็จแล้ว error เกิดทีหลัง path ใหม่ (newPath) อาจจะค้าง
//       // แต่โค้ดเดิมของคุณ (fs.unlinkSync(req.file.path)) ก็เพียงพอต่อการจัดการ error ส่วนใหญ่แล้ว
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(500).json({ message: "Server error" });
//   } finally {
//     session.endSession();
//   }
// };

// controllers/orderController.js
const Order = require("../models/order.model");
const CartItem = require("../models/cart.model");
const Counter = require("../models/counter.model");
const Product = require("../models/product.model"); // 📌 1. Import โมเดล Product
const mongoose = require("mongoose"); // 📌 2. Import Mongoose
const fs = require("fs");
const path = require("path");

// --- ฟังก์ชัน Helper สำหรับสร้าง Order ID (อัปเดตให้รับ session) ---
async function getNextOrderId(session) {
  const counter = await Counter.findByIdAndUpdate(
    "orderId",
    { $inc: { seq: 1 } },
    { new: true, upsert: true, session: session } // 👈 เพิ่ม session
  );
  // 'ord-' ตามด้วยเลข 3 หลัก เช่น 001, 002
  const orderId = `ord-${String(counter.seq).padStart(3, "0")}`;
  return orderId;
}

// --- ฟังก์ชันหลักในการสร้าง Order (อัปเดตให้ใช้ Transaction) ---
exports.createOrder = async (req, res) => {
  // 📌 3. เริ่ม Transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const {
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingFee,
      vat,
      subtotal,
      total,
    } = req.body;

    // 1. ดึงตะกร้าสินค้า (เพิ่ม .session() และ .populate())
    const cartItems = await CartItem.find({ user: userId })
      .populate("product") // 👈 populate product เพื่อเช็คสต็อก
      .session(session); // 👈 เพิ่ม session

    if (cartItems.length === 0) {
      throw new Error("ตะกร้าสินค้าว่างเปล่า");
    }

    // 2. สร้าง Order ID (ส่ง session เข้าไป)
    const newOrderId = await getNextOrderId(session);

    // 3. (ถ้าโอนเงิน) จัดการไฟล์ Slip (เหมือนเดิม)
    let slipImagePath = null;
    if (paymentMethod === "bank_transfer" && req.file) {
      // ... (โค้ดจัดการไฟล์ Slip ของคุณ) ...
      const tempPath = req.file.path;
      const targetDir = req.file.destination;
      const fileExt = path.extname(req.file.originalname);
      const newFileName = `${newOrderId}${fileExt}`;
      const newPath = path.join(targetDir, newFileName);
      fs.renameSync(tempPath, newPath);
      slipImagePath = newFileName;
    }

    // 4. แปลงข้อมูลตะกร้า และ "ตรวจสอบสต็อก"
    const orderItems = cartItems.map((item) => {
      // 📌 4.1 (สำคัญ) ตรวจสอบว่ามีของพอหรือไม่
      if (!item.product || item.product.stock_qty < item.quantity) {
        throw new Error(
          `สินค้า '${item.product.product_name}' มีไม่เพียงพอ (คงเหลือ: ${item.product.stock_qty} ชิ้น)`
        );
      }
      return {
        product: item.product._id,
        product_name: item.product.product_name,
        product_price: item.product.product_price,
        quantity: item.quantity,
      };
    });

    // 5. สร้าง Order ใหม่
    const newOrder = new Order({
      order_id: newOrderId,
      customer: userId,
      items: orderItems,
      shippingAddress: JSON.parse(shippingAddress),
      subtotal: parseFloat(subtotal),
      shippingFee: parseFloat(shippingFee),
      vat: parseFloat(vat),
      total: parseFloat(total),
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "cod" : "pending",
      paymentDetails:
        paymentMethod === "bank_transfer"
          ? { ...JSON.parse(paymentDetails), slipImage: slipImagePath }
          : null,
    });

    // 5.1 บันทึก Order (เพิ่ม { session })
    await newOrder.save({ session });

    // 📌 6. (ใหม่) อัปเดตสต็อกสินค้า (ตัดสต็อก)
    // สร้าง array ของ operation ที่จะทำ
    const stockUpdates = orderItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product }, // ค้นหาสินค้า
        update: { $inc: { stock_qty: -item.quantity } }, // $inc เพื่อลบจำนวน (atomic)
      },
    }));

    // สั่ง .bulkWrite เพื่ออัปเดตทั้งหมดในครั้งเดียว
    await Product.bulkWrite(stockUpdates, { session });

    // 7. ล้างตะกร้าสินค้า (เพิ่ม { session })
    await CartItem.deleteMany({ user: userId }, { session });

    // 📌 8. (สำคัญ) ถ้าทุกอย่างสำเร็จ ให้ Commit Transaction
    await session.commitTransaction();

    res.status(201).json({ message: "สร้างคำสั่งซื้อสำเร็จ", order: newOrder });
  } catch (error) {
    // 📌 9. (สำคัญ) ถ้ามี Error ให้ Abort Transaction (Rollback)
    await session.abortTransaction();

    console.error("Error creating order (Transaction rolled back):", error);
    // ลบไฟล์ slip ที่อัปโหลดมา ถ้าเกิด error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    // ส่ง message ของ error กลับไป (เช่น "สินค้า...มีไม่เพียงพอ")
    res.status(500).json({ message: error.message || "Server error" });
  } finally {
    // 📌 10. (สำคัญ) จบ Session เสมอ
    session.endSession();
  }
};
