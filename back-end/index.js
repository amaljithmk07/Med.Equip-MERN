const express = require("express");
const server = express();
const mongoose = require("mongoose");
const adminroutes = require("./Routes/adminroutes");
const registerroutes = require("./Routes/registerroutes");
const loginroutes = require("./Routes/loginroutes");
const cors = require("cors");
const userroutes = require("./Routes/userroutes");
const volunteerroutes = require("./Routes/volunteerroutes");
require("dotenv").config();

mongoose
  .connect(
   process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/register", registerroutes);
server.use("/api/login", loginroutes);
server.use("/api/admin", adminroutes);
server.use("/api/user", userroutes);
server.use("/api/volunteer", volunteerroutes);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
