import React, { useEffect, useState } from "react";
import "./Orderplace.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  cartView,
  cartdelete,
  decrementqty,
  incrementqty,
} from "../../redux/reducer/CartSlice";

const Orderplace = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [profile, setProfile] = useState([
    {
      address: "",
      state: "",
      pin_code: "",
    },
  ]);

  var login_id = localStorage.getItem("LoginId");

  // -----------Profile Display-------------

  useEffect(() => {
    const userprofile = `http://localhost:2222/api/user/profile`;
    axios
      .get(userprofile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data[0]);
        setProfile(data.data.data[0]);
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

  // --------Cart Items Display----------

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
            })
            .catch((err) => {
              console.log(err);
            });

          // ---------User sending order status 'pending' to volunteer-----//

          axios
            .post(
              `http://localhost:2222/api/volunteer/order-status/${login_id}`,
              {},
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

  // ------------User Profile Update--------------

  var id = localStorage.getItem("LoginId");

  const profileUpdate = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // const profileUpdateHandler = (e) => {
  //   // console.log(e);
  //   axios
  //     .post(`http://localhost:2222/api/user/profileupdate/${id}`, profile, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  
  
  console.log(profile.address);
  return (
    <div className="order-place-body">
      <div className="order-place-card">
        <div className="order-place-card-head">ORDER PLACE</div>
        <div className="order-place-card-body">
          <div
            className="order-place-card-personal-info"
            // onMouseLeave={profileUpdateHandler}
          >
            <div className="order-place-card-profile">id : {profile._id}</div>
            <div className="order-place-card-profile">
              name : {profile.name}
            </div>
            <div className="order-place-card-profile">
              {" "}
              Phone : {profile.phone_number}
            </div>
            <div className="order-place-card-profile">
              {" "}
              email : {profile.email}
            </div>
            <div className="order-place-card-profile">
              {" "}
              Address :{" "}
              <input
                required
                type="text"
                name="address"
                value={profile.address}
                className="order-place-card-profile-input"
                onChange={profileUpdate}
              />{" "}
            </div>
            <div className="order-place-card-profile">
              {" "}
              State :{" "}
              <input
                required
                type="text"
                name="state"
                className="order-place-card-profile-input"
                value={profile.state}
                onChange={profileUpdate}
              />{" "}
            </div>
            <div className="order-place-card-profile">
              Pin code :{" "}
              <input
                required
                type="number"
                className="order-place-card-profile-input"
                name="pin_code"
                value={profile.pin_code}
                onChange={profileUpdate}
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
              />{" "}
            </div>
          </div>
          <div className="order-place-card-product">
            <div className="order-place-card-product-head">
              <div className="order-place-product-head-title">Name</div>
              <div className="order-place-product-head-title-qty">Qty</div>
              <div className="order-place-product-head-title">Category</div>
            </div>
            <>
              {" "}
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
          </div>
        </div>
        <div className="order-place-button">
          <button className="order-place-home-link" onClick={orderplace}>
            Place Order{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orderplace;
