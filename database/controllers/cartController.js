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

// (ต่อจาก exports.getCart)

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.id; // ID ของ 'cartItem' ไม่ใช่ 'product'
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "จำนวนต้องอย่างน้อย 1" });
    }

    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: cartItemId, user: userId }, // ค้นหา item ที่ตรง และเป็นของ user นี้
      { $set: { quantity: parseInt(quantity, 10) } },
      { new: true } // สั่งให้ return document ที่อัปเดตแล้ว
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "ไม่พบสินค้าในตะกร้า" });
    }

    res.status(200).json({ message: "อัปเดตจำนวนสำเร็จ", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.id; // ID ของ 'cartItem'

    const deletedItem = await CartItem.findOneAndDelete({
      _id: cartItemId,
      user: userId, // ตรวจสอบว่าเป็นของ user นี้จริง
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "ไม่พบสินค้าในตะกร้า" });
    }

    res.status(200).json({ message: "ลบสินค้าออกจากตะกร้าสำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
