// models/counter.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: { type: String, required: true }, // เช่น 'orderId'
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model("counter", counterSchema);
