import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./NewProductList.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Base_URL from "../Constant/constant";
// import Usernavbar from "../UserNavbar/Usernavbar";
const NewProductList = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);
  // const [saveditem, setsaveditem] = useState(true);
  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("Role");
  useEffect(() => {
    //Products Volunteer  View

    axios
      // .get(`http://localhost:2222/api/user/view`, {
      .get(`${Base_URL}/api/user/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(data.data.data);
        const DATA = data.data.data.filter((datas) => {
          return datas.product_status == "";
        });
        setproduct(DATA);
        // setproduct(data.data.data);
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
  }, []);

  //Product Approval

  const productApprove = (id) => {
    axios
      // .get(`http://localhost:2222/api/volunteer/product-approve/${id}`, {
      .get(`${Base_URL}/api/volunteer/product-approve/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        const DATA = product.filter((datas) => {
          return datas._id !== id;
        });
        setproduct(DATA);
        toast.success("Product Approved!", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Product Reject

  const productReject = (id) => {
    axios
      // .get(`http://localhost:2222/api/volunteer/product-reject/${id}`, {
      .get(`${Base_URL}/api/volunteer/product-reject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        const DATA = product.filter((datas) => {
          return datas._id !== id;
        });
        setproduct(DATA);
        toast.error("Product Rejected !", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="volunteer-pro-approve-main-body">
      <Toaster />
      {/* <Usernavbar/> */}
      <div className="volunteer-pro-approve-content-body">
        <div className="volunteer-pro-approve-cards-body">
          <div className="volunteer-pro-approve-cards-heading">
            NEW ARRIVALS{" "}
          </div>

          {product.length > 0 ? (
            <>
              {product.map((item) => (
                <div className="volunteer-pro-approve-card" key={item._id}>
                  <div className="volunteer-pro-approve-card-image-sec">
                    <img
                      src={item.image}
                      alt=""
                      className="volunteer-pro-approve-card-image"
                    />
                  </div>
                  <div className="volunteer-pro-approve-card-details">
                    <h3 className="volunteer-pro-approve-card-details-h3">
                      {item.name}
                    </h3>
                    <h4 className="volunteer-pro-approve-card-details-h4">
                      {item.available_qty}
                    </h4>
                    <h4 className="volunteer-pro-approve-card-details-h4">
                      {item.category}
                    </h4>
                    <h4 className="volunteer-pro-approve-card-details-h4">
                      {item.sub_category}
                    </h4>
                    <h4 className="volunteer-pro-approve-card-details-h4">
                      {item.description}
                    </h4>
                  </div>
                  <div className="volunteer-pro-approve-card-buttons">
                    {/* <div className="user-btn-sec"> */}
                    <button
                      className="volunteer-pro-approve"
                      onClick={() => productApprove(item._id)}
                    >
                      <>Approve </>
                    </button>

                    <button className="volunteer-pro-approve-item">
                      <img
                        // src="/cart-cross.png"
                        src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583150/Med-equip/tbypsdgwgnzvnbthgdfd.png"
                        onClick={() => productReject(item._id)}
                        alt=""
                        className="volunteer-pro-approve-logo"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // <img src="/user-no-data.png" alt="" className="user-no-data" />
            <img
              src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583164/Med-equip/zqcstw2436ip6awww37z.png"
              alt=""
              className="user-no-data"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProductList;
