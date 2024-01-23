const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema definition

const cartschema = new mongoose.Schema({
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
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product_details",
    required: true,
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "Address_tb",
    required: true,
  },
});
const data = mongoose.model("Cart Details", cartschema);
module.exports = data;
