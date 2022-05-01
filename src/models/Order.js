const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress.address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        sellerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        payablePrice: {
          type: Number,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
        orderStatus: [
          {
            type: {
              type: String,
              enum: ["ordered", "packed", "shipped", "delivered"],
              default: "ordered",
            },
            date: {
              type: Date,
            },
            isCompleted: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "inProcess", "completed", "cancelled", "refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["COD", "EPAY"],
      required: true,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
