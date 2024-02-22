import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Viewproduct.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Base_URL from "./constant";


const Viewproduct = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);
  const [search, setsearch] = useState({});
  // const [saveditem, setsaveditem] = useState(true);
  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("Role");
  useEffect(() => {
    if (role == 2) {
      //Products User View

      axios
        // .get(`http://localhost:2222/api/user/view`, {
        .get(`${Base_URL}/api/user/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data.data.data);
          const approvedproducts = data.data.data.filter((data) => {
            return data.product_status == "Approved";
          });
          setproduct(approvedproducts);
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
            }, 3000);
          }
        });
    } else {
      //Products Admin  View

      axios
        // .get(`http://localhost:2222/api/user/view`, {
        .get(`${Base_URL}/api/user/view`, {
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
          if (err.response.status == 401) {
            toast.error("Session Time Out", {
              position: "bottom-center",
            });
            setTimeout(() => {
              sessionStorage.clear();
              navigate("/login");
            }, 3000);
          }
        });
    }
  }, []);

  //Add to Cart

  const cartHandler = (item) => {
    axios
      // .post(`http://localhost:2222/api/user/addtocart`, item, {
      .post(`${Base_URL}/api/user/addtocart`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        toast.success("Add to cart successfully !", {
          position: "bottom-center",
        });
        setTimeout(() => {
          navigate("/user/cart");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchInput = (e) => {
    const { name, value } = e.target;
    setsearch({ [name]: value });
  };
  console.log(search);
  const searchsubmit = (e) => {
    const searchdata = product.filter((data) => {
      return data.name == search.search;
    });
    setproduct(searchdata);
  };

  const savedItemHandler = (id, wishlist) => {
    // console.log(wishlist);
    if (wishlist == "") {
      axios
        // .put(`http://localhost:2222/api/user/wishlist/${id}`, {})
        .put(`${Base_URL}/api/user/wishlist/${id}`, {})
        .then((data) => {
          const filter = product.filter((data) => {
            if (data._id == id) {
              return (data.wishlist = "approved");
            }
            return data;
          });
          setproduct(filter);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        // .put(`http://localhost:2222/api/user/wishlist-remove/${id}`, {})
        .put(`${Base_URL}/api/user/wishlist-remove/${id}`, {})
        .then((data) => {
          console.log(data);
          const filter = product.filter((data) => {
            if (data._id == id) {
              return (data.wishlist = "");
            }
            return data;
          });
          setproduct(filter);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="user-view-main-body">
      <Toaster />
      {/* <Usernavbar/> */}
      <div className="user-view-content-body">
        <div className="user-view-cards-body">
          <div className="user-view-cards-heading">PRODUCTS LISTS </div>
          <div className="user-view-cards-search">
            <div className="user-view-searchBar-sec">
              <input
                type="text"
                className="user-view-searchBar"
                placeholder="Search..."
                name="search"
                onChange={searchInput}
              />
              <img
                src="/search.png"
                alt=""
                className="user-view-searchBar-img"
                onClick={searchsubmit}
              />
            </div>
          </div>
          {product.length > 0 ? (
            <>
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
                    <h3 className="user-view-card-details-h3"> {item.name}</h3>
                    <h4 className="user-view-card-details-h4">
                      {" "}
                      {item.available_qty}
                    </h4>
                    <h4 className="user-view-card-details-h4">
                      {" "}
                      {item.category}
                    </h4>
                    <h4 className="user-view-card-details-h4">
                      {" "}
                      {item.sub_category}
                    </h4>
                    <h4 className="user-view-card-details-h4">
                      {" "}
                      {item.description}
                    </h4>
                  </div>
                  <div className="user-view-card-buttons">
                    {/* <div className="user-btn-sec"> */}

                    <button
                      className="user-addtocart"
                      onClick={() => cartHandler(item)}
                    >
                      Add to Cart
                      <img
                        src="/addtocart.png"
                        alt=""
                        className="user-addtocart-logo"
                      />
                    </button>
                    <button
                      className="user-saved-item"
                      onClick={() => savedItemHandler(item._id, item.wishlist)}
                    >
                      {item.wishlist == "" ? (
                        <img
                          src="/unsaved-item.png"
                          alt=""
                          className="user-saveditem-logo"
                        />
                      ) : (
                        <img
                          src="/saved-item.png"
                          alt=""
                          className="user-saveditem-logo"
                        />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <img src="/user-no-data.png" alt="" className="user-no-data" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewproduct;
