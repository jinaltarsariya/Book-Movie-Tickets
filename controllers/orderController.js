const orderSchema = require("../schema/orderSchema");
const userSchema = require("../schema/userSchema");
const eventSchema = require("../schema/eventSchema");
const ticketSchema = require("../schema/ticketSchema");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const orderController = async (req, res) => {
  try {
    let data = req.body;

    let token = req.headers.token;
    let decoded = jwt.verify(token, "USER-AUTHENTICATION");

    let userId = await userSchema.findById({ _id: decoded.id });
    data.owner = userId.id;

    let currentDateTime = moment();
    data.purchase_date = currentDateTime.format("DD-MM-YYYY, hh:mm:ss a");

    let findTicket = await ticketSchema.findById({ _id: data.ticket_id });
    let findEvent = await eventSchema.findById({ _id: data.event_id });

    let availableTickets = findTicket?.available_quantity - data.quntity;
    findTicket.available_quantity = availableTickets;

    let startDate = moment(findEvent.startDate);
    let endDate = moment(findEvent.endDate);

    if (
      findEvent.published === "true" &&
      availableTickets >= 0 &&
      currentDateTime.isBetween(startDate, endDate)
    ) {
      await ticketSchema.updateOne(
        { _id: data.ticket_id },
        { $set: { available_quantity: findTicket.available_quantity } }
      );
      data.status = "confirmed";
    } else {
      data.status = "cancelled";
      throw new Error("sorry! show not available");
    }

    if (findTicket) {
      data.totalPrice = data.quntity * findTicket.price;
    }

    let result = await orderSchema.create(data);
    res.status(201).json({
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

const getOneOrderData = async (req, res) => {
  try {
    let data = await ticketSchema
      .findOne(req.query.params)
      .populate("event_id");
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

const getOrdersData = async (req, res) => {
  try {
    let data = await ticketSchema.find().populate("event_id");
    res.status(200).json({
      status: true,
      result: data,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { orderController, getOneOrderData, getOrdersData };
