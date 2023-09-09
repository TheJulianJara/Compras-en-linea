const Product = require('../models/products');
const utilities = require('../utils/utilities');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select('-_id -__v');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    id: await utilities.generateID()
  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const product = await Product.findOne({ id: req.params.id }).select('-_id -__v');

  if (product == null) {
    return res.status(404).json({ message: 'Cannot find product' });
  } else {
    return res.status(200).json(product);
  }
};

exports.updateProductById = async (req, res) => {

  const id = req.params.id;
  const product = req.body;

  console.log(product);
  console.log(id);

  try {
    await Product.findOneAndUpdate({ id }, product, { new: false }).then(() => {
      return res.status(200).json({ message: 'Product updated' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    await Product.deleteOne({ id: req.params.id }).then(() => {
      return res.status(204).json({ message: 'Product deleted' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
