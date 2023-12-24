import React, { useState } from "react";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = () => {
  const Navigate = useNavigate();
  const [letter, setletter] = useState({});
  const letterHandler = (event) => {
    const { name, value } = event.target;
    setletter({ ...letter, [name]: value });
    // console.log(letter);
  };
  const createHandler = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:2222/api/register/user`, letter)
      .then((data) => {
        console.log(data);
        Navigate("/login");
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
  const [pass, setpass] = useState(false);

  const showpass = (e) => {
    setpass(true);
    // console.log(e);
  };
  const hidepass = (e) => {
    setpass(false);
    // console.log(e);
  };

  return (
    <div>
      <div className="body-reg">
        <div className="content">
          <div className="registrationform">
            <h1 className="reg-h1">Register</h1>
            <form action="" className="registrationform1">
              {/* //User Part */}

              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input-reg"
                onChange={letterHandler}
              />
              <input
                type="text"
                placeholder="Age"
                name="age"
                className="input-reg"
                onChange={letterHandler}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone_number"
                className="input-reg"
                onChange={letterHandler}
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="input-reg"
                onChange={letterHandler}
              />
              {/* <input type="text" placeholder="Address" className="input-reg"/>
            <input type="text" placeholder="Pin code" className="input-reg"/> */}
              <input
                type={!pass ? "password" : "text"}
                name="password"
                placeholder="Password"
                className="input-reg"
                onChange={letterHandler}
                onClick={showpass}
                onMouseLeave={hidepass}
              />
              <button
                type="submit"
                // value={"Create Account"}
                className="create"
                onClick={createHandler}
              >
                Create Account
              </button>
              {/* //Volunteer Part */}
            </form>
            <h4 className="reg-h4">
              Already have an account?
              <Link to={"/login"} id="anchor-reg">
                &nbsp;Login
              </Link>
            </h4>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationPage;
