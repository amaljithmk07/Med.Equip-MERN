const express = require("express");
const multer = require("multer");
const userroutes = express.Router();
const registerDB = require("../models/registerschema");
const LoginDB = require("../models/loginschema");
const products = require("../models/productschema");
const CartDB = require("../models/cartschema");
const OrdersDB = require("../models/orderschema");
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
          image: {
            $first: "$image",
          },
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

//User Profile update

userroutes.post(
  "/profileupdate/:id",
  Checkauth,
  upload.single("image"),
  async (req, res) => {
    try {
      const olddata = registerDB.findOne({
        _id: req.params.id,
      });
      const userprofile = {
        image: req.file ? req.file.filename : olddata.image,
        name: req.body ? req.body.name : olddata.name,
        email: req.body ? req.body.email : olddata.email,
        age: req.body ? req.body.age : olddata.age,
        phone_number: req.body ? req.body.phone_number : olddata.phone_number,
      };

      const updatedProfile = await registerDB.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: userprofile,
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
      console.log(newemail);
      if (updatedProfile && newemail) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "data updated successfully",
          data: updatedProfile,
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(400).json({
        success: true,
        error: false,
        message: "data Fetched unsuccessful",
        ErrorMessage: err.message,
      });
    }
  }
);

// Cart Add

userroutes.post("/addtocart", Checkauth, upload.single("image"), (req, res) => {
  const Data = new CartDB({
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
    CartDB.find()
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
  CartDB.deleteOne({
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
      res.status(200).json({
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
    CartDB.findOne({
      login_id: userId,
      _id: req.params.id,
    }).then(async (data) => {
      // console.log(data.cart_qty+1);
      var qty = data.cart_qty;
      var available_qty = data.available_qty;
      if (available_qty > qty) {
        var incre_qty = qty + 1;
        console.log("Increment:", incre_qty);

        const update_qty = await CartDB.updateOne(
          { login_id: userId, _id: req.params.id },
          { $set: { cart_qty: incre_qty } }
        );
        // console.log("updateQty:", update_qty);
        if (update_qty) {
          return res.status(200).json({
            success: true,
            error: false,
            data: data,
            incre_qty: incre_qty,
            message: "cart increment successful",
          });
        }
      } else {
        return res.status(200).json({
          success: true,
          error: false,
          data: data,
          message: "You added maximum quantity",
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

// Cart decrement

userroutes.get("/cartdecrement/:id", Checkauth, async (req, res) => {
  try {
    const userId = req.userData.userId;
    CartDB.findOne({
      login_id: userId,
      _id: req.params.id,
    }).then(async (data) => {
      // console.log(data.cart_qty+1);
      var qty = data.cart_qty;
      var availablle_qty = data.available_qty;
      if (qty > 1) {
        var decre_qty = qty - 1;
        console.log("decrement :", decre_qty);

        const update_qty = await CartDB.updateOne(
          { login_id: userId, _id: req.params.id },
          { $set: { cart_qty: decre_qty } }
        );

        if (update_qty) {
          return res.status(200).json({
            success: true,
            error: false,
            data: data,
            decre_qty: decre_qty,
            message: "cart decrement successful",
          });
        }
      } else {
        return res.status(200).json({
          success: true,
          error: false,
          data: data,
          message: "Yoou removed minimum quantity",
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

// Order Place
userroutes.post("/orderplace/:id", Checkauth, async (req, res) => {
  // console.log(req.params.id);
  try {
    const cartdata = await CartDB.find({
      login_id: req.params.id,
    });
    const orderdata = cartdata.map((item) => ({ ...item.toObject() }));
    const orderdetail = await OrdersDB.insertMany(orderdata);
    const deletedcart = await CartDB.deleteMany({
      login_id: req.params.id,
    });
    
    const [{ _id }] = orderdata;
    // console.log(available_qty);
    // console.log(cart_qty);

    var new_available_qty = orderdata.map((data) => ({
      ...data,
      [available_qty]: data.available_qty - data.cart_qty,
    }));

    // console.log('data',data)
    // console.log("type", typeof new_available_qty);
    // console.log(new_available_qty);
    var updated_qty = await products.updateMany(
      {
        _id: _id,
      },
      {
        $set: {
          available_qty: new_available_qty.Updated_Qty,
        },
      }
    );
    var updated = await products(updated_qty).save();

    if (orderdetail && deletedcart && updated) {
      return res.status(200).json({
        success: true,
        error: false,
        data: orderdetail,
        message: "Order placed successful",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Network error",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Order failed",
      ErrorMessage: err.message,
    });
  }
});

//Order Details

userroutes.get("/ordersummary/:id", Checkauth, (req, res) => {
  OrdersDB.find({
    login_id: req.params.id,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
        message: "OrderSummary successfully displayed",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: true,
        ErrorMessage: err.message,
        message: "Network error",
      });
    });
});

module.exports = userroutes;
