const express = require("express");
const router = express.Router();
let { verifyToken } = require("../middleware/verifyToken");

const {
  orderController,
  getOneOrderData,
  getOrdersData,
} = require("../controllers/orderController");

router.post("/order/add", verifyToken, orderController);
router.get("/order/getOne", getOneOrderData);
router.get("/order/get", getOrdersData);

module.exports = router;
