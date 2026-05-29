const express = require("express");

const Cart = require("../models/Cart");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// ADD TO CART
router.post("/", protect, async (req, res) => {

  try {

    const { product, quantity } = req.body;

    const cartItem = await Cart.create({
      user: req.user.id,
      product,
      quantity,
    });

    res.status(201).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET USER CART
router.get("/", protect, async (req, res) => {

  try {

    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// REMOVE CART ITEM
router.delete("/:id", protect, async (req, res) => {

  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed from cart",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

  router.get("/", protect, async (req, res) => {
  try {

    const cartItems = await Cart.find({ user: req.user.id })
      .populate("product");

    res.json(cartItems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


});

module.exports = router;