const address = require("../../models/Address");
const UserAddress = require("../../models/Address");
const Error = require("../../utils/errResponse");

exports.addAddress = async (req, res, next) => {
  const { payload } = req.body;
  try {
    if (payload.address) {
      if (payload.address._id) {
        // Update Address
        const updatedAddress = await UserAddress.findOneAndUpdate(
          { user: req.user._id, "address._id": payload.address._id },
          {
            $set: {
              "address.$": payload.address,
            },
          },
          { new: true }
        );
        if (updatedAddress) {
          return res.status(201).json({ sucess: true, updatedAddress });
        } else {
          return next(new Error("Invalid Credentials", 401));
        }
      } else {
        // New Address
        const newAddress = await UserAddress.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              address: payload.address,
            },
          },
          { new: true, upsert: true }
        );
        if (newAddress) {
          return res.status(201).json({ sucess: true, newAddress });
        } else {
          return next(new Error("Invalid Credentials", 401));
        }
      }
    } else {
      return next(new Error("Params Address Required", 400));
    }
  } catch (error) {
    next(error);
  }
};

exports.getAddress = async (req, res, next) => {
  try {
    const addresses = await UserAddress.findOne({ user: req.user._id });
    if (addresses) {
      return res.status(200).json({ sucess: true, addresses });
    } else {
      return next(new Error("No addresses found", 400));
    }
  } catch (error) {
    next(error);
  }
};
