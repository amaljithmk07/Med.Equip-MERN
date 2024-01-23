const express = require("express");
const multer = require("multer");
const userroutes = express.Router();
const registerDB = require("../models/registerschema");
const LoginDB = require("../models/loginschema");
const products = require("../models/productschema");
const CartDB = require("../models/cartschema");
const OrdersDB = require("../models/orderschema");
const Checkauth = require("../middle-ware/Checkauth");
const AddressDB = require("../models/addressschema");
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

// ----------Product-------------

//---Product add

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

//---Product Display

userroutes.get("/view", Checkauth, (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal Error",
      ErrorMessage: err.message,
    });
  }
});

//---Donated Product Display

userroutes.get("/donated-products", Checkauth, async (req, res) => {
  const donatedproducts = await products
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
          login_id: {
            $first: "$login_id",
          },
          image: {
            $first: "$image",
          },
          name: {
            $first: "$name",
          },
          available_qty: {
            $first: "$available_qty",
          },
          description: {
            $first: "$description",
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
          purchased_date: {
            $first: "$purchased_date",
          },
          phone_number: {
            $first: "$phone_number",
          },
          address: {
            $first: "$address",
          },
          pin_code: {
            $first: "$pin_code",
          },
          role: {
            $first: "$results.role",
          },
        },
      },
    ])
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

// View Editing product

userroutes.get("/viewone/:id", (req, res) => {
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

//---Product update

userroutes.put(
  "/edit-product/:id",
  Checkauth,
  upload.single("image"),
  async (req, res) => {
    try {
      const olddata = await products.findOne({
        _id: req.params.id,
      });
      console.log(olddata);
      const newdata = {
        image: req.body.image ? req.body.image : olddata.image,
        name: req.body.name ? req.body.name : olddata.name,
        description: req.body.description
          ? req.body.description
          : olddata.description,
        available_qty: req.body.available_qty
          ? req.body.available_qty
          : olddata.available_qty,
        category: req.body.category ? req.body.category : olddata.category,
        sub_category: req.body.sub_category
          ? req.body.sub_category
          : olddata.sub_category,
        email: req.body.email ? req.body.email : olddata.email,
        purchased_date: req.body.purchased_date
          ? req.body.purchased_date
          : olddata.purchased_date,
        phone_number: req.body.phone_number
          ? req.body.phone_number
          : olddata.phone_number,
        address: req.body.address ? req.body.address : olddata.address,
        pin_code: req.body.pin_code ? req.body.pin_code : olddata.pin_code,
      };
      console.log("newdata", newdata);
      const updatedData = await products.updateMany(
        {
          _id: req.params.id,
        },
        {
          $set: newdata,
        }
      );

      if (updatedData) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "data updated successfully",
          data: newdata,
        });
      } else
        (err) => {
          return res.status(400).json({
            success: false,
            error: true,
            message: "Failed",
            ErrorMessage: err.message,
          });
        };
    } catch (err) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Internal server error",
        ErrorMessage: err.message,
      });
    }
  }
);

//---Product delete

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

//---Product  Wishlist

userroutes.put("/wishlist/:id", async (req, res) => {
  const wishlist = await products.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        wishlist: "approved",
      },
    }
  );
  if (wishlist) {
    return res.send("approved Successfull");
  } else
    (err) => {
      return res.send(err);
    };
});

//---Product  Wishlist REMOVE

userroutes.put("/wishlist-remove/:id", async (req, res) => {
  const wishlist = await products.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        wishlist: "",
      },
    }
  );
  if (wishlist) {
    return res.send("Canceled Successfull");
  } else
    (err) => {
      return res.send(err);
    };
});

// -------------Profile---------------

//---Profile view

