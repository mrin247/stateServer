// ! Razorpay
const Razorpay = require("razorpay");
const Cart = require("../models/Cart");
const Error = require("../utils/errResponse");

const Order = require("../models/Order");
const env = require("dotenv").config();

// ! Razorpay

exports.createRazorpayOrder = async (req, res, amount, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, async function (err, order) {
    if (err) {
      return res.status(500).json(err);
    }
    //console.log(order.id);
    const user = req.user._id;
    req.body.paymentId = order.id;
    //console.log("mrin body", req.body);
    try {
      const result = await Cart.deleteOne({ user: user });
      if (result.deletedCount > 0) {
        // Cart deleted Successfully
        req.body.user = user;
        req.body.items.map((item) => {
          item.orderStatus = [
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
        });

        const _order = new Order(req.body);
        const newOrder = await _order.save();
        if (newOrder) {
          return res.status(200).json(order);
        } else {
          return new Error("Order failed", 400);
        }
      } else {
        return new Error("Cart Not found", 401);
      }
    } catch (error) {
      next(error);
    }

    //return res.status(200).json(order);
  });
};

// const instance = new Razorpay({
//   key_id: "rzp_test_tHI8HRFAFNYymj",
//   key_secret: "esOVw7hvgjSXXiZDb7UWa8bP",
// });

// app.get("/api/e-order/:sample_orderId", (req, res) => {
//   const { sample_orderId } = req.params;
//   const products = {
//     name: "sample 1",
//     price: 10,
//     qty: 1,
//   };
//   var options = {
//     amount: products.price * 100, // amount in the smallest currency unit
//     currency: "INR",
//     receipt: "order_rcptid_11",
//     notes: products.name,
//   };
//   instance.orders.create(options, function (err, order) {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     console.log(order);
//     return res.status(200).json(order);
//   });
// });

// {
//   id: 'order_JPVZL9OeIVLkqn',
//   entity: 'order',
//   amount: 1000,
//   amount_paid: 0,
//   amount_due: 1000,
//   currency: 'INR',
//   receipt: 'order_rcptid_11',
//   offer_id: null,
//   status: 'created',
//   attempts: 0,
//   notes: [
//     's', 'a', 'm',
//     'p', 'l', 'e',
//     ' ', '1'
//   ],
//   created_at: 1651308724
// }

// ! Razorpay
