const User = require('../models/User');

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  if (!user.cart.includes(productId)) {
    user.cart.push(productId);
    await user.save();
  }
  res.json(user.cart);
};

exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }
  res.json(user.wishlist);
};

exports.getCart = async (req, res) => {
  const user = await User.findById(req.params.id).populate('cart');
  res.json(user.cart);
};

exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.params.id).populate('wishlist');
  res.json(user.wishlist);
};
