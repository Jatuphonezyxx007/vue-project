var express = require("express");
var router = express.Router();
var User = require("../models/user.model");
var Information = require("../models/information.model"); // อย่าลืมสร้างไฟล์นี้ตามที่คุยกันก่อนหน้า
var Role = require("../models/role.model"); // อย่าลืมสร้างไฟล์นี้ตามที่คุยกันก่อนหน้า
const multer = require("multer");
const bcrypt = require("bcrypt");

const upload = multer();

// Get All Users (พร้อมข้อมูล Information)
router.get("/", async function (req, res, next) {
  try {
    // ดึง User ทั้งหมดและ join ข้อมูล role ออกมาด้วย
    let users = await User.find({ deleted_at: null }).populate("role_id");
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Register / Create User
router.post("/", upload.none(), async function (req, res, next) {
  try {
    // 1. รับค่าจาก Request (Postman)
    // หมายเหตุ: ใน Postman ให้ส่ง key ว่า 'password' เหมือนเดิมได้เลย โค้ดจะแปลงเป็น 'pwd' ให้เอง
    let {
      username,
      password, // รับค่า password
      email,
      phone,
      name, // ชื่อจริง (จะไปลงตาราง informations)
      last_name, // นามสกุล (จะไปลงตาราง informations)
      bod, // วันเกิด (YYYY-MM-DD)
      role_id, // ถ้ามี (ถ้าไม่มีระบบจะตั้งเป็น default user)
    } = req.body;

    // 2. ตรวจสอบว่ามี Username หรือ Email ซ้ำไหม
    let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username หรือ Email นี้มีการใช้งานแล้ว" });
    }

    // 3. ตรวจสอบ Role (ถ้าไม่ได้ส่ง role_id มา จะหา Role ที่ชื่อ 'user' ให้)
    if (!role_id) {
      let defaultRole = await Role.findOne({ role_name: "user" });
      // ถ้ายังไม่มี Role ในระบบเลย ให้สร้างใหม่แก้ขัดไปก่อน
      if (!defaultRole) {
        defaultRole = await Role.create({
          role_name: "user",
          role_description: "General User",
        });
      }
      role_id = defaultRole._id;
    }

    // 4. สร้างข้อมูล User (ส่วน Login)
    let newUser = new User({
      username: username,
      email: email,
      phone: phone,
      pwd: await bcrypt.hash(password, 10), // Hash password เก็บลง pwd
      role_id: role_id,
    });
    const savedUser = await newUser.save(); // บันทึกลง DB และจะได้ _id กลับมา

    // 5. สร้างข้อมูล Information (ส่วนข้อมูลส่วนตัว) โดยใช้ _id จากข้อ 4
    if (name || last_name) {
      let newInfo = new Information({
        user_id: savedUser._id, // ผูก Foreign Key
        first_name: name,
        last_name: last_name,
        birth_day: bod || null,
      });
      await newInfo.save();
    }

    res.status(201).json({
      message: "สร้างบัญชีผู้ใช้สำเร็จ",
      data: {
        _id: savedUser._id,
        username: savedUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาด!", error: error.message });
  }
});

module.exports = router;
