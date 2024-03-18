const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  slug: { type: String, require: true },
  name: { type: String, require: true, unique: true },
  discription: { type: String },
  poster: { type: String },
  startDate: { type: String, require: true },
  endDate: { type: String, require: true },
  published: { type: String, enum: ["true", "false"], default: "true" },
});

let eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
