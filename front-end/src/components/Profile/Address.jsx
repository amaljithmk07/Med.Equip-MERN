import React, { useEffect, useState } from "react";
import "./Address.css";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [savedaddress, setSavedaddress] = useState([{}]);
  const [address, setAddress] = useState({});
  // Address View
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/user/view-address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setSavedaddress(data.data.data);
      })
      .catch((err) => {
        console.log(err);
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

  // set Primary Address

  const primaryaddress = (id) => {
    // console.log(savedaddress);
    axios
      .put(
        `http://localhost:2222/api/user/primary-address/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        const nulladdress = savedaddress.filter((data) => {
          data.category = "";
          return data;
        });
        const updatedaddress = nulladdress.filter((data) => {
          console.log(data);
          if (data._id == id) {
            data.category = "primary";
          }
          console.log(data);
          return data;
        });
        console.log(updatedaddress);

        setSavedaddress(updatedaddress);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Address Add

  const addressInput = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  const addAddress = (e) => {
    axios
      .post(`http://localhost:2222/api/user/add-address`, address, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(address);

  return (
    <div>
      <Toaster />
      <div className="address-body">
        <div className="address-sub-body">
          <div className="saved-address">
            <div className="saved-address-head">Saved Address</div>
            <div className="saved-address-body">
              {savedaddress.map((details) => (
                <div className="saved-address-sec" key={details._id}>
                  <div className="radio-btn-sec">
                    {details.category == "primary" ? (
                      <input
                        type="radio"
                        id="primary"
                        name="category"
                        checked
                        onClick={() => primaryaddress(details._id)}
                      />
                    ) : (
                      <input
                        type="radio"
                        id=""
                        name="category"
                        onClick={() => primaryaddress(details._id)}
                      />
                    )}
                  </div>
                  <div className="saved-address-details">
                    <div className="s-a-personal">
                      <div className="s-a-name">{details.name}</div>
                      <div className="s-a-type"> {details.address_type}</div>
                      <div className="s-a-name"> {details.alternate_phone}</div>
                    </div>
                    <div className="s-a-address">
                      {details.address},{details.state},{details.district},
                      {details.pin_code}
                    </div>
                  </div>
                  <div className="saved-address-edit-delete">edit</div>
                </div>
              ))}
            </div>
          </div>
          <div className="add-address">
            <div className="add-address-head">Add New Address</div>
            <div className="add-address-body">
              <div className="add-address-sec">
                <div className="add-address-sec-left">
                  <div className="add-address-input-sec">
                    Name:{" "}
                    <input
                      type="text"
                      name="name"
                      onChange={addressInput}
                      className="add-address-input"
                    />
                  </div>
                  <div className="add-address-input-sec">
                    state:{" "}
                    <input
                      type="text"
                      name="state"
                      onChange={addressInput}
                      className="add-address-input"
                    />
                  </div>
                  <div className="add-address-input-sec">
                    district:{" "}
                    <input
                      type="text"
                      className="add-address-input"
                      name="district"
                      onChange={addressInput}
                    />
                  </div>
                  <div className="add-address-input-sec">
                    address:{" "}
                    <input
                      type="text"
                      name="address"
                      className="add-address-input"
                      onChange={addressInput}
                    />
                  </div>
                </div>
                <div className="add-address-sec-right">
                  <div className="add-address-input-sec">
                    pin code:{" "}
                    <input
                      type="text"
                      name="pin_code"
                      className="add-address-input"
                      onChange={addressInput}
                    />{" "}
                  </div>
                  <div className="add-address-input-sec">
                    {" "}
                    phone:{" "}
                    <input
                      type="text"
                      className="add-address-input"
                      name="alternate_phone"
                      onChange={addressInput}
                    />
                  </div>
                  <div className="add-address-input-sec">
                    {" "}
                    Address type:{" "}
                    <div className="add-address-input-radio">
                      <input
                        type="radio"
                        id="home"
                        name="address_type"
                        className="add-address-radio"
                        onChange={addressInput}
                        value="home"
                      />
                      home
                      <input
                        type="radio"
                        id="work"
                        className="add-address-radio"
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
            <button onClick={() => addAddress()} className="add-address-btn">
              Add Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
