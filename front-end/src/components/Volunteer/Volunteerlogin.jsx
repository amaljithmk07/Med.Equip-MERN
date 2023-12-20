import React from "react";
import "./Volunteerlogin.css";


const Volunteerlogin = () => {
  return (
    <div>
      <div className="vol-body">
        <div className="vol-login">
          <div className="vol-components">
            <h1 className="vol-h1">Login</h1>
            <form action="" className="vol-components1">
              <input
                type="text"
                placeholder=" Email"
                name="email"
                className="vol-login-input"
                onChange={loginDetails}
              />

              <input
                type="password"
                placeholder=" Password"
                name="password"
                className="vol-login-input"
                onChange={loginDetails}
              />
              <input
                type="submit"
                value={"Login"}
                onClick={loginSubmit}
                className="vol-login-submit"
              />
            </form>
            <h4 className="vol-h4">
              Don't have an account?
              <Link to={"/register"} id="vol-anchor">
                &nbsp;Register
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteerlogin;
