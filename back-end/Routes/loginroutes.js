const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginSchema = require("../models/loginschema");
const register = require("../models/registerschema");
const Checkauth = require("../middle-ware/Checkauth");
const loginroutes = express.Router();

loginroutes.post("/", async (req, res) => {
  // const { email, password } = req.body;

  try {
    // console.log(req.body.password);
    // console.log(req.body.email);
    const email = req.body.email;
    const loweremail = email.toLowerCase();

    if (loweremail && req.body.password) {
      const oldUser = await loginSchema.findOne({ email: loweremail });
      if (!oldUser)
        return res.status(400).json({
          success: false,
          error: true,
          message: "Email doesn't Exist,you have to register first",
        });
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        oldUser.password
      );
      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ success: false, error: true, message: "Incorrect password" });

      const token = jwt.sign(
        {
          userId: oldUser._id,
          userRole: oldUser.role,
          email: oldUser.email,
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      // console.log("token:", token);
      // console.log("Role:", userRole);
      return res.status(200).json({
        success: true,
        error: false,
        token: token,
        expiresIn: 3600,
        loginId: oldUser._id,
        userRole: oldUser.role,
        email: oldUser.email,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Something went wrong",
      message: error.message,
    });
  }
});

//Check UUID

loginroutes.post("/uuidverify", Checkauth, async (req, res) => {
  try {
    const userid = req.userData.userId;
    console.log(userid);
    const userdata = await register.findOne({
      login_id: userid,
    });
    const uuid = userdata.user_id;
    console.log("UUID :", uuid);
    console.log(typeof uuid);
    console.log("front", req.body.user_id);
    console.log("frontype", typeof req.body.user_id);
    if (uuid === req.body.user_id) {
      res.status(200).json({
        success: true,
        error: false,
        message: "Success",
        // data: uuid,
        uuid: req.body.user_id,
      });
    } else {
      res.status(400).json({
        success: false,
        error: true,
        message: "Wrong UUID ",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      errMessage: err.message,
    });
  }
});

module.exports = loginroutes;
