const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/add-product", async (req, res) => {
  const { name, price, image, description } = req.body;

  const newProduct = new Product({ name, price, image, description });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
