import React, { useState } from "react";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const Navigate = useNavigate();
  const [price, setprice] = useState([]);
  const paymentValue = (e) => {
    setprice(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="payment-body">
        <div className="payment-sub-body">
          <div className="payment-sub-body-head">Donation </div>
          <div className="payment-body-container">
            <div className="payment-left-body">
              <div className="payment-details-sec">
                Name : <input type="text" className="payment-details" />{" "}
              </div>
              <div className="payment-details-sec">
                UPI : <input type="text" className="payment-details" />{" "}
              </div>
              <div className="payment-details-amount-sec">
                AMOUNT :{" "}
                <input
                  type="number"
                  max={2}
                  className="payment-amount"
                  onChange={paymentValue}
                />{" "}
              </div>
              <button className="payment-button">Generate QR Code </button>
            </div>
            <div className="payment-right-body">
              <div className="payment-qr-sec">
                <div className="payment-scan-head">Scan Here</div>
                <img
                  src="/qrcode.png"
                  alt="sadas"
                  className="payment-qr-code"
                />
                <img
                  src="/payment-option.png"
                  alt="sadas"
                  className="payment-option"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Payment;
