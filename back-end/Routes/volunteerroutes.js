const express = require("express");
const Checkauth = require("../middle-ware/Checkauth");
const volunteerroutes = express.Router();
const volunteerDB = require("../models/volunteerRegisterschema");
const LoginDB = require("../models/loginschema");
const OrdersDB = require("../models/orderschema");
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

//----volunteer profile

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

//----Volunteer profile update

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
      console.log(req.body.email);
      const updatedData = await volunteerDB.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: profile,
        }
      );
      const newemail = await LoginDB.updateOne(
        {
          _id: olddata.login_id,
        },
        {
          $set: { email: req.body ? req.body.email : olddata.email },
        }
      );
      console.log("newemail", newemail);

      if (updatedData && newemail) {
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

//----Volunteer list

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

//----Volunteer Request list

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

//----volunteer 'Pending'  Status Update to 'accepted'

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

//----volunteer status Reject Request

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

// -------Orders-------

//----OrderStatus 'pending' list in volunteer

volunteerroutes.post("/order-status", Checkauth, async (req, res) => {
  try {
    const Order = await OrdersDB.find({
      orderstatus: "pending",
    });
    // const status = Order.map((data) => {
    //   return data.orderstatus;
    // });
    // console.log(status);

    if (Order) {
      // console.log(data);
      res.status(200).json({
        success: true,
        error: false,
        message: "Order status passed successfull",
        data: Order,
      });
    } else {
      res.status(400).json({
        success: false,
        error: true,
        message: "Order status passed failed",
        ErrorMessage: err.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
      ErrorMessage: err.message,
    });
  }
});

//----OrderStatus 'pending' to 'Accept' when volunteer accept the order

volunteerroutes.put("/order-accept/:id", Checkauth, async (req, res) => {
  const vol_id = req.userData.userId;
  const accepted = await OrdersDB.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        orderstatus: "Order Accepted",

        volunteerdetails: vol_id,
      },
    }
  );
  if (accepted) {
    res.status(200).json({
      success: true,
      error: false,
      message: "Accepted Successfull",
      data: accepted,
    });
  } else {
    res.status(400).json({
      success: false,
      error: true,
      message: "Accepted failed",
      ErrorMessage: err.message,
    });
  }
  // console.log("accepted", accepted);
});

//---- Displaying accepted orders for the individual volunteers

volunteerroutes.get("/accepted-orders", Checkauth, async (req, res) => {
  try {
    const vol_id = req.userData.userId;
    const display = await OrdersDB.find({
      volunteerdetails: vol_id,
    });

    if (display) {
      res.status(200).json({
        success: true,
        error: false,
        message: "Accepted orders displayed successful",
        data: display,
      });
    } else {
      res.status(400).json({
        success: false,
        error: true,
        message: " failed",
        ErrorMessage: err.message,
      });
    }
    // console.log("accepted", accepted);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server error",
      ErrorMessage: err.message,
    });
  }
});

//----Order Placed/Delivered

volunteerroutes.put("/order-placed/:id", Checkauth, async (req, res) => {
  const vol_id = req.userData.userId;
  console.log(vol_id);
  const display = await OrdersDB.updateOne(
    {
      _id: req.params.id,
      volunteerdetails: vol_id,
    },
    {
      $set: {
        orderstatus: "Delivered",
      },
    }
  );

  if (display) {
    res.status(200).json({
      success: true,
      error: false,
      message: "Order Placed successful",
      data: display,
    });
  } else {
    res.status(400).json({
      success: false,
      error: true,
      message: " failed",
      ErrorMessage: err.message,
    });
  }
});

// ----Display address details with Orders

volunteerroutes.get("/view-details/:id", Checkauth, async (req, res) => {
  try {
    // console.log(req.params.id);
    const viewdetails = await OrdersDB.aggregate([
      {
        $lookup: {
          from: "address_tbs",
          localField: "login_id",
          foreignField: "login_id",
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
          volunteerdetails: new mongoose.Types.ObjectId(req.userData.userId),
          // login_id: new mongoose.Types.ObjectId(req.userData.userId),
          _id: new mongoose.Types.ObjectId(req.params.id),
          // volunteerdetails: req.userData.userId,
        },
      },
      {
        $group: {
          _id: "$_id",
          login_id: {
            $first: "$login_id",
          },
          volunteerdetails: {
            $first: "$volunteerdetails",
          },
          product_name: {
            $first: "$name",
          },
          description: {
            $first: "$description",
          },
          cart_qty: {
            $first: "$cart_qty",
          },
          category: {
            $first: "$category",
          },
          sub_category: {
            $first: "$sub_category",
          },
          email: {
            $first: "$email",
          },
          orderstatus: {
            $first: "$orderstatus",
          },
          name: {
            $first: "$results.name",
          },
          state: {
            $first: "$results.state",
          },
          district: {
            $first: "$results.district",
          },
          address: {
            $first: "$results.address",
          },
          pin_code: {
            $first: "$results.pin_code",
          },
          alternate_phone: {
            $first: "$results.alternate_phone",
          },
          address_type: {
            $first: "$results.address_type",
          },
        },
      },
    ]);
    // console.log(viewdetails);
    if (viewdetails) {
      res.status(200).json({
        success: true,
        error: false,
        message: "Details displayed successful",
        data: viewdetails,
      });
    } else {
      res.status(400).json({
        success: false,
        error: true,
        message: "Failed",
        ErrorMessage: err.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Network failed",
      ErrorMessage: err.message,
    });
  }
});

module.exports = volunteerroutes;
