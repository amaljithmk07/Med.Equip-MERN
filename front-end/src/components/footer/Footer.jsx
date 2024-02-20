import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
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
                <Link className="footer-data">About Us</Link>
                <Link className="footer-data">Annual Checkup</Link>
                <Link className="footer-data">Blog</Link>
                <Link className="footer-data">Carrers</Link>
              </div>
              <div className="footer-content1">
                {" "}
                <Link className="footer-data">Get A Diagnosis</Link>
                <Link className="footer-data">How It Works</Link>
                <Link className="footer-data">Privacy Policy</Link>
              </div>
              <div className="footer-content1">
                {" "}
                <Link className="footer-data">Contact Us</Link>
                <Link className="footer-data">FAQ's</Link>
              </div>
            </div>
          </div>
          <div className="footer-content-body2">
            <div className="footer-head">Top Insurance</div>
            <div className="footer-container2">
              <div className="footer-content2">
                <Link className="footer-data">Aetna</Link>
                <Link className="footer-data">Health Plan</Link>
                <Link className="footer-data">Blue Shield</Link>
                <Link className="footer-data">Carrers</Link>
              </div>
              <div className="footer-content2">
                <Link className="footer-data">Health Net</Link>
                <Link className="footer-data">Health Smart</Link>
                <Link className="footer-data">View More</Link>
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
            All rights reserved by respective owners
          </div>
          <div className="footer-footer-2">Privacy Policy</div>
          <div className="footer-footer-3">Terms & Conditions</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
