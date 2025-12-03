// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "Access denied: admin only" });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };
// middleware/auth.js (แก้ไข)

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

//     req.user = decoded;

//     const isAdminRoute =
//       req.baseUrl.includes("/users") || req.baseUrl.includes("/products");

//     if (isAdminRoute && decoded.role !== "admin") {
//       return res.status(403).json({ message: "Access denied: admin only" });
//     }

//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };
// middleware/auth.js

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "ไม่มี token, การยืนยันตัวตนไม่สำเร็จ" });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token อยู่ในรูปแบบที่ไม่ถูกต้อง" });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token ไม่พร้อมใช้งาน" });
  }
};
