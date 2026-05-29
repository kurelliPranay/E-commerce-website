const express = require("express");

const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");

const { protect } = require("../middleware/authMiddleware");


// PLACE ORDER
router.post("/", protect, async (req, res) => {

  try {

    const cartItems = await Cart.find({
      user: req.user.id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const items = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const totalPrice = cartItems.reduce(
      (acc, item) =>
        acc + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items,
      totalPrice,
    });

    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET MY ORDERS
router.get("/", protect, async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user.id,
    }).populate("items.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;