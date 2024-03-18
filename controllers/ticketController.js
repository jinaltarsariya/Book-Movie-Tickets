const ticketSchema = require("../schema/ticketSchema");
const moment = require("moment");

const ticketController = async (req, res) => {
  try {
    let data = req.body;

    data.date = moment(data.date, "DD-MM-YYYYY").startOf("day").format();

    let result = await ticketSchema.create(data);
    res.status(201).json({
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

const getOneTicketData = async (req, res) => {
  try {
    let id = req.query.params;
    let data = await ticketSchema.findOne(id).populate("event_id");
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

const getTicketsData = async (req, res) => {
  try {
    let findTicketData = await ticketSchema.find().populate("event_id");
    res.status(200).json({
      status: true,
      data: findTicketData,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

const putTicketData = async (req, res) => {
  try {
    let id = req.query.params;
    let data = req.body;
    await ticketSchema.updateOne(id, {
      $set: data,
    });

    res.status(200).json({
      status: true,
      data: "data updated successfully !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

const deleteTicketDdata = async (req, res) => {
  try {
    let id = req.query.params;
    await ticketSchema.deleteOne(id);
    res.status(200).json({
      status: true,
      data: "data successfully deleted !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

module.exports = {
  ticketController,
  getOneTicketData,
  getTicketsData,
  putTicketData,
  deleteTicketDdata,
};
