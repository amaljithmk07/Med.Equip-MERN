import React, { useState } from "react";
import "./Volunteerregister.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Volunteerregister = () => {
  const [letter, setletter] = useState({});
  const letterHandler = (event) => {};
  return (
    <div>
      <div>
        <div className="vol-body-reg">
          <div className="vol-content">
            <div className="vol-registrationform">
              <h1>Register</h1>
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
                  type="text"
                  name="id_card"
                  placeholder="ID Proof"
                  className="vol-input-reg"
                  onChange={letterHandler}
                />
                <input
                  type="submit"
                  value={"Create Account"}
                  className="vol-create"
                  onClick={letterHandler}
                />
              </form>
              <h4>
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
