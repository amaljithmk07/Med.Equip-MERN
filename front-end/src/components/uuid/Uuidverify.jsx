import React, { useEffect, useState } from "react";
import "./Uuidverify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loading from "../uuid-Animations/Loading";
import Verify from "../uuid-Animations/Verify";
import Wrong from "../uuid-Animations/Wrong";
import Base_URL from "../Constant/constant";

const Uuidverify = () => {
  const [wrong, setWrong] = useState();
  const navigate = useNavigate();
  const [letter, setLetter] = useState("");
  const [loading, setloading] = useState("");

  //Letter

  const verify = (event) => {
    const { name, value } = event.target;
    // console.log(event.target.value);
    setloading(event.target.value);
    setLetter({ [name]: value });
  };
  console.log(letter);
  const token = sessionStorage.getItem("Token");
  console.log(token);
  const handleClick = () => {
    axios
      // .post("http://localhost:2222/api/login/uuidverify", letter, {
      .post(`${Base_URL}/api/login/uuidverify`, letter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // console.log(typeof data.status);
        setWrong(true);
        console.log(data);
        if (data.status == 200) {
          sessionStorage.setItem("uuid", data.data.uuid);
          setTimeout(() => {
            navigate("/user/addproduct");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);

        setWrong(false);
        setTimeout(() => {
          setWrong(null);
        }, 1100);
      });
  };
  console.log(letter);
  return (
    <div>
      <div className="uuid-background">
        <div className="uuid-sub">
          <div className="uuid-container">
            <div className="uuid-heading">
              {" "}
              SECRET KEY{" "}
              {/* <img src="/uuid-key.png" alt="" className="head-key-img" /> */}
              <img
                src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583164/Med-equip/esteopvwq3ej3w2fcg2i.png"
                alt=""
                className="head-key-img"
              />
            </div>{" "}
            {wrong == null || loading.length !== 4 ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                <>{wrong == true ? <Verify /> : <Wrong />}</>
              </>
            )}
            <input
              type="text"
              name="user_id"
              id="uuid-input"
              maxLength={4}
              placeholder=" Enter Your UUID"
              onChange={verify}
            />
            <input
              type="submit"
              value={"Verify"}
              id="uuid-verify"
              onClick={handleClick}
            />
          </div>
          {letter == "" ? (
            <div className="uuid-warning">* Check Your Profile For UUID</div>
          ) : (
            <></>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Uuidverify;
