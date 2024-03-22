import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./Loader.css";
const Loader = (props) => {
  return (
    <div className="loader-main">
      <div className="loader-sub">
        {props.load == true ? (
          <RotatingLines
            visible={true}
            height="50"
            width="50"
            strokeColor="orangered"
            strokeWidth="2"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Loader;
