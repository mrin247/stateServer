const Error = require("../../utils/errResponse");

const Order = require("../../models/Order");
const Address = require("../../models/Address");

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

exports.getCustomerOrders = async (req, res, next) => {
  const sellerId = req.user._id;
  try {
    const orders = await Order.find({ "items.sellerId": sellerId })
      .select("items _id")
      .populate("items.productId", "name");

    if (orders) {
      let itemArray = [];
      orders.map((order) => {
        const id = order._id;

        order.items.map((items) => {
          //items={...items,orderId:order._id}
          //const orderIds={orderId:order._id};
          //Object.assign(items,orderIds);
          items._id = id;

          itemArray.push(items);
        });
      });
      res.status(200).json({ orders: itemArray });
    } else {
      return new Error("No order record found", 400);
    }
  } catch (error) {
    next(error);
  }
};
