// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Import Cart model
const Product = require('../models/Product'); // Import Product model
const User = require('../models/User'); // Import User model

// Add product to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId } = req.body;
console.log("Received:", userId, productId);
    // Check if the user and product exist
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    // Check if a cart already exists for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        products: [productId] // Add product to the cart initially
      });
      await cart.save();
      return res.status(200).json({ message: 'New cart created and product added', cart });
    }

    // Add the product to the user's existing cart
    cart.products.push(productId);
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// backend/routes/cartRoutes.js

router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the product exists in the cart
    const productIndex = cart.products.indexOf(productId);
    if (productIndex === -1) {
      return res.status(400).json({ message: 'Product not found in cart' });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);
    await cart.save();

    res.json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
