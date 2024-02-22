import React, { useEffect, useState } from "react";
import "./Ordersummary.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Base_URL from "./constant";

const Ordersummary = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [profile, setProfile] = useState({});

  const [orders, setOrders] = useState([]);
  var login_id = sessionStorage.getItem("LoginId");

  // ----------Profile View-----------

  useEffect(() => {
    // const userprofile = `http://localhost:2222/api/user/profile-address`;
    const userprofile = `${Base_URL}/api/user/profile-address`;
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
        // console.log(err.response.data.message);
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

  // -----Order List--------

  useEffect(() => {
    axios
      // .get(`http://localhost:2222/api/user/ordersummary/${login_id}`, {
      .get(`${Base_URL}/api/user/ordersummary/${login_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log("order Summary", data.data.data);
        setOrders(data.data.data);
      })
      .catch((err) => {
        // console.log(err);
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
  console.log(orders);
  console.log(profile);

  ////////////

  return (
    <div className="order-body">
      <div className="order-card">
        <div className="order-card-head">ORDER SUMMARY</div>
        <div className="order-card-body">
          <div className="order-card-personal-info">
            {profile !== "No data" ? (
              <>
                <div className="card-profile">id : {profile._id}</div>
                <div className="card-profile">name : {profile.name}</div>
                <div className="card-profile">
                  {" "}
                  Phone : {profile.alternate_phone}
                </div>
                <div className="card-profile"> email : {profile.email}</div>
                <div className="card-profile"> address : {profile.address}</div>
                <div className="card-profile"> state : {profile.state}</div>
                <div className="card-profile">
                  {" "}
                  district : {profile.district}
                </div>
                <div className="card-profile">
                  {" "}
                  pincode : {profile.pin_code}
                </div>
              </>
            ) : (
              <>
                <h2>Address error !!!</h2>
              </>
            )}
          </div>
          <div className="order-card-product">
            {orders.length != 0 ? (
              <>
                <div className="order-card-product-head">
                  <div className="product-head-title">Name</div>
                  <div className="product-head-title-qty">Qty</div>
                  <div className="product-head-title">Category</div>
                  <div className="product-head-title">Sub Category</div>
                  <div className="product-head-title">Status</div>
                </div>{" "}
                {orders.map((data) => (
                  <div className="order-card-product-details" key={data._id}>
                    <div className="product-details-data">{data.name}</div>
                    <div className="product-details-data-qty">
                      {data.cart_qty}
                    </div>
                    <div className="product-details-data">{data.category}</div>
                    <div className="product-details-data">
                      {data.sub_category}
                    </div>

                    {data.orderstatus == "Delivered" ? (
                      <Link
                        className="product-details-data-view-details-delivered"
                        to={`/volunteer/view-details/${data._id}`}
                      >
                        View Details{" "}
                      </Link>
                    ) : (
                      <Link
                        className="product-details-data-view-details"
                        to={`/volunteer/view-details/${data._id}`}
                      >
                        View Details{" "}
                      </Link>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <h2>NO DATA FOUND !</h2>
            )}
          </div>
          <div className="order-button">
            <Link to={"/user/viewproduct"} className="order-home-link">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordersummary;