userroutes.get("/profile", Checkauth, (req, res) => {
  registerDB
    .aggregate([
      [
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
            login_id: {
              $first: "$login_id",
            },
            image: {
              $first: "$image",
            },
            name: {
              $first: "$name",
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

            user_id: {
              $first: "$user_id",
            },
          },
        },
      ],
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

//---User Profile update

userroutes.post(
  "/profileupdate/:id",
  Checkauth,
  upload.single("image"),
  async (req, res) => {
    try {
      const olddata = await registerDB.findOne({
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
          data: userprofile,
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(400).json({
        success: false,
        error: true,
        message: "data Fetched unsuccessful",
        ErrorMessage: err.message,
      });
    }
  }
);

//----------------Cart -----------------

//--- Cart Add

userroutes.post(
  "/addtocart",
  Checkauth,
  upload.single("image"),
  async (req, res) => {
    console.log(req.body._id);
    const address = await AddressDB.find({
      login_id: req.userData.userId,
      category: "primary",
    });
    const addressId = new mongoose.Types.ObjectId(address[0]._id);

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
      product_id: req.body._id,
      address_id: addressId,
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
  }
);

// ---cart products View

userroutes.get("/cartview/:id", Checkauth, async (req, res) => {
  try {
    await CartDB.find({
      login_id: req.params.id,
    })
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
      errorMessage: err.message,
      message: "Something wrong",
    });
  }
});

//--- Cart Delete

userroutes.get("/cartdelete/:id", Checkauth, async (req, res) => {
  await CartDB.deleteOne({
    _id: req.params.id,
    login_id: req.userData.userId,
  })
    .then((ids) => {
      var ids = req.params.id;
      // var id = ids;

      // console.log("id", ids);
      res.status(200).json({
        success: true,
        error: false,
        id: ids,
        // message: "cart delete successful",
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

// ---Cart increment

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
          CartDB.findOne({
            login_id: userId,
            _id: req.params.id,
          }).then((datas) => {
            return res.status(200).json({
              success: true,
              error: false,
              data: datas,
              incre_qty: incre_qty,
              message: "cart increment successful",
            });
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          error: true,
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

//--- Cart decrement

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
          CartDB.findOne({
            login_id: userId,
            _id: req.params.id,
          }).then((data) => {
            return res.status(200).json({
              success: true,
              error: false,
              data: data,
              decre_qty: decre_qty,
              message: "cart decrement successful",
            });
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

// ---------Address-------------

//profile with address

userroutes.get("/profile-address", Checkauth, async (req, res) => {
  const primary = await AddressDB.findOne({
    login_id: req.userData.userId,
    category: "primary",
  });
  if (primary) {
    await AddressDB.aggregate([
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
          category: "primary",
        },
      },

      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name",
          },
          state: {
            $first: "$state",
          },
          district: {
            $first: "$district",
          },
          address: {
            $first: "$address",
          },
          address_type: {
            $first: "$address_type",
          },
          pin_code: {
            $first: "$pin_code",
          },
          alternate_phone: {
            $first: "$alternate_phone",
          },
          email: {
            $first: "$results.email",
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
  } else {
    res.status(500).json({
      success: false,
      error: true,
      message: "No data",
    });
  }
});

//Order Place address

userroutes.get("/orderplace-address", Checkauth, async (req, res) => {
  const primary = await AddressDB.findOne({
    login_id: req.userData.userId,
    category: "primary",
  });
  if (primary) {
    return res.status(200).json({
      data: primary,
      success: true,
      error: false,
      message: "Profile data fetched successfully",
    });
  } else {
    res.status(500).json({
      success: false,
      error: true,
      message: "No data",
    });
  }
});

//---Add Address

userroutes.post("/add-address", Checkauth, async (req, res) => {
  try {
    const temp = await AddressDB.updateMany(
      {
        login_id: req.userData.userId,
      },
      {
        $set: {
          category: "",
        },
      }
    );

    const data = new AddressDB({
      login_id: req.userData.userId,
      name: req.body.name,
      state: req.body.state,
      address: req.body.address,
      district: req.body.district,
      email: req.body.email,
      pin_code: req.body.pin_code,
      alternate_phone: req.body.alternate_phone,
      address_type: req.body.address_type,
      category: "primary",
    });

    data
      .save()

      .then((data) => {
        res.status(200).json({
          success: true,
          error: false,
          data: data,
          message: "Address successfully  Added",
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
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      ErrorMessage: err.message,
      message: "Internal Server error",
    });
  }
});

//--- View All Address

userroutes.get("/view-address", Checkauth, async (req, res) => {
  try {
    const data = await AddressDB.find({
      login_id: req.userData.userId,
    });

    if (data) {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
        message: " Address successfully displayed",
      });
    } else
      (err) => {
        res.status(400).json({
          success: false,
          error: true,
          ErrorMessage: err.message,
          message: "Network error",
        });
      };
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      ErrorMessage: err.message,
      message: "Internal Server error",
    });
  }
});

//--- Set address As Primary

userroutes.put("/primary-address/:id", Checkauth, async (req, res) => {
  try {
    const temp = await AddressDB.updateMany(
      {
        login_id: req.userData.userId,
      },
      {
        $set: {
          category: "",
        },
      }
    );
    const data = await AddressDB.updateOne(
      {
        login_id: req.userData.userId,
        _id: req.params.id,
      },
      {
        $set: {
          category: "primary",
        },
      }
    );

    if (data && temp) {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
        message: " Primary address Successful",
      });
    } else
      (err) => {
        res.status(400).json({
          success: false,
          error: true,
          ErrorMessage: err.message,
          message: "Network error",
        });
      };
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      ErrorMessage: err.message,
      message: "Internal Server error",
    });
  }
});

//--- View Primary Address

userroutes.get("/view-primary-address", Checkauth, async (req, res) => {
  try {
    const data = await AddressDB.find({
      login_id: req.userData.userId,
      address_type: "primary",
    });

    if (data) {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
        message: "primary Address successfully displayed",
      });
    } else
      (err) => {
        res.status(400).json({
          success: false,
          error: true,
          ErrorMessage: err.message,
          message: "Network error",
        });
      };
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      ErrorMessage: err.message,
      message: "Internal Server error",
    });
  }
});

// ---------Order Details-----------

//--- Order Place

userroutes.post("/orderplace/:id", Checkauth, async (req, res) => {
  try {
    const Oldcartdata = await CartDB.find({
      login_id: req.params.id,
    });
    const address = await AddressDB.find({
      login_id: req.params.id,
      category: "primary",
    });
    console.log(address);

    const objCartdata = Oldcartdata.map((item) => ({ ...item.toObject() }));
    const orderDB_newdata = await OrdersDB.insertMany(objCartdata);

    const cartitems = req.body;
    for (const i of cartitems) {
      var _id = i._id;
      var product_id = i.product_id;
      var available_qty = i.available_qty;
      var cart_qty = i.cart_qty;
      console.log("test");
      console.log(_id, product_id, available_qty, cart_qty);

      var updated_product_qty = await products.updateMany(
        {
          _id: product_id,
        },
        {
          $set: {
            available_qty: available_qty - cart_qty,
          },
        }
      );
    }
    const deletedcart = await CartDB.deleteMany({
      login_id: req.params.id,
    });
    if (updated_product_qty && orderDB_newdata && deletedcart) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Updated Successful",
        data: updated_product_qty,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Order failed",
          ErrorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error",
      ErrorMessage: err.message,
    });
  }
});

//---Order Summary

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
