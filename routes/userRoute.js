const express = require("express");
const router = express.Router();
const {
  createUserData,
  getUserData,
  updateUserData,
  deleteUser,
  loginController,
  generateOtp,
  compareOtp,
  passwordReset,
} = require("../controllers/userController");

router.post("/user/add", createUserData);
router.get("/user/get", getUserData);
router.put("/user/update", updateUserData);
router.delete("/user/delete", deleteUser);

router.get("/user/login", loginController);
router.post("/user/generateOtp", generateOtp);
router.get("/user/compareOtp", compareOtp);
router.post("/user/resetPassword", passwordReset);

module.exports = router;
