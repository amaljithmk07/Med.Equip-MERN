const express = require("express");
const multer = require("multer");
const userroutes = express.Router();
const registerDB = require("../models/registerschema");
const products = require("../models/productschema");
const cartproducts = require("../models/cartschema");
const Checkauth = require("../middle-ware/Checkauth");
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
//add

userroutes.post("/add", upload.single("image"), Checkauth, (req, res) => {
  const Data = new products({
    image: req.file ? req.file.filename : null,
    login_id: req.userData.userId,
    available_qty: req.body.available_qty,
    name: req.body.name,
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
});

//view

userroutes.get("/view", Checkauth, (req, res) => {
  products
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "Data fetched successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: true,
        message: "data fetched failed",
        ErrorMessage: err.message,
      });
    });
});

// Single View

userroutes.get("view/:id", (req, res) => {
  products
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "Single view data fetched successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: true,
        message: "Single view Data fetched Unsuccessfull",
        ErrorMessage: err.message,
      });
    });
});

//update

userroutes.put("/update/:id", (req, res) => {
  products
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      (data.name = req.body.name),
        (data.address = req.body.address),
        (data.email = req.body.email),
        (data.description = req.body.description);
      data.category = req.body.category;
      data.sub_category = req.body.sub_category;
      data.purchased_date = req.body.purchased_date;
      data.phone_number = req.body.phone_number;
      data.pin_code = req.body.pin_code;
    });
  data
    .save()
    .then((data) => {
      res.status(200),
        json({
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
});

//delete

userroutes.delete("/delete/:id", (req, res) => {
  products
    .deleteOne({
      _id: req.params.id,
    })
    .then(() => {
      res.send("Deleted Successfull");
    })
    .catch((err) => {
      res.send(err);
    });
});

//Profile view

userroutes.get("/profile", Checkauth, (req, res) => {
  registerDB
    .aggregate([
      {
        $lookup: {
          from: "login_tbs",
          localField: "login_id",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
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

          user_id: {
            $first: "$user_id",
          },

          age: {
            $first: "$age",
          },
          phone_number: {
            $first: "$phone_number",
          },
          email: {
            $first: "$result.email",
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
});

//Profile update

userroutes.put("/profileupdate/:id", (req, res) => {
  registerDB
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      (data.name = req.body.name),
        // (data.email = req.body.email),
        (data.age = req.body.age),
        (data.phone_number = req.body.phone_number);
    });
  data
    .save()
    .then((data) => {
      res.status(200),
        json({
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
});

// Cart Add

userroutes.post("/addtocart", Checkauth, upload.single("image"), (req, res) => {
  const Data = new cartproducts({
    login_id: req.userData.userId,
    image: req.body.image,
    available_qty: req.body.available_qty,
    cart_qty: req.body.cart_qty,
    name: req.body.name,
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
      res.status(200).json({
        success: true,
        error: false,
        message: "Add to cart successfully",
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

// cart products View

userroutes.get("/cartview", Checkauth, (req, res) => {
  try {
    cartproducts
      .find()
      .then((data) => {
        res.status(200).json({
          success: true,
          error: false,
          message: "Cart view Successful",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: true,
          message: "data fetched failed",
          ErrorMessage: err.message,
        });
      });
  } catch (err) {
    res.status.json({
      success: false,
      error: true,
      message: "Something wrong",
    });
  }
});

// Cart Delete
userroutes.get("/cartdelete/:id", Checkauth, (req, res) => {
  cartproducts
    .deleteOne({
      _id: req.params.id,
    })

    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "cart delete successful",
      });
    })
    .catch((err) => {
      res.status.json({
        success: false,
        error: true,
        ErrorMessage: err.message,
      });
    });
});

// Cart increment

userroutes.get("/cartincrement/:id", Checkauth, async (req, res) => {
  try {
    const userId = req.userData.userId;
    cartproducts
      .findOne({
        login_id: userId,
        _id: req.params.id,
      })
      .then(async (data) => {
        // console.log(data.cart_qty+1);
        var qty = data.cart_qty;
        var availablle_qty = data.available_qty;
        if (availablle_qty > qty) {
          var incre_qty = qty + 1;
          console.log(incre_qty);

          const update_qty = await cartproducts.updateOne(
            { login_id: userId, _id: req.params.id },
            { $set: { cart_qty: incre_qty } }
          );

          if (update_qty) {
            return res.status(200).json({
              success: true,
              error: false,
              data: data,
              message: "cart increment successful",
            });
          }
        }
        else{
          return res.status(200).json({
            success: true,
            error: false,
            data: data,
            message: "Yoou added maximum quantity",
          });
        }
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      ErrorMessage: err.message,
      message: "internal server Error",
    });
  }
});

module.exports = userroutes;
