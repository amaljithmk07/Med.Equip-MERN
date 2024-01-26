const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema definition

const orderschema = new mongoose.Schema({
  image: {
    type: String,
  },
  login_id: {
    type: Schema.Types.ObjectId,
    ref: "login_tb",
    required: true,
  },
  available_qty: {
    type: Number,
    required: true,
  },
  cart_qty: {
    type: Number,
    required: true,
    default: 1,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  purchased_date: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pin_code: {
    type: Number,
    required: true,
  },
  orderstatus: {
    default: "pending",
    type: String,
  },

  volunteerdetails: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "cart Details",
    // default: "",
    require: true,
  },
  cart_id: {
    type: Schema.Types.ObjectId,
    ref: "Cart Details",
    // default: "",
    require: true,
  },
});
const data = mongoose.model("orders_tb", orderschema);
module.exports = data;
