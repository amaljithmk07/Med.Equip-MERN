const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema definition

const registerschema = new Schema({
  login_id: { type: Schema.Types.ObjectId, ref: "login_tb", required: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  phone_number: { type: String, required: true },
  user_id: { type: String, required: true },
  // address: { type: Number, required: true },
  // pin_code: { type: Number, required: true },
});

var Registerdata = mongoose.model("register_tb", registerschema); //model creation
module.exports = Registerdata;
