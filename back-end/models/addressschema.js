const mongoose = require("mongoose");

const addressshcema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "login_tb",
    required: true,
  },
  name: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  pin_code: { type: Number, required: true },
  alternate_phone: { type: Number, required: true },
  address_type: { type: String, required: true },
  category: { type: String, require: true, default: "" },
});
const data = mongoose.model("Address_tb", addressshcema);
module.exports = data;
