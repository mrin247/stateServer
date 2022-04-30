// ! Razorpay
const Razorpay = require("razorpay");

// ! Razorpay

exports.createRazorpayOrder = (res, amount) => {
  const instance = new Razorpay({
    key_id: "rzp_test_tHI8HRFAFNYymj",
    key_secret: "esOVw7hvgjSXXiZDb7UWa8bP",
  });

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(order);
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
