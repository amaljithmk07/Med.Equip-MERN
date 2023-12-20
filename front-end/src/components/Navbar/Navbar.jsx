import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Userproduct from "../Userproduct/Userproduct";

const Navbar = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  const Role = localStorage.getItem("Role");
  console.log("Role:",Role);
  const Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Role");
    localStorage.removeItem("uuid");
    navigate('/');
    window.location.reload();
  };
  return (
    <div className="general-navbar">
      <div className="general-med-logo">
        <img src="/logo1.png" alt="" id="general-med-logo-png" />
        Medical Equipment
      </div>
      <div className="general-nav">
        <div className="general-sub">
          <ul>
            <li>
              <Link to={"/user"} className="general-a">
                Home
              </Link>
            </li>
            {Token !== null && Role == 2 ? (
              <>
                <li>
                  <Link to={"/uuidverify"} className="general-a">
                    Sell Products
                  </Link>
                </li>
                <li>
                  <Link to={"/user/viewproduct "} className="general-a">
                    View Products
                  </Link>
                </li>
                <li>
                  <Link to={"/usercart"} className="general-a">Cart</Link>
                </li>
              </>
            ) : (
              <> </>
            )}

            {Token !== null && Role == 1 ? (
              <>
                <li>
                  <Link to={"/admin/Addproduct"} className="general-a">
                    Add Products
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/viewproduct"} className="general-a">
                    View Products
                  </Link>
                </li>
                <li>
                  <Link className="general-a">Volunteer Request</Link>
                </li>
                <li>
                  <Link className="general-a"> volunteer List</Link>
                </li>
              </>
            ) : (
              <></>
            )}

            {Token !== null ? (
              <>
                <li>
                  <Link to={"/profile"} className="general-a">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={""} onClick={Logout} className="general-a">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/login "} className="general-a">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/register"} className="general-a">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to={"/volunteer"} className="general-a">
                    Volunteer
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
