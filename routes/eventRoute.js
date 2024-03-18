const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const upload = require("../Multer");

const {
  eventcontroller,
  getOneEventData,
  getEventsData,
  putEventData,
  deleteEventData,
  moviePublished,
} = require("../controllers/eventController");

router.post(
  "/event/add",
  upload.single("poster"),
  verifyToken,
  eventcontroller
);

router.get("/event/getOne", verifyToken, getOneEventData);
router.get("/event/get", verifyToken, getEventsData);

router.put("/event/update", upload.single("poster"), verifyToken, putEventData);
router.delete("/event/delete", verifyToken, deleteEventData);
router.get("/event/published/:_id", verifyToken, moviePublished);

module.exports = router;
