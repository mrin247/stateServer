const {
  addOrder,
  getOrders,
  getOrder,
} = require("../../controllers/client/order");
const { isAuthenticated, isClient } = require("../../middlewares/authenticate");

const router = require("express").Router();

router.post("/client/order/addorder", isAuthenticated, isClient, addOrder);
router.get("/client/order/getorders", isAuthenticated, isClient, getOrders);
router.get("/client/order/getorder", isAuthenticated, isClient, getOrder);

module.exports = router;
