import React, { useEffect, useState } from "react";
import "./Orderplace.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  cartView,
  cartdelete,
  decrementqty,
  incrementqty,
} from "../../redux/reducer/CartSlice";
import Base_URL from "./constant";

const Orderplace = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [profile, setProfile] = useState([
    {
      // address: "",
      // state: "",
      // pin_code: "",
    },
  ]);

  var login_id = sessionStorage.getItem("LoginId");

  // -----------Profile Display-------------

  useEffect(() => {
    axios
      // .get(`http://localhost:2222/api/user/orderplace-address`, {
      .get(`${Base_URL}/api/user/orderplace-address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setProfile(data.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setProfile(err.response.data.message);
        if (err.response.status == 401) {
          toast.error("Session Time Out", {
            position: "bottom-center",
          });
          setTimeout(() => {
            sessionStorage.clear();
            navigate("/login");
          }, 2000);
        }
      });
  }, []);
  console.log(profile);

  // --------Cart Items Display----------

  var id = sessionStorage.getItem("LoginId");

  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.content.cartitems);
  // console.log(cartitems);
  useEffect(() => {
    dispatch(cartView());
  }, []);

  // ----------Order Place ------------

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

          // ---------Order place -----//

          axios
            .post(
              // `http://localhost:2222/api/user/orderplace/${login_id}`,
              `${Base_URL}/api/user/orderplace/${login_id}`,
              cartitems,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((data) => {
              console.log(data.data);
            })
            .catch((err) => {
              console.log(err);
            });
          navigate("/user/order-summary");
        }
      });
    } else {
      navigate("/user/viewproduct");
    }
  };
  console.log(cartitems);

  const addressChange = (e) => {
    // console.log(e);
    // navigate("/");
    const item = sessionStorage.setItem("item", cartitems.length);
  };
  return (
    <div className="order-place-body">
      <Toaster />
      <div className="order-place-card">
        <div className="order-place-card-head"> PLACE ORDER</div>
        <div className="order-place-card-body">
          <div className="order-place-card-personal-info">
            {profile !== "No data" ? (
              <>
                <div className="order-place-card-profile">
                  id : {profile._id}
                </div>
                <div className="order-place-card-profile">
                  name : {profile.name}
                </div>
                <div className="order-place-card-profile">
                  {" "}
                  Phone : {profile.alternate_phone}
                </div>
                <div className="order-place-card-profile">
                  {" "}
                  email : {profile.email}
                </div>
                <div className="order-place-card-profile">
                  {" "}
                  State :{profile.state}
                </div>
                <div className="order-place-card-profile">
                  {" "}
                  District :{profile.district}{" "}
                </div>
                <div className="order-place-card-profile">
                  {" "}
                  Address :{profile.address}{" "}
                </div>
                <div className="order-place-card-profile">
                  Pin code : {profile.pin_code}
                </div>
                <Link
                  className="order-place-card-profile"
                  onClick={addressChange}
                  to={"/user/address"}
                >
                  Change Address{" "}
                </Link>
              </>
            ) : (
              <>
                <h2>Address error !!!</h2>
              </>
            )}
          </div>
          <div className="order-place-card-product">
            {cartitems.length != 0 ? (
              <>
                <div className="order-place-card-product-head">
                  <div className="order-place-product-head-title">Name</div>
                  <div className="order-place-product-head-title-qty">Qty</div>
                  <div className="order-place-product-head-title">Category</div>
                </div>
                <>
                  {cartitems.map((data) => (
                    <div
                      className="order-place-card-product-details"
                      key={data._id}
                    >
                      <div className="order-place-product-details-data">
                        {data.name}
                      </div>
                      <div className="order-place-product-details-data-qty">
                        {data.cart_qty}
                      </div>
                      <div className="order-place-product-details-data">
                        {data.category}
                      </div>
                    </div>
                  ))}
                </>
              </>
            ) : (
              <>
                <h2>No Items</h2>
              </>
            )}
          </div>
        </div>
        <div className="order-place-button">
          <button className="order-place-home-link" onClick={orderplace}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orderplace;
