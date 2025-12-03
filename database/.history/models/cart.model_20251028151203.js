const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
 
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "product", 
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
