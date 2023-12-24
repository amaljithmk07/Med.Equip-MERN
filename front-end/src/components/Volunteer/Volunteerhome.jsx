import React from "react";
import "./Volunteerhome.css";
import { Link } from "react-router-dom";

const Volunteerhome = () => {
  return (
    <div className="vol-home-body">
      <div className="vol-home-container">
        <div className="vol-home-quotes-box">
          {" "}
          <div className="vol-home-quote">
            “Volunteerism is the voice of the people put into action. These
            actions shape and mold the present into a future of which we can all
            be proud."
          </div>
          <div className="vol-home-quote">
            “The best way to find yourself is to lose yourself in the service of
            others."
          </div>
          <div className="vol-home-quote">
            “Volunteering is at the very core of being a human. No one has made
            it through life without someone else’s help"
          </div>
        </div>
        <div className="vol-home-submit">
          BE A PART OF US -
          <Link to={"/volunteer/register"}>
            {" "}
            <input
              type="submit"
              value={"Register"}
              className="vol-home-create"
            />
          </Link>
          <Link to={"/login"}>
            {" "}
            <input type="submit" value={"Login"} className="vol-home-create" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Volunteerhome;
