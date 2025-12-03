// models/order.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    order_id: { type: String, required: true, unique: true }, // เช่น ord-001
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "product" },
        product_name: { type: String, required: true },
        product_price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine: { type: String, required: true },
      province: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    subtotal: { type: Number, required: true }, // ราคาก่อนภาษี (ราคารวมสินค้า)
    shippingFee: { type: Number, required: true },
    vat: { type: Number, required: true }, // มูลค่าภาษี
    total: { type: Number, required: true }, // ยอดรวมสุทธิ

    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cod"],
      default: "pending",
    },
    // สำหรับการโอนเงิน
    paymentDetails: {
      bank: { type: String },
      refId: { type: String },
      amount: { type: Number },
      dateTime: { type: Date },
      slipImage: { type: String }, // path/to/ord-001.jpg
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
