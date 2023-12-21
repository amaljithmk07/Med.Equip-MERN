import React, { useEffect, useState } from "react";
import "./Profilehome.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const Profilehome = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([
    {
      name: "",
      age: "",
      phone_number: "",
      email: "",
    },
  ]);
  const token = localStorage.getItem("Token");
  console.log(token);
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data);
        setProfile(data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Ran out of time !!!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          localStorage.clear();

          navigate("/login");
        }, 5000);
      });
  }, []);
  const profileEdit = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setProfile({ ...profile, [name]: value });
  };
  // console.log(profile);
  const profileUpdate = () => {
    axios
      .put(
        `http://localhost:2222/api/user/profileupdate/${profile._id}`,
        profile
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="profile-home-body">
        <div className="profile-home-sub-body">
          <div className="profile-home-image">
            <img src="/profile1.png" alt="" id="profile-photo" />
          </div>
          <div className="profile-home-content">
            <div className="profile-input-box">
              <input
                type="text"
                name="name"
                value={profile.name}
                placeholder="Name"
                className="profile-input"
                onChange={profileEdit}
              />
            </div>
            <div className="profile-input-box">
              <input
                type="text"
                placeholder="User ID"
                name="user_id"
                value={profile.user_id}
                className="profile-input"
                onChange={profileEdit}
                disabled
              />
            </div>
            <div className="profile-input-box">
              <input
                type="text"
                placeholder="Age"
                name="age"
                value={profile.age}
                className="profile-input"
                onChange={profileEdit}
              />
            </div>
            <div className="profile-input-box">
              <input
                type="text"
                placeholder="Phone Number"
                name="phone_number"
                value={profile.phone_number}
                onChange={profileEdit}
                className="profile-input"
              />
            </div>
            <div className="profile-input-box">
              <input
                type="text"
                name="email"
                onChange={profileEdit}
                placeholder="Email"
                value={profile.email}
                className="profile-input"
              />
            </div>

            <input
              type="submit"
              value={"Update"}
              className="profile-update"
              onClick={profileUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilehome;
