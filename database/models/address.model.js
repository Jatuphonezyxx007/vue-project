const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    info_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Information",
      required: true,
    },
    name: { type: String, required: true }, // ชื่อผู้รับ หรือชื่อสถานที่
    phone: { type: String, required: true },
    house_no: { type: String, default: "" },
    village_no: { type: String, default: "" },
    strees: { type: String, default: "" }, // ใช้ชื่อตามที่คุณระบุ (strees)
    sub_district: { type: String, required: true }, // ตำบล/แขวง
    district: { type: String, required: true }, // อำเภอ/เขต
    province: { type: String, required: true }, // จังหวัด
    zipcode: { type: String, required: true },
    tag: { type: String, enum: ["บ้าน", "ที่ทำงาน", "อื่นๆ"], default: "บ้าน" },
    isMain: { type: Boolean, default: false }, // ตั้งเป็นที่อยู่หลักหรือไม่
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Address", schema);
