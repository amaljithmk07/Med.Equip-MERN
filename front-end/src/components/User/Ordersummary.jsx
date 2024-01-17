import React, { useEffect, useState } from "react";
import "./Ordersummary.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Ordersummary = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [profile, setProfile] = useState({});

  const [orders, setOrders] = useState([]);
  var login_id = localStorage.getItem("LoginId");

  useEffect(() => {
    const userprofile = `http://localhost:2222/api/user/profile`;
    axios
      .get(userprofile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(data.data.data[0]);
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
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/user/ordersummary/${login_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(data.data);
        setOrders(data.data.data);
      })
      .catch((err) => {
        // console.log(err);
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
  console.log(orders);
  console.log(profile);
  return (
    <div className="order-body">
      <div className="order-card">
        <div className="order-card-head">ORDER SUMMARY</div>
        <div className="order-card-body">
          <div className="order-card-personal-info">
            <div className="card-profile">id : {profile._id}</div>
            <div className="card-profile">name : {profile.name}</div>
            <div className="card-profile"> Phone : {profile.phone_number}</div>
            <div className="card-profile"> email : {profile.email}</div>
            <div className="card-profile"> address : {profile.address}</div>
            <div className="card-profile"> state : {profile.state}</div>
            <div className="card-profile"> pincode : {profile.pin_code}</div>
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
                      <div className="product-details-data-orderplaced">
                        {data.orderstatus}
                        <img
                          src="/order-delivered-tick.png"
                          alt=""
                          className="order-placed-tick"
                        />
                      </div>
                    ) : (
                      <div className="product-details-data">
                        {data.orderstatus}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <h2>NO DATA FOUND !</h2>
            )}
          </div>
          <div className="order-button">
            <Link to={"/home"} className="order-home-link">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordersummary;
