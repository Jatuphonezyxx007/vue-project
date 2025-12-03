const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    role_name: { type: String, required: true },
    role_description: { type: String, default: "" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // แมพชื่อ field ให้ตรงตามที่คุณต้องการ
  }
);

module.exports = mongoose.model("Role", schema);
