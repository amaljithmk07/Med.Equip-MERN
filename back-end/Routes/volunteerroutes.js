const express = require("express");
const Checkauth = require("../middle-ware/Checkauth");
const volunteerroutes = express.Router();
const volunteerDB = require("../models/volunteerRegisterschema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//volunteer profile

volunteerroutes.get("/profile", Checkauth, (req, res) => {
  try {
    volunteerDB
      .aggregate([
        {
          $lookup: {
            from: "login_tbs",
            localField: "login_id",
            foreignField: "_id",
            as: "results",
          },
        },
        {
          $unwind: {
            path: "$results",
          },
        },
        {
          $group: {
            _id: "$_id",
            name: {
              $first: "$name",
            },
            age: {
              $first: "$age",
            },
            image: {
              $first: "$image",
            },
            phone_number: {
              $first: "$phone_number",
            },
            status: {
              $first: "$status",
            },
            email: {
              $first: "$results.email",
            },
            role: {
              $first: "$results.role",
            },
            qualification: {
              $first: "$qualification",
            },
            address: {
              $first: "$address",
            },
            login_id: {
              $first: "$results._id",
            },
          },
        },
      ])
      .then((data) => {
        res.status(200).json({
          data: data,
          success: true,
          error: false,
          message: "Profile data fetched successfully",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: true,
          ErrorMessage: err.message,
          message: "Profile data fetched unsuccessful",
        });
      });
  } catch {
    res.status(500).json({
      success: false,
      error: true,
      ErrorMessage: err.message,
      message: "Internal Server Error",
    });
  }
});

//Volunteer update

volunteerroutes.put(
  "/profileupdate/:id",
  Checkauth,
  upload.single("image"),
  (req, res) => {
    volunteerDB
      .findOne({
        _id: req.params.id,
      })
      .then((data) => {
        (data.image = req.file ? req.file.filename : data.image),
          (data.name = req.body ? req.body.name : data.name),
          (data.age = req.body ? req.body.age : data.age),
          (data.qualification = req.body
            ? req.body.qualification
            : data.qualification),
          (data.phone_number = req.body
            ? req.body.phone_number
            : data.phone_number),
          (data.email = req.body ? req.body.email : data.email);
      });
    data
      .save()
      .then((data) => {
        res.status(200).json({
          success: true,
          error: false,
          message: "data updated successfully",
          data: data,
        });
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json({
          success: true,
          error: false,
          message: "data updated unsuccessfull",
          ErrorMessage: err.message,
        });
      });
  }
);

//Volunteer list

volunteerroutes.get("/volunteerlist", (req, res) => {
  volunteerDB
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "volunteer List display successfully",
        data: data,
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json({
        success: true,
        error: false,
        message: "volunteer List display unsuccessfull",
        ErrorMessage: err.message,
      });
    });
});

// Status Update

volunteerroutes.put("/statusupdate/:id", Checkauth, async (req, res) => {
  try {
    console.log(req.params.id);
    await volunteerDB
      .updateOne(
        {
          _id: req.params.id,
        },
        {
          status: "Approved",
        }
      )
      .then((data) => {
        res.status(200).json({
          success: true,
          error: false,
          message: "Updated  successfully",
          data: data,
        });
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json({
          success: true,
          error: false,
          message: "Update unsuccessfull",
          ErrorMessage: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      success: true,
      error: false,
      message: "Internal Server Error",
      ErrorMessage: err.message,
    });
  }
});
module.exports = volunteerroutes;
