const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema definition

const productschema = new mongoose.Schema({
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
});
const data = mongoose.model("Product_details", productschema);
module.exports = data;
