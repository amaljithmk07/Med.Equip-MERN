const express = require("express");
const multer = require("multer");
// const server = express();
const adminroutes = express.Router();

const products = require("../models/productschema");
const Checkauth = require("../middle-ware/Checkauth");

require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Med-equip",
  },
});
const upload = multer({ storage: storage });



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../front-end/public/upload/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

//Add

adminroutes.post("/add", upload.single("image"), Checkauth, (req, res) => {
  try {
    // adminroutes.post("/add",  (req, res) => {
    // console.log(req.file.Image);
    const Data = new products({
      // const Data = new formData({
      // image: req.file.filename,
      image: req.file ? req.file.path : null,
      name: req.body.name,
      login_id: req.userData.userId,

      available_qty: req.body.available_qty,
      description: req.body.description,
      category: req.body.category,
      sub_category: req.body.sub_category,
      email: req.body.email,
      purchased_date: req.body.purchased_date,
      phone_number: req.body.phone_number,
      address: req.body.address,
      pin_code: req.body.pin_code,
    });
    Data.save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    console.log("Upload error:", err);
    res.status(500).json({
      Success: false,
      error: true,
      message: "Data upload failed",
      ErrorMessage: err.message,
    });
  }
});
//View

adminroutes.get("/view", Checkauth, (req, res) => {
  // formData
  try {
    products
      .find()
      .then((data) => {
        res.status(200).json({
          Success: true,
          Error: false,
          Message: "Data fetched successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          Success: false,
          Error: true,
          ErrorMessage: "Data fetched Unsuccessfull",
          // ErrorMessage: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Error: true,
      // Message: "Internal server error",
      ErrorMessage: "Data fetched Unsuccessfull",

      // ErrorMessage: err.message,
    });
  }
});

//Single view
adminroutes.get("/viewone/:id", (req, res) => {
  products
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.status(200).json({
        Success: true,
        Error: false,
        Message: "Data fetched successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        Success: false,
        Error: true,
        Message: "Data fetched Unsuccessfull",
        ErrorMessage: err.message,
      });
    });
});
//update

adminroutes.put(
  "/update/:id",
  Checkauth,
  upload.single("image"),
  (req, res) => {
    try {
      products
        .findOne({
          _id: req.params.id,
        })
        .then((data) => {
          (data.image = req.file ? req.file.filename : data.image),
            // data.image = req.file ? req.file.filename : null ,
            (data.name = req.body ? req.body.name : data.name),
            (data.available_qty = req.body
              ? req.body.available_qty
              : data.available_qty),
            (data.category = req.body ? req.body.category : data.category),
            (data.sub_category = req.body
              ? req.body.sub_category
              : data.sub_category),
            (data.description = req.body
              ? req.body.description
              : data.description),
            (data.purchased_date = req.body
              ? req.body.purchased_date
              : data.purchased_date),
            (data.phone_number = req.body
              ? req.body.phone_number
              : data.phone_number),
            (data.address = req.body ? req.body.address : data.address),
            (data.email = req.body ? req.body.email : data.email),
            (data.pin_code = req.body ? req.body.pin_code : data.pin_code),
            data
              .save()
              .then((data) => {
                res.status(200).json({
                  message: "updated successfully",
                  success: true,
                  error: false,
                  data: data,
                });
              })
              .catch((err) => {
                res.status(400).json({
                  success: false,
                  error: true,
                  ErrorMessage: err.message,
                });
              });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: true,
        ErrorMessage: "Internal server error",
      });
    }
  }
);

//delete

adminroutes.delete("/delete/:id", (req, res) => {
  products
    .deleteOne({
      _id: req.params.id,
    })
    .then(() => {
      res.send("deleted Successfully");
      // navigate(<Viewproduct/>)
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = adminroutes;
