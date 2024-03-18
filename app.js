const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const eventRouter = require("./routes/eventRoute");
const ticketRouter = require("./routes/ticketRoute");
const orderRouter = require("./routes/orderRoute");
require("dotenv").config();

const app = express();

mongoose
  .connect(`${process.env.DATABASES_URL}/Book_Movie_Ticket`)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(" catch data err ====> ", err.message);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// cors access control origin
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);
app.use("/", eventRouter);
app.use("/", ticketRouter);
app.use("/", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
