const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    pwd: { type: String, required: true }, // รหัสผ่าน (แนะนำให้ Hash ก่อนบันทึก)
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }, // เชื่อมกับตาราง Role
    deleted_at: { type: Date, default: null }, // สำหรับ Soft Delete
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", schema);
