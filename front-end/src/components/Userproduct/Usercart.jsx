import React, { useState } from "react";
import "./Usercart.css";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Usercart = () => {
  const navigate = useNavigate();
  const [cartitems, setCartitems] = useState([]);
  // console.log("cart length:", cartitems.length);

  const token = localStorage.getItem("Token");
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

  // const incrementqty = async(id, item) => {
  //   try {
  //     const qty = item.cart_qty;
  //     const updated_qty = qty + 1;
  //     console.log(updated_qty);

  //     const response =await axios.get(
  //       `http://localhost:2222/api/user/cartincrement/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const incrementdata = cartitems.map((details) =>
  //       details._id === id ? { ...cartitems, cart_qty: updated_qty } : item
  //     );
  //     setCartitems(incrementdata);
  //     console.log(incrementdata);
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //     console.log(err.message);
  //   }
  // };

  // const incrementqty = async (id, cart_qty) => {
  //   const prev_qty = cart_qty;

  //   try {
  //     await axios
  //       .get(`http://localhost:2222/api/user/cartincrement/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((data) => {
  //         const updatedQty = data.data.data.cart_qty;
  //         console.log(updatedQty);

  //         const updatedCartItems = cartitems.map((item) => {
  //           if (item._id === id) {
  //             return { ...item, cart_qty: updatedQty };
  //           }
  //           return item;
  //         });

  //         setCartitems(updatedCartItems);
  //         console.log(updatedCartItems);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
          var incre_qty = data.data.incre_qty;
          const updatedQty = cartitems.filter((data) => {
            if (availableQty !== incre_qty) {
              // return data;
              return (cart_qty = cart_qty + 1);
            }
            setCartitems(updatedQty);
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const decrementqty = (id, cart_qty) => {
    const prev_qty = cart_qty;
    console.log(prev_qty);

    // setQty(qty + 1);
    try {
      axios
        .get(`http://localhost:2222/api/user/cartdecrement/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          const decrementdata = cartitems.filter((details) => {
            return details.cart_qty != prev_qty;
          });
          setCartitems(decrementdata);
          console.log("decrement:", decrementdata);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
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
      <button className="cart-orderplace">Make Order</button>
    </div>
  );
};

export default Usercart;
