import React, { useEffect, useState } from "react";
import "./Volunteerprofileupdate.css";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Base_URL from "../Constant/constant";

const Volunteerprofileupdate = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("Role");
  const [profile, setProfile] = useState([
    {
      image: "",
      name: "",
      age: "",
      qualification: "",
      email: "",
      phone_number: "",
    },
  ]);
  useEffect(() => {
    axios
      // .get(`http://localhost:2222/api/volunteer/profile`, {
      .get(`${Base_URL}/api/volunteer/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setProfile(data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          toast.error("Session Time Out", {
            position: "bottom-center",
          });
          setTimeout(() => {
            sessionStorage.clear();
            navigate("/login");
          }, 2000);
        }
      });
  }, []);

  const volProfileedit = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setProfile({ ...profile, [name]: value });
  };
  // console.log(profile);

  const volProfilephoto = (e) => {
    const { name } = e.target;
    setProfile({ ...profile, [name]: e.target.files[0] });
  };

  const profileUpdate = (id) => {
    // e.preventDefault();
    console.log(id);
    var formDetails = new FormData();
    formDetails.append("image", profile.image);
    formDetails.append("name", profile.name);
    formDetails.append("age", profile.age);
    formDetails.append("qualification", profile.qualification);
    formDetails.append("phone_number", profile.phone_number);
    formDetails.append("email", profile.email);
    axios
      .post(
        // `http://localhost:2222/api/volunteer/profileupdate/${id}`,
        `${Base_URL}/api/volunteer/profileupdate/${id}`,
        formDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((data) => {
        navigate("/profile");
        // console.log(" item", data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
    console.log(profile);
  };

  return (
    <div>
      <Toaster />
      <div className="vol-profile-home-body">
        <div className="vol-profile-home-sub-body">
          <form
            action=""
            className="vol-profile-home-sub-body-form"
            encType="multipart/form-data"
          >
            <div className="vol-profile-home-content">
              <div className="vol-profile-home-image">
                <input
                  type="file"
                  name="image"
                  hidden
                  id="image"
                  onChange={volProfilephoto}
                  className="vol-profile-home-upload"
                  accept="image/*"
                />
                <label htmlFor="image">
                  <img
                    // src="/profile1.png"
                    src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1708583159/Med-equip/p3sq9ishi7myfxij6wxy.png"
                    alt=""
                    className="vol-profile-photo"
                  />
                </label>
                PROFILE UPDATE
              </div>

              <div className="vol-profile-input-box">
                <div className="vol-profile-input-label">Name </div>:
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  placeholder="Name"
                  onChange={volProfileedit}
                  className="vol-profile-input"
                />
              </div>
              <div className="vol-profile-input-box">
                <div className="vol-profile-input-label">Age </div>:
                <input
                  type="text"
                  placeholder="Age"
                  onChange={volProfileedit}
                  name="age"
                  value={profile.age}
                  className="vol-profile-input"
                />
              </div>
              <div className="vol-profile-input-box">
                <div className="vol-profile-input-label">Phone </div>:
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={volProfileedit}
                  name="phone_number"
                  value={profile.phone_number}
                  className="vol-profile-input"
                />
              </div>
              <div className="vol-profile-input-box">
                <div className="vol-profile-input-label">Qualification </div>:
                <input
                  type="text"
                  placeholder="Qualification"
                  onChange={volProfileedit}
                  name="qualification"
                  value={profile.qualification}
                  className="vol-profile-input"
                />
              </div>
              <div className="vol-profile-input-box">
                <div className="vol-profile-input-label">Email </div>:
                <input
                  type="text"
                  onChange={volProfileedit}
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  className="vol-profile-input"
                />
              </div>

              <button
                type="button"
                className="vol-profile-update"
                onClick={(e) => {
                  e.preventDefault();
                  profileUpdate(profile._id);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteerprofileupdate;
