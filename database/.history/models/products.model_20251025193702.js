const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  product_sku: { type: String },
  product_name: { type: String },
  product_description: { type: String },
});
