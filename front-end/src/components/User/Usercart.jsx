import React, { useState } from "react";
import "./Usercart.css";
import { useEffect } from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cartView,
  cartdelete,
  decrementqty,
  incrementqty,
} from "../../redux/reducer/CartSlice";

const Usercart = () => {
  const navigate = useNavigate();
  // const [cartitems, setCartitems] = useState([]);
  // console.log("cart length:", cartitems.length);

  const token = sessionStorage.getItem("Token");
  var login_id = sessionStorage.getItem("LoginId");

  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.content.cartitems);
  console.log(cartitems);
  useEffect(() => {
    dispatch(cartView());
  }, []);

  // console.log(cartitems);

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
            <img src="/Empty-cart.png" alt="" className="cart-empty" />{" "}
          </>
        ) : (
          <>
            <div className="cart-items-list">
              {cartitems.map((item) => (
                <div className="cart-items" key={item._id}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(incrementqty(item._id, item));
                      }}
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                    {item.cart_qty}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(decrementqty(item._id, item));
                      }}
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
                      onClick={() => dispatch(cartdelete(item._id))}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-items-number">
              Cart Items: &nbsp; {cartitems.length}
            </div>
            <Link to={"/user/order-place"} className="cart-orderplace">
              Make Order
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Usercart;
