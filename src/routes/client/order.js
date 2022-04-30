const {
  addOrder,
  getOrders,
  getOrder,
  createPaymentOrder,
} = require("../../controllers/client/order");
const { isAuthenticated, isClient } = require("../../middlewares/authenticate");

const router = require("express").Router();

router.post("/client/order/addorder", isAuthenticated, isClient, addOrder);
router.get("/client/order/getorders", isAuthenticated, isClient, getOrders);
router.get("/client/order/getorder", isAuthenticated, isClient, getOrder);

router.get("/client/order/createPaymentOrder/:amount",isAuthenticated, isClient,createPaymentOrder);

module.exports = router;
