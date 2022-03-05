const Error = require("../../utils/errResponse");

const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");

exports.addOrder = async (req, res, next) => {
  const user = req.user._id;
  try {
    const result = await Cart.deleteOne({ user: user });
    if (result.deletedCount > 0) {
      // Cart deleted Successfully
      req.body.user = user;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];
      const _order = new Order(req.body);
      const order = await _order.save();
      if (order) {
        return res.status(201).json({ sucess: true, order });
      } else {
        return new Error("Order failed", 400);
      }
    } else {
      return new Error("Cart Not found", 401);
    }
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  const user = req.user._id;
  try {
    const order = await Order.find({ user: req.user._id })
      .select("_id paymentStatus paymentType orderStatus items")
      .populate("items.productId", "_id name productPhotos")
      .populate("items.sellerId", "_id firstName");
    if (order) {
      return res.status(200).json({ success: true, order });
    } else {
      return new Error("Order is not found", 401);
    }
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  const { orderId } = req.body;
  const user = req.user._id;
  try {
    const order = await Order.findOne({ _id: req.body.orderId })
      .populate("items.productId", "_id name productPhotos")
      .populate("items.sellerId", "_id firstName ")
      .lean();
    if (order) {
      const address = await Address.findOne({
        user: user,
      });
      if (address) {
        order.address = address.address.find(
          (adr) => adr._id.toString() == order.addressId.toString()
        );
        return res.status(200).json({
          success: true,
          order,
        });
      }
    } else {
      return new Error("Order is not found");
    }
  } catch (error) {
    next(error);
  }
};
