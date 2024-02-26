import React, { useEffect, useState } from "react";
import "./Updateaddress.css";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Base_URL from "../Constant/constant";

const Updateaddress = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("Token");

  const [editaddress, setEditaddress] = useState({
    name: "",
    district: "",
    state: "",
    address: "",
    email: "",
    alternate_phone: "",
    pin_code: "",
    alternate_phone: "",
    address_type: "",
  });

  const addressInput = (e) => {
    const { name, value } = e.target;
    setEditaddress({ ...editaddress, [name]: value });
  };
  const { id } = useParams();

  console.log(editaddress);
  // Address View

  useEffect(() => {
    axios
      // .get(`http://localhost:2222/api/user/singleview-address/${id}`, {
      .get(`${Base_URL}/api/user/singleview-address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(data);
        setEditaddress(data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateAddress = (id) => {
    axios
      // .put(`http://localhost:2222/api/user/update-address/${id}`, editaddress, {
      .put(`${Base_URL}/api/user/update-address/${id}`, editaddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        // setEditaddress(data.data.data[0]);
        navigate("/user/address");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Toaster />
      <div className="update-address-main-body">
        <div className="update-address-sub-body">
          <div className="update-address">
            <div className="update-address-head">Update Address</div>
            <div className="update-address-body">
              <div className="update-address-sec">
                <div className="update-address-sec-left">
                  <div className="update-address-input-sec">
                    Name:{" "}
                    <input
                      type="text"
                      name="name"
                      value={editaddress.name}
                      onChange={addressInput}
                      className="update-address-input"
                    />
                  </div>
                  <div className="update-address-input-sec">
                    state:{" "}
                    <input
                      type="text"
                      name="state"
                      value={editaddress.state}
                      onChange={addressInput}
                      className="update-address-input"
                    />
                  </div>
                  <div className="update-address-input-sec">
                    district:{" "}
                    <input
                      type="text"
                      className="update-address-input"
                      value={editaddress.district}
                      name="district"
                      onChange={addressInput}
                    />
                  </div>
                  <div className="update-address-input-sec">
                    address:{" "}
                    <input
                      type="text"
                      value={editaddress.address}
                      name="address"
                      className="update-address-input"
                      onChange={addressInput}
                    />
                  </div>
                </div>
                <div className="update-address-sec-right">
                  <div className="update-address-input-sec">
                    email:{" "}
                    <input
                      type="text"
                      value={editaddress.email}
                      name="email"
                      className="update-address-input"
                      onChange={addressInput}
                    />{" "}
                  </div>
                  <div className="update-address-input-sec">
                    pin code:{" "}
                    <input
                      type="number"
                      value={editaddress.pin_code}
                      name="pin_code"
                      className="update-address-input"
                      onChange={addressInput}
                    />{" "}
                  </div>
                  <div className="update-address-input-sec">
                    {" "}
                    phone:{" "}
                    <input
                      type="number"
                      value={editaddress.alternate_phone}
                      className="update-address-input"
                      name="alternate_phone"
                      onChange={addressInput}
                    />
                  </div>
                  <div className="update-address-input-sec">
                    {" "}
                    Address type:{" "}
                    <div className="update-address-input-radio-sec">
                      <div className="update-address-input-radio">
                        <input
                          type="radio"
                          id="home"
                          name="address_type"
                          className="update-address-radio"
                          onChange={addressInput}
                          value="home"
                        />
                        home
                      </div>
                      <div className="update-address-input-radio">
                        <input
                          type="radio"
                          id="work"
                          className="update-address-radio"
                          name="address_type"
                          onChange={addressInput}
                          value="work"
                        />
                        work
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => updateAddress(editaddress._id)}
              className="update-address-btn"
            >
              Update Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateaddress;
