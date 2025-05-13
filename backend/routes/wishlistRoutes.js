// backend/routes/wishlistRoutes.js

const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Add Product to Wishlist
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ userId });

    // If no wishlist exists, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [productId]
      });
    } else {
      // If wishlist exists, add the product if not already there
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    res.json({
      message: 'Product added to wishlist',
      wishlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove Product from Wishlist
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Check if the product exists in the wishlist
    const productIndex = wishlist.products.indexOf(productId);
    if (productIndex === -1) {
      return res.status(400).json({ message: 'Product not found in wishlist' });
    }

    // Remove the product from the wishlist
    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    res.json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
