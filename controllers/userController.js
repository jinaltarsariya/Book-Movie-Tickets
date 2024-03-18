const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const createUserData = async (req, res) => {
  try {
    let data = req.body;

    if (!data.fullName || !data.email || !data.mobileNo || !data.password) {
      throw new Error("plz fillup all field !");
    }

    if (data.mobileNo.length < 10 || data.mobileNo.length > 10) {
      throw new Error("plz enter valid number !");
    }

    data.password = await bcrypt.hash(data.password, 10);
    let result = await userSchema.create(data);
    var token = jwt.sign(
      {
        id: result._id,
        email: result.email,
        role: result.role,
        mobileNo: result.mobileNo,
      },
      "USER-AUTHENTICATION"
    );

    res.status(201).json({
      status: true,
      msg: "data created !",
      data: result,
      token: token,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const getUserData = async (req, res) => {
  try {
    let result = await userSchema.find();
    res.status(200).json({
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

const updateUserData = async (req, res) => {
  try {
    let id = req.query.id;
    let data = req.body;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await userSchema.findByIdAndUpdate(id, data);

    res.status(200).json({
      status: true,
      data: "data update !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = req.query.id;

    await userSchema.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      data: "data deleted !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    let checkUser = await userSchema.findOne({
      $or: [{ email: req.body.username }, { mobileNo: req.body.username }],
    });

    if (!checkUser) {
      throw new Error("user not valid !");
    }

    let checkPass = await bcrypt.compare(req.body.password, checkUser.password);

    if (!checkPass) {
      throw new Error("plz enter valid password !");
    }

    res.status(200).json({
      status: true,
      msg: "login Successfully !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const generateOtp = async (req, res) => {
  try {
    let checkUser = await userSchema.findOne({
      $or: [{ email: req.body.username }, { mobileNo: req.body.username }],
    });

    if (!checkUser) {
      throw new Error("plz enter valid username!");
    }

    let otp = await otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    await userSchema.findOneAndUpdate(
      {
        $or: [{ email: req.body.username }, { mobileNo: req.body.username }],
      },
      { $set: { otp: otp } }
    );

    res.status(200).json({
      status: true,
      otp: otp,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      text: error.message,
    });
  }
};

const compareOtp = async (req, res) => {
  try {
    let checkUser = await userSchema.findOne({
      $or: [{ email: req.body.username }, { mobileNo: req.body.username }],
    });

    if (!checkUser) {
      throw new Error("plz enter valid username!");
    }

    if (checkUser.otp !== req.body.otp) {
      throw new Error("plz enter valid varification code !");
    }

    await userSchema.findOneAndUpdate(
      {
        $or: [{ email: req.body.username }, { mobileNo: req.body.username }],
      },
      { $set: { otp: "" } }
    );

    res.status(200).json({
      status: true,
      msg: "otp match successfully !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      text: error.message,
    });
  }
};

const passwordReset = async (req, res) => {
  try {
    let data = req.body;
    let checkUser = await userSchema.findOne({
      $or: [{ email: req.body.username }, { mobileNo: req.body.username }],
    });

    if (!checkUser) {
      throw new Error("plz enter valid username!");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error("password must match !");
    }

    checkUser.password = await bcrypt.hash(data.password, 10);

    await userSchema.findOneAndUpdate(
      {
        $or: [{ email: req.body.username }, { mobileNo: req.body.username }],
      },
      { $set: { password: checkUser.password } }
    );

    res.status(200).json({
      status: true,
      msg: "password created successfully !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      text: error.message,
    });
  }
};

module.exports = {
  createUserData,
  getUserData,
  updateUserData,
  deleteUser,
  loginController,
  generateOtp,
  compareOtp,
  passwordReset,
};
