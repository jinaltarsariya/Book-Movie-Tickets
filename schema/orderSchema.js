const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  owner: { type: String },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    required: true,
  },
  ticket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ticket",
    required: true,
  },
  purchase_date: { type: String },
  totalPrice: { type: Number },
  quntity: { type: Number },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    required: true,
    default: "confirmed",
  },
});

let orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
