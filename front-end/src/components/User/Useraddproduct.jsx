import React, { useState } from "react";
import "./Useraddproduct.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Usernavbar from "../UserNavbar/Usernavbar";

const Useraddproduct = () => {
  const token = sessionStorage.getItem("Token");
  const uuid = sessionStorage.getItem("uuid");
  console.log(uuid);
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  const keyHandler = (event) => {
    const { name, value } = event.target;
    setProducts({ ...products, [name]: value });
  };
  const handlePhoto = (e) => {
    const { name } = e.target;
    setProducts({ ...products, [name]: e.target.files[0] });
    console.log(e.target.files[0].name);
  };
  console.log(products);
  const productSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", products.image);
    formData.append("name", products.name);
    formData.append("description", products.description);
    formData.append("available_qty", products.available_qty);
    formData.append("category", products.category);
    formData.append("sub_category", products.sub_category);
    formData.append("email", products.email);
    formData.append("purchased_date", products.purchased_date);
    formData.append("phone_number", products.phone_number);
    formData.append("address", products.address);
    formData.append("pin_code", products.pin_code);
    console.log(products);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    try {
      axios
        .post(`http://localhost:2222/api/user/add`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data);
          // window.location.reload()
          navigate("/user/viewproduct");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("catch :", err);
    }
  };

  return (
    <>
      {uuid !== null && token !== null ? (
        <div className="useraddproduct-main-body">
          {/* <Usernavbar/> */}
          <div className="user-addproduct-body">
            <div className="user-addproduct-sub-body">
              ADD PRODUCT DETAILS
              <div className="user-addproduct-content">
                <form
                  action=""
                  className="userforminput-field"
                  onSubmit={productSubmit}
                  encType="multipart/formdata"
                >
                  <div className="usercontent-left">
                    <div className="userimage-sec">
                      <input
                        type="file"
                        id="file-upload"
                        name="image"
                        onChange={handlePhoto}
                        hidden
                      />
                      <label htmlFor="file-upload">
                        <img
                          src="/admin-product-add-1.png"
                          alt=""
                          id="user-product-add"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="usercontent-right">
                    <div className="userinput-field">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="user-product-input"
                        onChange={keyHandler}
                      />
                      <select
                        onChange={keyHandler}
                        // id=""
                        className="user-product-input-dropdown"
                        name="available_qty"
                        placeholder="Category"
                      >
                        <option disabled={true} value="" selected>
                          Available Quantity
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        className="user-product-input"
                        onChange={keyHandler}
                      />
                      <select
                        onChange={keyHandler}
                        className="admin-product-input-dropdown"
                        name="category"
                        placeholder="Category"

                        // defaultChecked="Category"
                      >
                        {/* <option value="" selected>Category</option> */}
                        <option disabled={true} value="" selected>
                          Category
                        </option>

                        <option value="Beds"> Beds</option>
                        <option value="Wheel chair"> Wheel chair</option>
                        <option value="Oxygen Concentrators">
                          Oxygen Concentrators
                        </option>
                        <option value="Walking Aids"> Walking Aids</option>
                        <option value="Patient Lift"> Patient Lift</option>
                      </select>
                      <select
                        onChange={keyHandler}
                        className="user-product-input-dropdown"
                        name="sub_category"
                      >
                        <option disabled={true} value="" selected>
                          Sub Category
                        </option>
                        {products.category == "Beds" ? (
                          <>
                            <option value="Adjustable Beds">
                              Adjustable Beds
                            </option>
                            <option value="Mattresses"> Mattresses</option>
                            <option value="Home Care Beds">
                              {" "}
                              Home Care Beds
                            </option>
                          </>
                        ) : (
                          ""
                        )}
                        {products.category == "Wheel chair" ? (
                          <>
                            <option value="Manual Wheel chair">
                              Manual Wheel chair
                            </option>
                            <option value="Power Wheel chair">
                              {" "}
                              Power Wheel chair
                            </option>
                            <option value="Standard"> Standard</option>
                            <option value="Light Weight">Light Weight</option>
                            <option value="Cushions And Accessories">
                              {" "}
                              Cushions And Accessories
                            </option>
                            <option value="Batteries And Chargers">
                              {" "}
                              Batteries And Chargers
                            </option>
                            <option value="Wheels"> Wheels</option>
                          </>
                        ) : (
                          ""
                        )}
                        {products.category == "Oxygen Concentrators" ? (
                          <>
                            <option value="Stationary Units">
                              {" "}
                              Stationary Units
                            </option>
                            <option value="Portable Units">
                              {" "}
                              Portable Units
                            </option>
                          </>
                        ) : (
                          ""
                        )}

                        {products.category == "Walking Aids" ? (
                          <>
                            <option value="Walkers"> Walkers</option>
                            <option value="Rollator"> Rollator</option>
                            <option value="Knee Roller"> Knee Roller</option>
                            <option value="Upright Walker">
                              {" "}
                              Upright Walker
                            </option>
                          </>
                        ) : (
                          ""
                        )}
                        {products.category == "Patient Lift" ? (
                          <>
                            <option value="Male"> Manual Lift</option>
                            <option value="Male"> Power Lift</option>
                            <option value="Male"> Stand-up Lift</option>
                            <option value="Male"> Heavy Duty Lift</option>
                          </>
                        ) : (
                          ""
                        )}
                      </select>
                      <input
                        type="text"
                        placeholder="Email"
                        className="user-product-input"
                        name="email"
                        onChange={keyHandler}
                      />
                      <input
                        type="date"
                        placeholder="Purchase date"
                        name="purchased_date"
                        className="user-product-input"
                        onChange={keyHandler}
                      />
                      <input
                        type="number"
                        placeholder="Phone Number"
                        className="user-product-input"
                        name="phone_number"
                        onChange={keyHandler}
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        className="user-product-input"
                        name="address"
                        onChange={keyHandler}
                      />

                      <input
                        type="number"
                        placeholder="Pin code"
                        className="user-product-input"
                        name="pin_code"
                        onChange={keyHandler}
                      />
                      <input
                        type="submit"
                        value={"SUBMIT"}
                        className="user-product-submit"
                        // onClick={productSubmit}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {token == null ? (
            <div className="login-first-body">
              <Link to={"/login"} className="login-first-body-link">
                <img src="/login-first.png" alt="" className="login-first" />
              </Link>
            </div>
          ) : (
            <>
              {uuid == null ? (
                <div className="login-first-body">
                  <Link to={"/uuidverify"} className="login-first-body-link">
                    <img
                      src="/login-first.png"
                      alt=""
                      className="login-first"
                    />
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Useraddproduct;
