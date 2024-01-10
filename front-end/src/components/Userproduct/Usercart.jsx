import React, { useState } from "react";
import "./Usercart.css";
import { useEffect } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Usercart = () => {
  const navigate = useNavigate();
  const [cartitems, setCartitems] = useState([]);
  // console.log("cart length:", cartitems.length);

  const token = localStorage.getItem("Token");
  var login_id = localStorage.getItem("LoginId");

  // console.log(login_id);
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/user/cartview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(data.data.data);
        setCartitems(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          toast.error("Session Time Out", {
            position: "bottom-center",
          });
          setTimeout(() => {
            localStorage.clear();
            navigate("/login");
          }, 2000);
        }
      });
  }, []);
  // console.log(cartitems);
  // const [qty, setQty] = useState(1);

  //Cart delete

  const cartremove = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:2222/api/user/cartdelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const filterData = cartitems.filter((details) => {
          return details._id != id;
        });
        setCartitems(filterData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Cart increment

  const incrementqty = async (id, item) => {
    var cart_qty = item.cart_qty;
    var availableQty = item.available_qty;
    // console.log(cart_qty, availableQty);
    try {
      await axios
        .get(`http://localhost:2222/api/user/cartincrement/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          // console.log(data);
          var incre_qty = data.data.incre_qty;
          // console.log(incre_qty);
          const updatedData = cartitems.filter((details) => {
            if (details._id == id) {
              setCartitems([{ [cart_qty]: availableQty }]);
              if (details.cart_qty != incre_qty) {
                if (details.cart_qty < availableQty) {
                  return (details.cart_qty += 1);
                }
              }
            }
          });
          setCartitems([...cartitems], updatedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //Cart decrement

  const decrementqty = (id, item) => {
    var cart_qty = item.cart_qty;
    var availableQty = item.available_qty;

    // setQty(qty + 1);
    try {
      axios
        .get(`http://localhost:2222/api/user/cartdecrement/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data);
          var decre_qty = data.data.decre_qty;
          console.log(decre_qty);
          const updatedData = cartitems.filter((details) => {
            if (details._id == id) {
              setCartitems([{ [cart_qty]: availableQty }]);
              if (details.cart_qty != decre_qty) {
                if (decre_qty > 0) {
                  return (details.cart_qty = details.cart_qty - 1);
                }
              }
            }
          });
          setCartitems([...cartitems], updatedData);
          // console.log("decrement:", decrementdata);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  ///Order Place

  const orderplace = () => {
    console.log(login_id);
    if (cartitems != 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#24df00",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Place Order!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Order Placed!",
            text: "Your order has been placed.",
            icon: "success",
          });
          axios
            .post(
              `http://localhost:2222/api/user/orderplace/${login_id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((data) => {
              console.log(data.data);
              navigate("/order-summary");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else {
      navigate("/user/viewproduct");
    }
  };
  return (
    <div className="cart-home">
      <Toaster />
      <div className="cart-content">
        <div className="cart-header">
          <div className="cart-heading">EQUIPMENTS CART</div>
          {/* <div className="cart-heading-right">items </div> */}
        </div>
        {/* //////////////////////////////////// */}
        {cartitems[0] == null ? (
          <>
            <img src="./Empty-cart.png" alt="" className="cart-empty" />{" "}
          </>
        ) : (
          <>
            <div className="cart-items-list">
              {cartitems.map((item) => (
                <div className="cart-items" key={item.id}>
                  <div className="cart-items-img">
                    <img
                      src={`/upload/${item.image}`}
                      alt=""
                      className="cart-img"
                    />
                  </div>
                  <div className="cart-items-type">{item.name}</div>
                  <div className="cart-items-available-qty">
                    {item.available_qty}
                  </div>
                  <div className="cart-items-category">{item.category}</div>
                  <div className="cart-items-sub-category">
                    {item.sub_category}{" "}
                  </div>
                  <div className="cart-items-qty">
                    <button
                      onClick={() => incrementqty(item._id, item)}
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                    {item.cart_qty}
                    <button
                      onClick={() => decrementqty(item._id, item)}
                      className="cart-qty-btn"
                    >
                      -
                    </button>
                  </div>
                  <div className="cart-items-delete">
                    <img
                      src="/cart-cross.png"
                      alt=""
                      className="cart-remove-item"
                      onClick={() => cartremove(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-items-number">
              Cart Items: &nbsp; {cartitems.length}
            </div>
          </>
        )}
      </div>
      {cartitems[0] == null ? (
        <></>
      ) : (
        <button className="cart-orderplace" onClick={orderplace}>
          Make Order
        </button>
      )}
    </div>
  );
};

export default Usercart;
