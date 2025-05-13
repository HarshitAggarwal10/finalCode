const express = require('express');
const { addToCart, addToWishlist, getCart, getWishlist } = require('../controllers/userController');
const router = express.Router();

router.post('/cart', addToCart);
router.post('/wishlist', addToWishlist);
router.get('/cart/:id', getCart);
router.get('/wishlist/:id', getWishlist);

module.exports = router;
