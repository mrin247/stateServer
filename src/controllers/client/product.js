const Product = require("../../models/Product");
const Error = require("../../utils/errResponse");

exports.getAllProducts = async (req, res, next) => {
  try {
    const _allProducts = await Product.find();
    if (!_allProducts) {
      return next(new Error("No products found", 204));
    }
    return res.status(200).json({ success: true, products: _allProducts });
  } catch (err) {
    next(err);
  }
};

exports.getProductByCategory = async (req, res, next) => {
  const category = req.query.c;
  try {
    const _Products = await Product.find({ category: category });
    if (!_Products) {
      return next(new Error("No products found", 204));
    }

    return res.status(200).json({ success: true, products: _Products });
  } catch (err) {
    next(err);
  }
};

// Get Product by ID
exports.getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const _product = await Product.findOne({ _id: productId });
    if (!_product) {
      return next(new Error("Product Not found", 204));
    }
    return res.status(200).json({ success: true, product: _product });
  } catch (err) {
    next(err);
  }
};
