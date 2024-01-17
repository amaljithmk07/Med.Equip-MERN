import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Acceptedorders.css";
const AcceptedOrders = () => {
  const token = localStorage.getItem("Token");
  const [acceptedorders, setAcceptedorders] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/volunteer/accepted-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(data);
        setAcceptedorders(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(acceptedorders);
  const deliveredHandler = (id) => {
    axios
      .put(
        `http://localhost:2222/api/volunteer/order-placed/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        const orderplace = acceptedorders.filter((details) => {
          if (details._id == id) {
            details.orderstatus = "Delivered";
          }
          return details;
        });
        setAcceptedorders(orderplace);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="accepted-orders-main-body">
      <div className="a-o-sub-body">
        <div className="a-o-body-head">Accepted Orders</div>
        <div className="a-o-content-body">
          {acceptedorders != "" ? (
            <>
              <div className="a-o-content-title-sec">
                <div className="a-o-content-title">name</div>
                <div className="a-o-content-title">category</div>
                <div className="a-o-content-title">sub category</div>
                <div className="a-o-content-title-qty">qty</div>
                <div className="a-o-content-title">status</div>
                <div className="a-o-content-title">Deliver Status</div>
              </div>
              {acceptedorders.map((data) => (
                <div className="a-o-content" key={data._id}>
                  <div className="a-o-content-item">{data.name} </div>
                  <div className="a-o-content-item">{data.category} </div>
                  <div className="a-o-content-item">{data.sub_category}</div>
                  <div className="a-o-content-item-qty">{data.cart_qty}</div>
                  <div className="a-o-content-item">{data.orderstatus}</div>
                  <div className="a-o-content-item">
                    {data.orderstatus !== "Delivered" ? (
                      <button
                        onClick={() => deliveredHandler(data._id)}
                        className="order-place-btn"
                      >
                        Order Place
                      </button>
                    ) : (
                      <> Order Placed<img src="/order-delivered-tick.png" alt=""  className="order-delivered"/></>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <img src="/no-data.png" alt="" className="a-o-nodata" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptedOrders;
