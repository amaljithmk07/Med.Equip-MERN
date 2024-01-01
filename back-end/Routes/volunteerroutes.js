const express = require("express");
const Checkauth = require("../middle-ware/Checkauth");
const volunteerroutes = express.Router();
const volunteerDB = require("../models/volunteerRegisterschema");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

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
          $match: {
            login_id: new mongoose.Types.ObjectId(req.userData.userId),
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
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      ErrorMessage: err.message,
      message: "Internal Server Error",
    });
  }
});

//Volunteer update

volunteerroutes.post(
  "/profileupdate/:id",
  Checkauth,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log(req.body);
      console.log("Image file:", req.file);
      const olddata = await volunteerDB.findOne({
        _id: req.params.id,
      });

      const profile = {
        image: req.file ? req.file.filename : olddata.image,
        name: req.body ? req.body.name : olddata.name,
        age: req.body ? req.body.age : olddata.age,
        qualification: req.body
          ? req.body.qualification
          : olddata.qualification,
        phone_number: req.body ? req.body.phone_number : olddata.phone_number,
        email: req.body ? req.body.email : olddata.email,
      };

      const updatedData = await volunteerDB.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: profile,
        }
      );

      if (updatedData) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "data updated successfully",
          data: updatedData,
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(400).json({
        success: false,
        error: true,
        message: "data updated unsuccessfull",
        ErrorMessage: err.message,
      });
    }
  }
);

//Volunteer list

volunteerroutes.get("/volunteerlist", Checkauth, (req, res) => {
  volunteerDB
    .find({
      status: "Approved",
    })
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

//Volunteer Request list

volunteerroutes.get("/volunteerrequestlist", Checkauth, (req, res) => {
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

// Reject Request

volunteerroutes.put("/reject/:id", Checkauth, (req, res) => {
  volunteerDB
    .updateOne(
      {
        _id: req.params.id,
      },
      {
        status: "Rejected",
      }
    )
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "Rejected  successfully",
        // data: data,
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json({
        success: true,
        error: false,
        message: "Rejected Failed",
        ErrorMessage: err.message,
      });
    });
});

module.exports = volunteerroutes;
