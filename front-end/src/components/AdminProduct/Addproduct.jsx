import React, { useState } from "react";
import "./Addproduct.css";
import axios, { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Addproduct = () => {
  const role = localStorage.getItem("Role");
  const token = localStorage.getItem("Token");
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  const keyHandler = (event) => {
    const { name, value } = event.target;
    setProducts({ ...products, [name]: value });
  };
  const handlePhoto = (event) => {
    const { name } = event.target;

    // const value = e.target.files[0];
    // console.log(value);
    setProducts({ ...products, [name]: event.target.files[0] });
  };
  console.log(products);
  const productSubmit = (event) => {
    // event.preventDefault();
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
    axios
      .post(`http://localhost:2222/api/admin/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        navigate("/admin/viewproduct");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {role == 1 && token !== null ? (
        <div className="product-main-body">
          {/* <Navbar/> */}
          <div className="product-body">
            <div className="product-sub-body">
              ADD PRODUCT DETAILS
              <div className="product-content">
                <form
                  action=""
                  className="form-input-field"
                  encType="multipart/formdata"
                  // onSubmit={productSubmit}
                >
                  <div className="content-left">
                    <div className="image-sec">
                      <input
                        type="file"
                        id="file-upload"
                        name="image"
                        hidden
                        onChange={handlePhoto}
                      />
                      <label htmlFor="file-upload">
                        <img
                          src="/admin-product-add-1.png"
                          alt=""
                          id="admin-product-add"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="content-right">
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="admin-product-input"
                        onChange={keyHandler}
                      />
                      <select
                        onChange={keyHandler}
                        // id=""
                        className="admin-product-input-dropdown"
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
                        className="admin-product-input"
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
                        className="admin-product-input-dropdown"
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
                      {/* <input
                    type"text"                    placeholder="Category"
                    className="admin-product-input"
                    name="category"
                    onChange={keyHandler}
                  /> */}
                      {/* <input
                    type="text"
                    placeholder="Sub Category"
                    className="admin-product-input"
                    name="sub_category"
                    onChange={keyHandler}
                  /> */}
                      <input
                        type="text"
                        placeholder="Email"
                        className="admin-product-input"
                        name="email"
                        onChange={keyHandler}
                      />
                      <input
                        type="date"
                        placeholder="Purchase date"
                        name="purchased_date"
                        className="admin-product-input"
                        onChange={keyHandler}
                      />
                      <input
                        type="number"
                        placeholder="Phone Number"
                        className="admin-product-input"
                        name="phone_number"
                        onChange={keyHandler}
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        className="admin-product-input"
                        name="address"
                        onChange={keyHandler}
                      />
                      <input
                        type="number"
                        placeholder="Pin code"
                        className="admin-product-input"
                        name="pin_code"
                        onChange={keyHandler}
                      />
                      <input
                        type="button"
                        value={"SUBMIT"}
                        className="admin-product-submit"
                        onClick={productSubmit}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>You are not an admin</>
      )}
    </>
  );
};

export default Addproduct;
