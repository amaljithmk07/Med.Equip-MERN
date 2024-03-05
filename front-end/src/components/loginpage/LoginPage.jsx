import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Base_URL from "../Constant/constant";

function LoginPage() {
  const [loginLetter, setloginLetter] = useState({});
  const navigate = useNavigate();

  const loginDetails = (event) => {
    const { name, value } = event.target;
    setloginLetter({ ...loginLetter, [name]: value });
    // console.log(loginLetter);
  };
  // const [load, setload] = useState(false);
  // console.log(Base_URL);
  const loginSubmit = (event) => {
    // setload(true);
    event.preventDefault();

    let email = document.forms["myForm"]["email"].value;
    let password = document.forms["myForm"]["password"].value;
    if (email == "") {
      toast.error("Email is empty", {
        position: "bottom-center",
      });
      return false;
    } else if (password == "") {
      toast.error("Password is empty", {
        position: "bottom-center",
      });

      return false;
    }

    axios
      // .post(`http://localhost:2222/api/login`, loginLetter)
      .post(`${Base_URL}/api/login`, loginLetter)
      .then((data) => {
        console.log(data);
        toast.success(data.data.data, {
          position: "bottom-center",
        });
        sessionStorage.setItem("Token", data.data.token);
        sessionStorage.setItem("Role", data.data.userRole);
        sessionStorage.setItem("LoginId", data.data.loginId);
        // setTimeout(() => {
        // }, 5000);
        // setload(false);s

        navigate("/home");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "bottom-center",
        });
      });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [pass, setpass] = useState(false);
  const passShow = () => {
    setShowPassword((prev) => !prev);
    setpass((prev) => !prev);
  };

  return (
    <div>
      <div className="body">
        <div className="login">
          <div className="components">
            <h1 className="login-h1">Login</h1>
            <form action="" name="myForm" className="components1">
              <div className="login-input-box">
                <div className="login-input-field-sec">
                  {/* <img src="/login-user.png" alt="" className="login-png" /> */}
                  {/* <img src="/email.png" alt="" className="login-png" /> */}
                  <img
                    src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583149/Med-equip/g5etl3wsnk8pbmngkdff.png"
                    alt=""
                    className="login-png"
                  />
                  <input
                    type="text"
                    placeholder=" Email"
                    name="email"
                    className="login-input"
                    onChange={loginDetails}
                  />
                </div>
              </div>
              <div className="login-input-box">
                <div className="login-input-field-sec">
                  {pass == false ? (
                    <img
                      // src="/login-pass-view.png"
                      src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583153/Med-equip/rcfxwyr2zc9yp7xrwheg.png"
                      id="check"
                      value={showPassword}
                      onClick={passShow}
                      alt=""
                      className="login-png"
                    />
                  ) : (
                    <>
                      <img
                        id="check"
                        // src="/login-pass.png"
                        src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583152/Med-equip/fszpi0qgjec0su3fwdzw.png"
                        alt=""
                        value={showPassword}
                        onClick={passShow}
                        className="login-png"
                      />
                    </>
                  )}
                  <input
                    // type="password"
                    placeholder=" Password"
                    name="password"
                    className="login-input"
                    type={showPassword ? "text" : "password"}
                    // onChange={(e) =>setPassword(e.target.value) }
                    onChange={loginDetails}
                  />
                </div>
              </div>
              <input
                type="submit"
                value={"Login"}
                onClick={loginSubmit}
                className="login-submit"
              />
            </form>
            <h4 className="login-h4">
              Don't have an account?
              <Link to={"/register"} id="anchor">
                &nbsp;Register
              </Link>
            </h4>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default LoginPage;
