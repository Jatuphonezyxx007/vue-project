const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    last_name: { type: String },
    email: { type: String },
    sex: { type: String },
    age: { type: Number },
    username: { type: String },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
