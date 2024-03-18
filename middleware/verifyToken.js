const jwt = require("jsonwebtoken");
const userSchema = require("../schema/userSchema");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      throw new Error("token not found !");
    }

    let decoded = jwt.verify(token, "USER-AUTHENTICATION");

    let ticketData = await userSchema.findById({ _id: decoded.id });

    if (ticketData) {
      if (ticketData.role === "admin_user") {
        next();
      } else {
        throw new Error("you are not authorised to access this route !");
      }
    } else {
      throw new Error("unauthorised user !");
    }
    req.userId = decoded.id;
  } catch (error) {
    res.status(505).json({
      status: false,
      message: "token are available !",
      message: error.message,
    });
  }
};

module.exports = { verifyToken };
