import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Donatedproducts.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Donatedproducts = () => {
  const navigate = useNavigate();
  const [donatedproduct, setDonatedproduct] = useState([]);

  const token = sessionStorage.getItem("Token");

  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/user/donated-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setDonatedproduct(data.data.data);
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

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:2222/api/user/delete/${id}`)
      .then((data) => {
        console.log(data);
        window.location.reload();
        navigate("/user/viewproduct");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(id);
  };

  return (
    <div className="donatedproducts-main-body">
      <Toaster />
      {/* <Usernavbar/> */}
      {donatedproduct.length > 0 ? (
        <div className="donatedproducts-content-body">
          <div className="donatedproducts-cards-body">
            <div className="donatedproducts-cards-heading">
              DONATED PRODUCTS
            </div>
            {donatedproduct.map((item) => (
              <div className="donatedproducts-card" key={item._id}>
                <div className="donatedproducts-card-image-sec">
                  <img
                    src={`/upload/${item.image}`}
                    alt=""
                    className="donatedproducts-card-image"
                  />
                </div>
                <div className="donatedproducts-card-details">
                  <h3 className="donatedproducts-card-details-h3">
                    {" "}
                    {item.name}
                  </h3>
                  <h4 className="donatedproducts-card-details-h4">
                    {" "}
                    {item.available_qty} qty
                  </h4>
                  <h4 className="donatedproducts-card-details-h4">
                    {" "}
                    {item.category}
                  </h4>
                  <h4 className="donatedproducts-card-details-h4">
                    {" "}
                    {item.sub_category}
                  </h4>
                  <h4 className="donatedproducts-card-details-h4">
                    {" "}
                    {item.description}
                  </h4>
                </div>
                <div className="donatedproducts-card-buttons">
                  <Link
                    className="donatedproducts-edit"
                    to={`/user/editproduct/${item._id}`}
                  >
                    Edit
                  </Link>
                  <div
                    className="donatedproducts-delete"
                    onClick={() => deleteHandler(item._id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <img
          src="/user-no-data.png"
          alt=""
          className="donatedproducts-no-data"
        />
      )}
    </div>
  );
};

export default Donatedproducts;
