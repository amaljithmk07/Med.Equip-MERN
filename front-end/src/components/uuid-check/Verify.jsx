import React from "react";
import './VerifyWrong.css'
const Verify = () => {
  return (
    <div className="verify-uuid">
      {/*[if lte IE 9]>
  <style>
    .path {stroke-dasharray: 0 !important;}
  </style>
<![endif]*/}
      <svg className="svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          className="path circle"
          fill="none"
          stroke="#73AF55"
          strokeWidth={6}
          strokeMiterlimit={10}
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          className="path check"
          fill="none"
          stroke="#73AF55"
          strokeWidth={6}
          strokeLinecap="round"
          strokeMiterlimit={10}
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
     
    </div>
  );
};

export default Verify;
