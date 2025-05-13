const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, price, image, description, sellerId } = req.body;
  try {
    const product = new Product({ name, price, image, description, sellerId });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Could not add product' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch products' });
  }
};
