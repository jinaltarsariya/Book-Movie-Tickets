const express = require("express");
const router = express.Router();
let { verifyToken } = require("../middleware/verifyToken");

const {
  ticketController,
  getOneTicketData,
  getTicketsData,
  putTicketData,
  deleteTicketDdata,
} = require("../controllers/ticketController");

router.post("/ticket/add", verifyToken, ticketController);

router.get("/ticket/getOne", verifyToken, getOneTicketData);
router.get("/ticket/get", verifyToken, getTicketsData);

router.put("/ticket/update", verifyToken, putTicketData);
router.delete("/ticket/delete", verifyToken, deleteTicketDdata);

module.exports = router;
