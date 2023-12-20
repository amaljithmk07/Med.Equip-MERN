const mongoose = require("mongoose");
const purchaseschema = new mongoose.Schema({
  Name: {
    type: string,
    required: true,
  },

  Phone_Number: {
    type: number,
    required: true,
  },
  Address: {
    type: string,
    required: true,
  },
  Email: {
    type: string,
    required: true,
  },
  Pin_code: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("details", purchaseschema);
