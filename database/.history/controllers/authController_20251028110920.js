// var express = require("express");
// var router = express.Router();
// var userSchema = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const register = async (req, res) => {

//   try{

//   }
//   const { username, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({ username, password: hashedPassword, role });
//   await newUser.save();
//   res.status(201).json({message: `User Registered with ${username} !!`});
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;
// };

// module.exports = {
//   register,
//   login,
// };

const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Auth = require("../models/auth.model");
const userSchema = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { name, last_name, username, password, sex, age, role } = req.body;

    if (!username || !password || !name || !last_name) {
      return res
        .status(400)
        .json({ message: "โปรดกรอก Username, Name, LastName หรือ Password!!" });
    }

    const userExists = await userSchema.findOne({ username });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Username นี้มีการใช้งานแล้ว :-)" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
      name,
      last_name,
      sex,
      age,
      username,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: `สมัครเสร็จสิ้น ยินดีต้อนรับ ${username} !!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "กรุณากรอก Username หรือ Password ให้ถูกต้อง :-{" });
    }

    const user = await userSchema.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Username ไม่ถูกต้อง XD" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password ไม่ถูกต้อง :-P" });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // }
  );

    res.status(200).json({
      // _id: user._id,
      // name: user.name,
      // username: user.username,
      // role: user.role,
      // token: token,
      // _id: user._id,

      // name: user.name,
      // last_name: user.last_name,

      name: `${user.name} ${user.last_name}`,
      username: user.username,
      sex: user.sex,
      age: user.age,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
