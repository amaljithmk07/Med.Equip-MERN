import React, { useRef, useState } from "react";
import "./Payment.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import upiqr from "upiqr";

const Payment = () => {
  const token = sessionStorage.getItem("Token");

  const [price, setprice] = useState([]);
  const [qr, setqr] = useState([]);

  //Payment Details Input

  const paymentInput = (e) => {
    const { name, value } = e.target;
    setprice({ ...price, [name]: value });
  };

  //Payment submit

  const qrGenerate = (e) => {
    const { amount } = price;
    upiqr({
      payeeVPA: "8086171296@paytm",
      payeeName: "Amaljith",
      amount: amount,
    })
      .then((upi) => {
        setqr(upi.qr);
        toast.success("QR Code Generated", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const paymentSubmit = (e) => {
    axios
      // .post(`http://localhost:2222/api/user/donation`, price, {
      .post(`https://med-equip.onrender.com/api/user/donation`, price, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        toast.success("Payment Done ", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("p", qr.length);

  return (
    <div>
      <div className="payment-body">
        <div className="payment-sub-body">
          <div className="payment-sub-body-head">Donation </div>
          <div className="payment-body-container">
            <div className="payment-left-body">
              <div className="payment-details-head"> details</div>
              <div className="payment-details-sec">
                Name :{" "}
                <input
                  type="text"
                  className="payment-details"
                  name="name"
                  onChange={paymentInput}
                />{" "}
              </div>
              <div className="payment-details-sec">
                phone :{" "}
                <input
                  type="number"
                  className="payment-details"
                  name="phone"
                  onChange={paymentInput}
                />{" "}
              </div>
              <div className="payment-details-amount-sec">
                AMOUNT :{" "}
                <input
                  type="number"
                  name="amount"
                  className="payment-amount"
                  onChange={paymentInput}
                />{" "}
              </div>
              <button className="qr-button" onClick={qrGenerate}>
                Generate QR Code{" "}
              </button>
            </div>
            <div className="payment-right-body">
              <div className="payment-qr-sec">
                <div className="payment-scan-head">Scan Here</div>
                {qr.length == 0 ? (
                  <img
                    src="/qrcode.png"
                    alt="sadas"
                    className="payment-qr-code"
                  />
                ) : (
                  <img src={qr} alt="" className="payment-qr-code" />
                )}
                <img
                  src="/payment-option.png"
                  alt="sadas"
                  className="payment-option"
                />
              </div>
            </div>
            <button className="payment-button" onClick={paymentSubmit}>
           Make   Payment
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Payment;
