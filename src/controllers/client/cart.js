const Cart = require("../../models/Cart");
const Error = require("../../utils/errResponse");

function runUpdate(condition, updateData) {
  return new Promise(async (resolve, reject) => {
    //you update code here
    try {
      const updatedCart = await Cart.findOneAndUpdate(condition, updateData, {
        upsert: true,
        new: true,
      });
      if (updatedCart) resolve(updatedCart);
    } catch (error) {
      reject(error);
    }
  });
}

exports.addItemToCart = async (req, res) => {
  const { seller, cartItems } = req.body;
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      let promiseArray = [];

      cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);

        let condition, update;
        if (item) {
          condition = {
            user: userId,
            "cartItems.product": product,
          };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: userId };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
      });
      try {
        const updatedCart = await Promise.all(promiseArray);

        if (updatedCart) {
          res.status(201).json({ updatedCart });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
    } else {
      //if cart not exist then create a new cart
      const _cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      try {
        newCart = await _cart.save();
        if (newCart) {
          return res.status(201).json({ newCart });
        }
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productPhotos")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
  //}
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
