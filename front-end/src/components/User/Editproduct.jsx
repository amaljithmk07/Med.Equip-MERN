import React, { useRef } from "react";
import "./Editproduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Editproduct = () => {
  const token = sessionStorage.getItem("Token");
  const ref = useRef();
  const { id } = useParams();
  const [products, setProducts] = useState({
    name: "",
    image: "",
    description: "",
    available_qty: "",
    category: "",
    sub_category: "",
    email: "",
    purchased_date: "",
    pin_code: "",
    phone_number: "",
    address: "",
    pin_code: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/user/viewone/${id}`)
      .then((data) => {
        console.log(data.data.data);
        setProducts(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const editHandler = (event) => {
    const { name, value } = event.target;
    setProducts({ ...products, [name]: value });
  };

  const handlePhoto = (e) => {
    const { name } = e.target;
    console.log(name);
    setProducts({ ...products, [name]: e.target.files[0] });
  };
  console.log("new:", products);
  const navigate = useNavigate();

  //////////////////////////////////

  const productSubmit = async (id) => {
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
    try {
      await axios
        .put(`http://localhost:2222/api/user/edit-product/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          navigate("/user/viewproduct");
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <Navbar/> */}
      <div className="edit-main-body">
        <div className="edit-body">
          <div className="edit-sub-body">
            UPDATE PRODUCT DETAILS
            <div className="edit-content">
              <form
                action=""
                className="edit-form-input-field"
                // onSubmit={() => productSubmit(products._id)}
                encType="multipart/form-data"
              >
                <div className="edit-left">
                  <div className="edit-image-sec">
                    <input
                      type="file"
                      id="file-upload"
                      name="image"
                      onChange={handlePhoto}
                      hidden
                    />
                    <label htmlFor="file-upload">
                      <img
                        src={`/upload/${products.image}`}
                        alt=""
                        id="edit-product-add"
                      />
                    </label>
                  </div>
                </div>
                <div className="edit-right">
                  <div className="edit-input-field">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={products.name}
                      className="edit-product-input"
                      onChange={editHandler}
                    />
                    <select
                      onChange={editHandler}
                      // id=""
                      className="edit-product-input-dropdown"
                      name="available_qty"
                      placeholder="Available Qty"
                    >
                      <option disabled={true} value="" selected>
                        {products.available_qty}{" "}
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
                      value={products.description}
                      className="edit-product-input"
                      onChange={editHandler}
                    />
                    {/* <span>{products.purchased_date}</span> */}

                    <select
                      onChange={editHandler}
                      className="edit-product-input-dropdown"
                      name="category"
                      placeholder="Category"

                      // defaultChecked="Category"
                    >
                      {/* <option value="" selected>Category</option> */}
                      <option disabled={true} value="" selected>
                        {products.category}
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
                      onChange={editHandler}
                      className="edit-product-input-dropdown"
                      name="sub_category"
                    >
                      <option disabled={true} value="" selected>
                        {products.sub_category}{" "}
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
                      placeholder="dd/mm/yyyy"
                      name="purchased_date"
                      ref={ref}
                      className="edit-product-input"
                      value={products.purchased_date}
                      onchange={(e) => console.log(e.target.value)}
                      onfocus={() => (ref.current.type = "date")}
                      onblur={() => (ref.current.type = "date")}
                      onChange={editHandler}
                    />
                    {/* <input
                      type="date"
                      label="Date"
                      name="purchased_date"
                      className="edit-product-input"
                      value={products.purchased_date}
                      onChange={editHandler}
                    /> */}
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="edit-product-input"
                      value={products.phone_number}
                      name="phone_number"
                      onChange={editHandler}
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="edit-product-input"
                      value={products.address}
                      name="address"
                      onChange={editHandler}
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      value={products.email}
                      className="edit-product-input"
                      name="email"
                      onChange={editHandler}
                    />
                    <input
                      type="number"
                      placeholder="Pin code"
                      value={products.pin_code}
                      className="edit-product-input"
                      name="pin_code"
                      onChange={editHandler}
                    />
                    <input
                      type="button"
                      value={"UPDATE"}
                      className="edit-product-update"
                      onClick={() => productSubmit(products._id)}
                    />
                    {/* <button
                      type="button"
                      // value={"UPDATE"}
                      className="edit-product-update"
                        onClick={()=>productSubmit(products._id)}
                    >Update</button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editproduct;
