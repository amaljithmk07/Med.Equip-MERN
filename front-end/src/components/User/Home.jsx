import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("Role");
  console.log(token);
  return (
    <div>
      <div className="homemain-body">
        <div className="homeproduct-sub-body">
          <div className="homeproduct-content">
            <div className="home-head">Medical Equipment</div>
            <div className="homeproduct-image">
              <img src="/donate.png" alt="" className="home-img" />
              <img src="/refurbish.png" alt="" className="home-img" />
              <img src="/giveneed.png" alt="" className="home-img" />
            </div>
            <div className="home-p">
              We Care of Lake County is grateful for all the support and donated
              equipment we've received thus far since our start. Our medical
              equipment charity in Central Florida accepts donations of durable
              medical equipment, which will be used to help needy patients
              recover, rehabilitate, and resume their life with independence.
              Turn to us today to donate durable medical equipment and make a
              difference in the lives of members of the community. If you don't
              have any equipment to donate, please consider a cash donation to
              support We Share's efforts.
            </div>
            {token !== null && role !== null ? (
              <>
                {token !== null && role == 1 ? (
                  <>
                    <Link to={"/admin/addproduct"} id="button-arrow">
                      <button id="donate-button">Donate Your Love </button>
                      <img
                        src="/home-product-add-arrow.png"
                        alt=""
                        id="right-arrow"
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    {token != null && role == 2 ? (
                      <div className="home-btn-group">
                        <Link to={"/uuidverify"} id="button-arrow">
                          <button id="donate-button">Donate Your Love </button>
                          <img
                            src="/home-product-add-arrow.png"
                            alt=""
                            id="right-arrow"
                          />
                        </Link>
                        <Link to={"/user/payment"} id="button-arrow">
                          Donate
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link to={"/volunteer/order-request"} id="button-arrow">
                          <button id="donate-button">Donate Your Love </button>
                          <img
                            src="/home-product-add-arrow.png"
                            alt=""
                            id="right-arrow"
                          />
                        </Link>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Link to={"/login"} id="button-arrow">
                  <button id="donate-button">Donate Your Love </button>
                  <img
                    src="/home-product-add-arrow.png"
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

export default Home;
