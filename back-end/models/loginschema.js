const mongoose = require('mongoose');
const Schema = mongoose.Schema; //schema definition

const loginschema = new Schema({
  email: String,
  password: String,
  role: Number,
});

var Logindata = mongoose.model('login_tb', loginschema); //model creation
module.exports = Logindata;
