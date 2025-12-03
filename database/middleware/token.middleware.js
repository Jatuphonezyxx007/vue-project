const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Headers:", req.headers);
      return res
        .status(401)
        .json({ message: "Token ปฏิเสธ...นี่คือข้อมูลลับเฉพาะ!! อิอิ" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    console.log("decoded is:", req.user);

    next();
  } catch (err) {
    console.error("Token verify error:", err.message);
    return res.status(400).json({ message: "Token ไม่มีอ่า นอย!!" });
  }
};

module.exports = verifyToken;
