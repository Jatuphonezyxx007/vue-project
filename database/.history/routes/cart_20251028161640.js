const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const checkAuth = require("../middleware/auth.middleware");

router.post("/add", checkAuth, cartController.addToCart);

router.get("/", checkAuth, cartController.getCart);

router.put("/:id", checkAuth, cartController.updateCartItem);

router.delete("/:id", checkAuth, cartController.removeCartItem);

module.exports = router;
