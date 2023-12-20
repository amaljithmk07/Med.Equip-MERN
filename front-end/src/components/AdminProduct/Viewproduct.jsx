import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Viewproduct.css";
import { Link } from "react-router-dom";

const Viewproduct = () => {
  const [product, setproduct] = useState([]);
  const token = localStorage.getItem("Token");
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/admin/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setproduct(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:2222/api/admin/delete/${id}`)
      .then((data) => {
        console.log(data);
        // Navigate("/admin/viewproduct");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(id);
  };

  return (
    <div className="view-main-body">
      {/* <Navbar /> */}
      {product.length > 0 ? (
        <div className="view-content-body">
          <div className="view-cards-body">
            {product.map((item) => (
              <div className="view-card" key={item._id}>
                <div className="view-card-image">
                  <img
                    src={`/upload/${item.image}`}
                    alt=""
                    className="card-image"
                  />
                </div>
                <div className="view-card-details">
                  <h3> {item.name}</h3>
                  <h4> {item.available_qty}</h4>
                  <h4> {item.description}</h4>
                  <h4> {item.phone_number}</h4>
                  <h4> {item.purchased_date}</h4>
                </div>
                <div className="view-card-buttons">
                  <Link className="edit" to={`/admin/editproduct/${item._id}`}>
                    <button className="edit">Edit</button>
                  </Link>
                  {/* <Link className="delete"> */}
                  <button
                    className="delete"
                    onClick={() => deleteHandler(item._id)}
                  >
                    Delete
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <img src="/no-data.png" alt="" className="no-data" />
      )}
    </div>
  );
};

export default Viewproduct;
