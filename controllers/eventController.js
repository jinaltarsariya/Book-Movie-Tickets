const eventSchema = require("../schema/eventSchema");
const moment = require("moment");

const eventcontroller = async (req, res) => {
  try {
    let data = req.body;

    data.startDate = moment(data.startDate, "DD-MM-YYYYY")
      .startOf("day")
      .format();
    data.endDate = moment(data.endDate, "DD-MM-YYYYY").endOf("day").format();

    data.slug = data.name.replaceAll(" ", "-").toLowerCase();

    console.log("req.filename", req.file.filename);
    data.poster = req.file.filename;

    let result = await eventSchema.create(data);

    res.status(201).json({
      status: true,
      message: "File created successfully!!",
      msg2: result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

const getOneEventData = async (req, res) => {
  try {
    let id = req.query.params;
    let data = await eventSchema.findOne(id);

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

const getEventsData = async (req, res) => {
  try {
    let findeventData = await eventSchema.find();
    res.status(200).json({
      status: true,
      eventData: findeventData,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

const putEventData = async (req, res) => {
  try {
    let id = req.query.params;
    let data = req.body;

    data.slug = data.name?.replaceAll(" ", "-").toLowerCase();
    data.poster = req.file.filename;

    if (data.startDate) {
      data.startDate = moment(data.startDate, "DD-MM-YYYYY")
        .startOf("day")
        .format();
    }

    if (data.endDate) {
      data.endDate = moment(data.endDate, "DD-MM-YYYYY").endOf("day").format();
    }

    console.log("data.poster", data.poster);
    await eventSchema.updateOne(id, data);

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

const deleteEventData = async (req, res) => {
  try {
    let id = req.query.params;

    await eventSchema.deleteOne(id);
    res.status(200).json({
      status: true,
      data: "data deleted successfully !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message || error,
    });
  }
};

const moviePublished = async (req, res) => {
  try {
    let eventPublishData = await eventSchema.findById(req.params);

    if (eventPublishData.published == "true") {
      await eventSchema.findByIdAndUpdate(
        { _id: eventPublishData._id },
        { $set: { published: "false" } }
      );
    } else {
      await eventSchema.findByIdAndUpdate(
        { _id: eventPublishData._id },
        { $set: { published: "true" } }
      );
    }

    res.status(200).json({
      status: true,
      result: "movie published change successfully !",
    });
  } catch (error) {
    res.status(505).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  eventcontroller,
  getOneEventData,
  getEventsData,
  putEventData,
  deleteEventData,
  moviePublished,
};
