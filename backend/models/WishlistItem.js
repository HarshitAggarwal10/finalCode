const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
});

module.exports = mongoose.model("WishlistItem", wishlistItemSchema);
