const Product = require("../../models/Product");
const Error = require("../../utils/errResponse");

// Create new Product
exports.createProduct = async (req, res, next) => {
  //res.status(200).json({file:req.files, body:req.body});

  // console.log(req);
  const { name, price, quantity, description, category, inStock } = req.body;
  let productPhotos = [];

  if (req.files && req.files.length > 0) {
    productPhotos = req.files.map((file) => {
      return { img: file.location };
    });
  }

  const _product = new Product({
    name,
    price,
    inStock,
    quantity,
    description,
    category,
    productPhotos,
    createdBy: req.user._id,
  });

  try {
    await _product.save();
    return res.status(200).json({ success: true, product: _product });
  } catch (err) {
    next(err);
  }
};

// Get All Products
exports.getAllProducts = async (req, res, next) => {
  try {
    const _allProducts = await Product.find({ createdBy: req.user._id });
    if (!_allProducts) {
      return next(new Error("No products found", 204));
    }

    return res.status(200).json({ success: true, products: _allProducts });
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
      console.log("hey");
      return next(new Error("Product Not found", 204));
    }
    return res.status(200).json({ success: true, product: _product });
  } catch (err) {
    next(err);
  }
};

// Edit Product by ID
exports.editProduct = async (req, res, next) => {
  const { name, price, quantity, description, category, inStock } = req.body;
  let productPhotos = [];

  if (req.files && req.files.length > 0) {
    productPhotos = req.files.map((file) => {
      return { img: file.location };
    });
  }
  const { productId } = req.params;

  const query = { _id: productId };

  const _product = {
    name,
    price,
    quantity,
    description,
    category,
    inStock,
    productPhotos,
  };

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      query,
      { $set: _product },
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return next(new Error("Product not found", 204));
    }
    return res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    next(err);
  }
};

// Delete Product
exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  const query = { _id: productId };
  try {
    await Product.findOneAndDelete(query);
    return res.status(200).json({ success: true, msg: "Product Deleted" });
  } catch (err) {
    next(err);
  }
};
