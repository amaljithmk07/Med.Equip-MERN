import React from "react";
import { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import "./Userviewproduct.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Usernavbar from "../UserNavbar/Usernavbar";
const Userviewproduct = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);
  const token = localStorage.getItem("Token");
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/user/view`, {
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
        toast.warning("Ran out of time !!!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setTimeout(() => {
        //   localStorage.clear();
        //   navigate("/login");
        // }, 5000);
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
  const cartHandler = (item) => {
    axios
      .post(`http://localhost:2222/api/user/addtocart`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        toast.success("Add to cart successfully !!!", {
          position: "bottom-center",
          autoClose: 400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/usercart");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <div className="user-view-main-body">
      <ToastContainer />
      {/* <Usernavbar/> */}
      {product.length > 0 ? (
        <div className="user-view-content-body">
          <div className="user-view-cards-body">
            <div className="user-view-cards-heading">PRODUCTS LISTS</div>
            {product.map((item) => (
              <div className="user-view-card" key={item._id}>
                <div className="user-view-card-image">
                  <img
                    src={`/upload/${item.image}`}
                    alt=""
                    className="user-card-image"
                  />
                </div>
                <div className="user-view-card-details">
                  <h3> {item.name}</h3>
                  <h4> {item.available_qty}</h4>
                  <h4> {item.category}</h4>
                  <h4> {item.sub_category}</h4>
                  <h4> {item.description}</h4>
                  {/* {anime == true ? (
                    <img
                      src="/addtocartanimation.gif"
                      className="addtocartanime"
                    />
                  ) : (
                    <></>
                  )} */}
                </div>
                <div className="user-view-card-buttons">
                  <div className="user-btn-sec">
                    <button
                      className="user-addtocart"
                      onClick={() => cartHandler(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="user-btn-sec">
                    <Link className="user-edit" to={``}>
                      <button className="user-edit">Edit</button>
                    </Link>
                    {/* <Link className="delete"> */}
                    <button
                      className="user-delete"
                      onClick={() => deleteHandler(item._id)}
                    >
                      Delete
                    </button>

                    {/* </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <img src="/user-no-data.png" alt="" className="user-no-data" />
      )}
    </div>
  );
};

export default Userviewproduct;
