const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prefix: { type: String, enum: ["นาย", "นาง", "นางสาว"], default: "นาย" },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    sex: { type: String, enum: ["ชาย", "หญิง"], default: "ชาย" },
    birth_day: { type: Date, default: null },
    profile_image: { type: String, default: "" }, // เก็บ URL หรือ Path ของรูปภาพ
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Information", schema);
