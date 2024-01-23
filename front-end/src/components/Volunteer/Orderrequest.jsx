import React, { useEffect, useState } from "react";
import "./Orderrequest.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Orderrequest = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [ordersrequest, setOrdersrequest] = useState([]);
  useEffect(() => {
    axios
      .post(
        `http://localhost:2222/api/volunteer/order-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data.data.data);
        setOrdersrequest(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(ordersrequest);
  const acceptHandler = (id) => {
    axios
      .put(
        `http://localhost:2222/api/volunteer/order-accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data.data.data);
        const accepted = ordersrequest.filter((data) => {
          return data._id != id;
        });
        setOrdersrequest(accepted);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="order-request-body">
      <div className="order-request-sub-body">
        <div className="order-request-sub-head">pending orders</div>
        <div className="order-request-content-body">
          {ordersrequest != "" ? (
            <>
              {" "}
              <div className="order-request-content-title-sec">
                <div className="order-request-content-title">name</div>
                <div className="order-request-content-title">category</div>
                <div className="order-request-content-title">sub category</div>
                <div className="order-request-content-title-qty">qty</div>
                <div className="order-request-content-title">status</div>
                <div className="order-request-content-title">action</div>
              </div>
              {ordersrequest.map((data) => (
                <div className="order-request-content" key={data._id}>
                  <div className="order-request-content-item">
                    {" "}
                    {data.name}{" "}
                  </div>
                  <div className="order-request-content-item">
                    {data.category}{" "}
                  </div>
                  <div className="order-request-content-item">
                    {data.sub_category}
                  </div>
                  <div className="order-request-content-item-qty">
                    {data.cart_qty}{" "}
                  </div>
                  <div className="order-request-content-item">
                    {" "}
                    <Link
                      to={`/volunteer/view-details/${data._id}`}
                      className="order-request-content-item-viewdetails"
                    >
                      View Details{" "}
                    </Link>
                  </div>
                  <div className="order-request-content-item">
                    <button
                      onClick={() => acceptHandler(data._id)}
                      className="order-request-content-button"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <img src="/no-data.png" alt="" className="order-request-nodata" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Orderrequest;
