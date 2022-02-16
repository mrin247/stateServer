const Product = require("../../models/Product");
const Error = require("../../utils/errResponse");

exports.getProductByCategory = async (req, res, next) => {
  const category = req.query.c;
  try {
    const _allProducts = await Product.find({ category: category });
    if (!_allProducts) {
      return next(new Error("No products found", 204));
    }

    return res.status(200).json({ success: true, products: _allProducts });
  } catch (err) {
    next(err);
  }
};
