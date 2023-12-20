import React from "react";
import "./Userproduct.css";
// import Usernavbar from "../UserNavbar/Usernavbar";
import { Link } from "react-router-dom";
const Userproduct = () => {
  const token = localStorage.getItem("Token");
  const role = localStorage.getItem("Role");
  console.log(token);
  return (
    <div>
      {/* <Usernavbar /> */}
      <div className="usermain-body">
        <div className="userproduct-sub-body">
          <div className="userproduct-content">
            <span>Medical Equipment</span>
            <div className="userproduct-image">
              <img src="/donate.png" alt="" className="user-img" />
              <img src="/refurbish.png" alt="" className="user-img" />
              <img src="/giveneed.png" alt="" className="user-img" />
            </div>
            <p className="home-p">
              We Care of Lake County is grateful for all the support and donated
              equipment we've received thus far since our start. Our medical
              equipment charity in Central Florida accepts donations of durable
              medical equipment, which will be used to help needy patients
              recover, rehabilitate, and resume their life with independence.
              Turn to us today to donate durable medical equipment and make a
              difference in the lives of members of the community. If you don't
              have any equipment to donate, please consider a cash donation to
              support We Share's efforts.
            </p>
            {token !== null && role !== null ? (
              <>
                {token !== null && role == 1 ? (
                  <>
                    <Link to={"/admin/addproduct"} id="button-arrow">
                      <button id="donate-button">Donate Your Love </button>
                      <img
                        src="/user-product-add-arrow.png"
                        alt=""
                        id="right-arrow"
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/uuidverify"} id="button-arrow">
                      <button id="donate-button">Donate Your Love </button>
                      <img
                        src="/user-product-add-arrow.png"
                        alt=""
                        id="right-arrow"
                      />
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to={"/login"} id="button-arrow">
                  <button id="donate-button">Donate Your Love </button>
                  <img
                    src="/user-product-add-arrow.png"
                    alt=""
                    id="right-arrow"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userproduct;
