import React, { useRef } from "react";
import "./Editproduct.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
const Editproduct = () => {
  const ref = useRef();
  const { id } = useParams();
  //   console.log(id);
  const [products, setProducts] = useState({
    name: "",
    description: "",
    purchased_date: "",
    pin_code: "",
    phone_number: "",
    date: "",
    address: "",
    email: "",
  });
  // const [letter, setletter] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/admin/view/${id}`)
      .then((data) => {
        console.log(data.data.data);
        setProducts(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   var date = products.purchased_date
  //   console.log(date);
  //   var newdate = date.split("/").reverse().join("/");
  const editHandler = (event) => {
    const { name, value } = event.target;
    setProducts({ ...products, [name]: value });
    console.log(products);
  };
  return (
    <div>
      {/* <Navbar/> */}
      <div className="edit-main-body">
        <div className="edit-body">
          <div className="edit-sub-body">
            PRODUCT DETAILS
            <div className="edit-content">
              <div className="edit-left">
                <div className="edit-image-sec">
                  <input type="file" id="file-upload" name="image" hidden />
                  <label htmlFor="file-upload">
                    <img src="" alt="" id="edit-product-add" />
                  </label>
                </div>
              </div>
              <div className="edit-right">
                <div className="edit-input-field">
                  <form
                    action=""
                    className="edit-input-field"
                    encType="multipart/formdata"
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={products?.name}
                      className="edit-product-input"
                      onChange={editHandler}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={products.description}
                      className="edit-product-input"
                      onChange={editHandler}
                    />
                    {/* <span>{products.purchased_date}</span> */}
                    <input
                      type="text"
                      placeholder='dd/mm/yyyy'
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
                      type="submit"
                      value={"SUBMIT"}
                      className="edit-product-submit"
                      //   onClick={productSubmit}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editproduct;
