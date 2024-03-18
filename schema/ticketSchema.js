const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    require: true,
  },
  name: { type: String, require: true },
  description: { type: String },
  date: { type: String },
  price: { type: Number, require: true },
  total_quantity: { type: Number },
  available_quantity: { type: Number, require: true },
});

let ticketModel = mongoose.model("ticket", ticketSchema);
module.exports = ticketModel;
