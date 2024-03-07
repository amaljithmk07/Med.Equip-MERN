import React, { useRef, useState } from "react";
import "./Payment.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import upiqr from "upiqr";
import Base_URL from "../Constant/constant";

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
    e.preventDefault();
    ///form validation

    let name = document.forms["paymentForm"]["name"].value;
    let phonenumber = document.forms["paymentForm"]["phone"].value;
    let formamount = document.forms["paymentForm"]["amount"].value;
    let amountverify = formamount.match(
      /^(?!0)([0-9]{1,4})$/

      // /^((0?\.((0[1-9])|[1-9]\d))|([1-9]\d*(\.\d{2})?))$/
    );
    console.log(formamount);
    console.log(amountverify);
    if (name == "") {
      toast.error("Please Enter Name", {
        position: "bottom-center",
      });
      return false;
    } else if (phonenumber == "") {
      toast.error("Please Enter Phone Number", {
        position: "bottom-center",
      });
      return false;
    } else if (formamount == "") {
      toast.error("Please Enter amount", {
        position: "bottom-center",
      });
      return false;
    } else if (!amountverify) {
      toast.error("Please Enter Valid Amount", {
        position: "bottom-center",
      });
      return false;
    }

    //////////////////////////

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

  //Payment Submit

  const paymentSubmit = (e) => {
    axios
      // .post(`http://localhost:2222/api/user/donation`, price, {
      .post(`${Base_URL}/api/user/donation`, price, {
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
              <form name="paymentForm" className="payment-left-body-form">
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
              </form>
            </div>
            <div className="payment-right-body">
              <div className="payment-qr-sec">
                <div className="payment-scan-head">Scan Here</div>
                {qr.length == 0 ? (
                  <img
                    // src="/qrcode.png"
                    src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583160/Med-equip/kcipwuujfvkyj4pycp7q.png"
                    alt="sadas"
                    className="payment-qr-code"
                  />
                ) : (
                  <img src={qr} alt="" className="payment-qr-code" />
                )}
                <img
                  // src="/payment-option.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583159/Med-equip/av61ce3jrha40rjqlywk.png"
                  alt="sadas"
                  className="payment-option"
                />
              </div>
            </div>
          </div>
          <button className="payment-button" onClick={paymentSubmit}>
            Make Payment
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Payment;
