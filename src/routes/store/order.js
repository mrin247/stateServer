const {
  updateOrder,
  getCustomerOrders,
} = require("../../controllers/store/order");
const {
  isAuthenticated,
  isClient,
  isStore,
} = require("../../middlewares/authenticate");

const router = require("express").Router();

router.post("/store/order/updateorder", isAuthenticated, isStore, updateOrder);
router.get(
  "/store/order/getorders",
  isAuthenticated,
  isStore,
  getCustomerOrders
);

module.exports = router;
