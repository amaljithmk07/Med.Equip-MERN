const mongoose = require("mongoose");
const donationschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
const data = mongoose.model("donation_tb", donationschema);
module.exports = data;
