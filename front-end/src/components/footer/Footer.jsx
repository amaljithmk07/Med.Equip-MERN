import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer-home">
      <div className="footer-main-body">
        <div className="footer-body">
          <div className="footer-content-body1">
            <div className="footer-head">
              <img src="/logo1.png" alt="" id="footer-med-logo-png" />
              Medical Equipment
            </div>
            <div className="footer-container1">
              <div className="footer-content1">
                <p className="footer-data">About Us</p>
                <p className="footer-data">Annual Checkup</p>
                <p className="footer-data">Blog</p>
                <p className="footer-data">Carrers</p>
              </div>
              <div className="footer-content1">
                {" "}
                <p className="footer-data">Get A Diagnosis</p>
                <p className="footer-data">How It Works</p>
                <p className="footer-data">Privacy Policy</p>
              </div>
              <div className="footer-content1">
                {" "}
                <p className="footer-data">Contact Us</p>
                <p className="footer-data">FAQ's</p>
              </div>
            </div>
          </div>
          <div className="footer-content-body2">
            <div className="footer-head">Top Insurance</div>
            <div className="footer-container2">
              <div className="footer-content2">
                <p className="footer-data">Aetna</p>
                <p className="footer-data">Health Plan</p>
                <p className="footer-data">Blue Shield</p>
                <p className="footer-data">Carrers</p>
              </div>
              <div className="footer-content2">
                <p className="footer-data">Health Net</p>
                <p className="footer-data">Health Smart</p>
                <p className="footer-data">View More</p>
              </div>
            </div>
          </div>
          <div className="footer-content-body3">
            <div className="footer-head">Follow Us</div>
            <div className="footer-content3">
              <img src="/footer-icon.png" alt="" className="footer-icon" />
            </div>
          </div>
        </div>
        <div className="footer-footer">
          <div className="footer-footer-1">
            All rights reserved by team Maitexa Software Developers
          </div>
          <div className="footer-footer-2">Privacy Policy</div>
          <div className="footer-footer-3">Terms & Conditions</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
