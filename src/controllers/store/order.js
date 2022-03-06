const Error = require("../../utils/errResponse");

const Order = require("../../models/Order");
const Address = require("../../models/Address");

exports.updateOrder = async (req, res, next) => {
  const { orderId, type } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { _id: orderId, "orderStatus.type": type },
      {
        $set: {
          "orderStatus.$": [
            { type: type, date: new Date(), isCompleted: true },
          ],
        },
      },
      { upsert: true, new: true }
    );
    if (order) {
      console.log(order);
      return res.status(201).json({ sucess: true, order });
    } else {
      return new Error("Order Update failed", 400);
    }
  } catch (error) {
    next(error);
  }
};

exports.getCustomerOrders = async (req, res, next) => {
  const sellerId = req.user._id;
  try {
    const orders = await Order.find({ "items.sellerId": sellerId }).populate(
      "items.productId",
      "name"
    );

    if (orders) {
      res.status(200).json({ orders });
    } else {
      return new Error("No order record found", 400);
    }
  } catch (error) {
    next(error);
  }
};
