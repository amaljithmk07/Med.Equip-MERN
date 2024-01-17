import React, { useEffect, useState } from "react";
import "./Address.css";
import axios from "axios";
const Address = () => {
  const token = localStorage.getItem("Token");
  const [savedaddress, setSavedaddress] = useState([{}]);
  const [address, setAddress] = useState([{}]);
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
      });
  }, []);

  //Primary Address
  const primaryaddress = (id) => {
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addressInput = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  //Address Add
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
      <div className="address-body">
        <div className="address-sub-body">
          <div className="saved-address">
            <div className="saved-address-head">Saved New Address</div>
            <div className="saved-address-body">
              {savedaddress.map((details) => (
                <div className="saved-address-sec" key={details._id}>
                  <div className="radio-btn">
                    <input
                      type="radio"
                      id="primary"
                      name="category"
                      onClick={() => primaryaddress(details._id)}
                    />
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
                </div>
              ))}
            </div>
          </div>
          <div className="add-address">
            <div className="add-address-head">Add New Address</div>
            <div className="add-address-body">
              <div className="add-address-sec">
                Name: <input type="text" name="name" onChange={addressInput} />
                state:{" "}
                <input type="text" name="state" onChange={addressInput} />
                district:{" "}
                <input type="text" name="district" onChange={addressInput} />
                address:{" "}
                <input type="text" name="address" onChange={addressInput} />
                pin code:{" "}
                <input type="text" name="pin_code" onChange={addressInput} />
                type of address:{" "}
                {/* <input
                  type="radio"
                  id="home"
                  name="address_type"
                  value="home"
                />
                home
                <input
                  type="radio"
                  id="office"
                  name="address_type"
                  value="office"
                />
                office ---- */}
                <input
                  type="text"
                  name="address_type"
                  onChange={addressInput}
                />
                alternate phone:{" "}
                <input
                  type="text"
                  name="alternate_phone"
                  onChange={addressInput}
                />
              </div>
            </div>
            <button onClick={() => addAddress()}>Add Address</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
