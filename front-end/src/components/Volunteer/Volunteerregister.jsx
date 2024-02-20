import React, { useState } from "react";
import "./Volunteerregister.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Volunteerregister = () => {
  const navigate = useNavigate();
  const [letter, setletter] = useState({});
  const letterHandler = (event) => {
    const { name, value } = event.target;
    setletter({ ...letter, [name]: value });
    console.log(letter);
  };
  const createHandler = () => {
    axios
      // .post(`http://localhost:2222/api/register/volunteer`, letter)
      .post(`https://med-equip.onrender.com/api/register/volunteer`, letter)
      .then((data) => {
        console.log(data);
        toast.success('Register Successful', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/login");
          
        }, 2000);

      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  return (
    <div>
      <div>
        <div className="vol-body-reg">
          <div className="vol-content">
            <div className="vol-registrationform">
              <h1 className="vol-h1">Register</h1>
              <form action="" className="vol-registrationform1">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                <input
                  type="text"
                  placeholder="Age"
                  name="age"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone_number"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                {/* <input type="text" placeholder="Address" className="input-reg"/>
            <input type="text" placeholder="Pin code" className="input-reg"/> */}
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                <button type="button" className="vol-create" onClick={createHandler}>
                  Create Account
                </button>
              </form>
              <h4 className="vol-h4">
                Already have an account?
                <Link to={"/login"} id="vol-anchor-reg">
                  Login
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteerregister;
