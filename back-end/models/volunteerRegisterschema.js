const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema definition

const volunteerschema = new mongoose.Schema({
  login_id: { type: Schema.Types.ObjectId, ref: "login_tb", required: true },

  image: {
    type: String,
    require: true,
    default: "",
  },
  status: {
    type: String,
    default: "pending",
  },
  name: {
    type: String,
    required: true,
  },
  age: {
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
  qualification: {
    type: String,
    required: true,
  },
});
var volunteerData = mongoose.model("volunteer_tb", volunteerschema);
module.exports = volunteerData;
