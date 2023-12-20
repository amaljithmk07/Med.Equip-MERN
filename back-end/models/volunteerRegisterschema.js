const mongoose = require("mongoose");
const volunteerschema = new mongoose.Schema({
  image: {
    type: string,
  },
  name: {
    type: string,
    required: true,
  },
  age: {
    type: string,
    required: true,
  },
  phone_number: {
    type: number,
    required: true,
  },
  email: {
    type: string,
    required: true,
  },
  address: {
    type: string,
    required: true,
  },
  qualification: {
    type: string,
    required: true,
  },
  id_card: {
    type: string,
    required: true,
  },
});
module.exports = mongoose.model("details", volunteerschema);
