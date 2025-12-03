var express = require("express");
var router = express.Router();
var userSchema = require("../models/user.model");
const { Query } = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");

const upload = multer();

// All Users
router.get("/", async function (req, res, next) {
  try {
    let users = await userSchema.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Add User
// name: { type: String, required: true },
// last_name: { type: String, required: true },
// email: { type: String, required: true },
// phone: { type: String, required: true },
// bod: { type: Date, required: true },
// username: { type: String, required: true },
// password: { type: String, required: true },
// role: { type: String, enum: ["admin", "user"], default: "user" },

// router.post("/", upload.none(), async function (req, res, next) {
//   try {
//     let { name, last_name, email, phone, bod, username, password, role } =
//       req.body;

//     let existingUser = await userSchema.findOne({ username: username });

//     if (existingUser) {
//       return res.status(400).json({ message: "Username นี้มีการใช้งานแล้ว" });
//     }

//     let user = new userSchema({
//       name: name,
//       last_name: last_name,
//       email: email,
//       phone: phone,
//       username: username,
//       password: await bcrypt.hash(password, 10),
//       role: role || "user",
//     });
//     await user.save();
//     res.status(201).json({ message: "add user successfully!!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error!" });
//   }
// });
router.post("/", upload.none(), async function (req, res, next) {
  try {
    let {
      name,
      last_name,
      email,
      phone,
      bod,
      username,
      password,
      role,
      user_image,
    } = req.body;

    // 2. ใช้ Model ("User") ในการค้นหา
    let existingUser = await userSchema.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ message: "Username นี้มีการใช้งานแล้ว" });
    }

    // 3. ใช้ Model ("User") ในการสร้าง
    let user = new userSchema({
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
      bod: bod, // <-- 4. [สำคัญ] เพิ่มบรรทัดนี้เข้าไป
      username: username,
      password: await bcrypt.hash(password, 10),
      role: role || "user",
      user_image
    });

    await user.save();
    res.status(201).json({ message: "add user successfully!!" });
  } catch (error) {
    console.error(error);
    // ถ้า bod ผิด format หรือขาดไป Mongoose จะโยน Error มาที่นี่
    res.status(500).json({ message: "Error!", error: error.message });
  }
});

module.exports = router;
