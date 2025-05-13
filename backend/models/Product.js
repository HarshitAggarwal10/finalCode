const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: { type: String },
  name: String,
  price: Number,
  image: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);
