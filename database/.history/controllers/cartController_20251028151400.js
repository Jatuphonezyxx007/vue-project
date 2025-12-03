const CartItem = require("../models/cart.model");

exports.addToCart = async (req, res) => {
  try {
    // req.user.id มาจาก 'checkAuth' middleware
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "กรุณาส่ง productId และ quantity" });
    }

    // ค้นหาว่ามีสินค้านี้ในตะกร้าของ user นี้หรือยัง
    let cartItem = await CartItem.findOne({ user: userId, product: productId });

    if (cartItem) {
      // ถ้ามี -> อัปเดตจำนวน
      cartItem.quantity += parseInt(quantity, 10);
    } else {
      // ถ้าไม่มี -> สร้างรายการใหม่
      cartItem = new CartItem({
        user: userId,
        product: productId,
        quantity: parseInt(quantity, 10),
      });
    }

    await cartItem.save();
    res
      .status(200)
      .json({ message: "เพิ่มสินค้าลงตะกร้าสำเร็จ", data: cartItem });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // มาจาก middleware
    const cartItems = await CartItem.find({ user: userId }).populate("product"); // .populate เพื่อดึงข้อมูลสินค้ามาด้วย

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
