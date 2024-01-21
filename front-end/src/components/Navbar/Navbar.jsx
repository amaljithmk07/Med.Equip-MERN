import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Userproduct from "../User/Home";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { cartView } from "../../redux/reducer/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Token = sessionStorage.getItem("Token");
  const Role = sessionStorage.getItem("Role");
  console.log("Role:", Role);
  const Logout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem("uuid");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(cartView());
  }, [dispatch]);

  const cartitems = useSelector((state) => state.content.cartitems);
  const isLoading = useSelector((state) => state.content.isLoading);
  const error = useSelector((state) => state.content.error);

  if (isLoading) {
    // return "loading...";
  }

  if (error) {
    // return error;
  }
  // console.log(contents);
  // console.log(contents.length);
  return (
    <div className="general-navbar">
      <Toaster />

      <div className="general-med-logo">
        <img src="/logo1.png" alt="" id="general-med-logo-png" />
        Medical Equipment
      </div>
      <div className="general-nav">
        <div className="general-sub">
          <ul>
            <li>
              <Link to={"/home"} className="general-a">
                Home
              </Link>
            </li>
            {Token !== null && Role == 2 ? (
              <>
                <li>
                  <Link to={"/uuidverify"} className="general-a">
                    Sell Products
                  </Link>
                </li>
                <li>
                  <Link to={"/user/viewproduct "} className="general-a">
                    View Products
                  </Link>
                </li>
                <li>
                  <Link to={"/usercart"} className="general-a">
                    Cart{" "}
                    <sup>
                      {cartitems != 0 ? (
                        <div className="cart-sup"> {cartitems.length}</div>
                      ) : (
                        <></>
                      )}{" "}
                    </sup>
                  </Link>
                </li>
                <li>
                  <Link to={"/user/order-summary"} className="general-a">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to={"/user/donated-products"} className="general-a">
                    Donated Products
                  </Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                {Token !== null && Role == 1 ? (
                  <>
                    <li>
                      <Link to={"/admin/Addproduct"} className="general-a">
                        Add Products
                      </Link>
                    </li>
                    <li>
                      <Link to={"/admin/viewproduct"} className="general-a">
                        View Products
                      </Link>
                    </li>
                    <li>
                      <Link to={"/volunteer/list"} className="general-a">
                        {" "}
                        volunteer List
                      </Link>
                    </li>

                    <li>
                      <Link to={"/volunteer/request"} className="general-a">
                        Volunteer Request
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {Token !== null && Role == 3 ? (
                      <>
                        <li>
                          <Link
                            to={"/volunteer/order-request"}
                            className="general-a"
                          >
                            Order Request
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/volunteer/accepted-orders"}
                            className="general-a"
                          >
                            Accepted Orders
                          </Link>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}

            {Token !== null ? (
              <>
                <li>
                  <Link to={"/profile"} className="general-a">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={""} onClick={Logout} className="general-a">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/login "} className="general-a">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/register"} className="general-a">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to={"/volunteer"} className="general-a">
                    Volunteer
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
