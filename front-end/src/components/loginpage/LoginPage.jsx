import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [loginLetter, setloginLetter] = useState({});
  const navigate = useNavigate();

  const loginDetails = (event) => {
    const { name, value } = event.target;
    setloginLetter({ ...loginLetter, [name]: value });
    // console.log(loginLetter);
  };
  // const [load, setload] = useState(false);
  const loginSubmit = (event) => {
    // setload(true);
    event.preventDefault();
    axios
      .post(`http://localhost:2222/api/login`, loginLetter)
      .then((data) => {
        console.log(data);
        localStorage.setItem("Token", data.data.token);
        localStorage.setItem("Role", data.data.userRole);
        // setTimeout(() => {
        // }, 5000);
        // setload(false);
        
        navigate("/user");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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
            <form action="" className="components1">
              <div className="login-input-box">
                <img src="/login-user.png" alt="" className="login-png" />
                <input
                  type="text"
                  placeholder=" Email"
                  name="email"
                  className="login-input"
                  onChange={loginDetails}
                />
              </div>
              <div className="login-input-box">
                {pass == false ? (
                  <img
                    id="check"
                    src="/login-pass-view.png"
                    //closed eye
                    alt=""
                    className="login-png"
                    value={showPassword}
                    onClick={passShow}
                  />
                ) : (
                  <>
                    <img
                      id="check"
                      src="/login-pass.png"
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
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
