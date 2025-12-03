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
      required: true,
      trim: true,
    },
    product_description: {
      type: String,
      trim: true,
    },
    product_price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock_qty: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    product_images: [{ type: String, required: true }],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "draft",
    },
  },

  { timestamps: true }
);

module