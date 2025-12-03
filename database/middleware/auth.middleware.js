// middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    // 1. ดึง Token จาก Header ที่ Frontend ส่งมา
    //    (จะอยู่ในรูปแบบ "Bearer <token...>")
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "ไม่ได้รับอนุญาต (ไม่มี Token)" });
    }

    // 2. ถอดรหัส Token
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // 3. "แนบ" ข้อมูลผู้ใช้ (ที่เราเก็บไว้ใน payload ตอน login) ไปกับ req
    req.user = decodedPayload; // ตอนนี้ req.user จะมี { id: '...', role: '...' }

    // 4. ไปยัง Controller ถัดไป
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token ไม่ถูกต้อง หรือหมดอายุ" });
  }
};

module.exports = checkAuth;
