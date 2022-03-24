const Error = require("../../utils/errResponse");

const Order = require("../../models/Order");
const Address = require("../../models/Address");

// exports.updateOrder = (req, res) => {
//   Order.updateOne(
//     { _id: req.body.orderId, "items.$.productId": req.body.itemId },
//     {
//       $set: {
//         "orderStatus.$": [
//           { type: req.body.type, date: new Date(), isCompleted: true },
//         ],
//       },
//     },
//     {
//       upsert: true,
//     }
//   ).exec((error, order) => {
//     if (error) return res.status(400).json({ error });
//     if (order) {
//       res.status(201).json({ order });
//     }
//   });
// };

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

exports.updateOrder = async (req, res, next) => {
  const { orderId, productId } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        "items.productId": productId,
      },
      {
        $set: {
          "items.$": [req.body],
        },
      },
      { new: true, upsert: true }
    );
    if (order) {
      res.status(200).json({ order });
    } else {
      return new Error("No order record found", 400);
    }
  } catch (error) {
    next(error);
  }
};
