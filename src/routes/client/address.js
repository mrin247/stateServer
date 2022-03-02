const express = require("express");
const { addAddress, getAddress } = require("../../controllers/client/address");

const { isAuthenticated, isClient } = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/client/address/create", isAuthenticated, isClient, addAddress);
router.get("/client/address/getaddress", isAuthenticated, isClient, getAddress);

module.exports = router;
