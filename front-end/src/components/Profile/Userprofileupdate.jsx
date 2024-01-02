import React, { useEffect, useState } from "react";
import "./Userprofileupdate.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Userprofileupdate = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  // const role = localStorage.getItem("Role");

  const [profile, setProfile] = useState([
    {
      image: "",
      name: "",
      age: "",
      // qualification: "",
      email: "",
      phone_number: "",
    },
  ]);
  useEffect(() => {
    const userprofile = `http://localhost:2222/api/user/profile`;

    axios
      .get(userprofile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data[0]);
        setProfile(data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          toast.error("Session Time Out", {
            position: "bottom-center",
          });
          setTimeout(() => {
            localStorage.clear();
            navigate("/login");
          }, 2000);
        }
      });
  }, []);

  const Userprofileedit = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setProfile({ ...profile, [name]: value });
  };
  console.log(profile);

  const userProfilephoto = (e) => {
    const { name } = e.target;
    setProfile({ ...profile, [name]: e.target.files[0] });
  };

  const profileUpdate = (id) => {
    var formDetails = new FormData();
    formDetails.append("image", profile.image);
    formDetails.append("name", profile.name);
    formDetails.append("age", profile.age);
    formDetails.append("phone_number", profile.phone_number);
    formDetails.append("email", profile.email);
    axios
      .post(`http://localhost:2222/api/user/profileupdate/${id}`, formDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
    console.log(profile);
    navigate("/profile");
  };

  return (
    <div>
      <Toaster />
      <div className="userprofile-home-body">
        <div className="userprofile-home-sub-body">
          <form
            action=""
            className="userprofile-home-sub-body-form"
            encType="multipart/form-data"
          >
            <div className="userprofile-home-content">
              <div className="userprofile-home-image">
                <input
                  type="file"
                  name="image"
                  hidden
                  id="image"
                  onChange={userProfilephoto}
                  className="userprofile-home-upload"
                  accept="image/*"
                />
                <label htmlFor="image">
                  <img
                    src="/profile1.png"
                    alt=""
                    className="userprofile-photo"
                  />
                </label>
                PROFILE UPDATE
              </div>

              <div className="userprofile-input-box">
                <div className="userprofile-input-label">Name </div>:
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  placeholder="Name"
                  onChange={Userprofileedit}
                  className="userprofile-input"
                />
              </div>
              <div className="userprofile-input-box">
                <div className="userprofile-input-label">Age </div>:
                <input
                  type="text"
                  placeholder="Age"
                  onChange={Userprofileedit}
                  name="age"
                  value={profile.age}
                  className="userprofile-input"
                />
              </div>
              <div className="userprofile-input-box">
                <div className="userprofile-input-label">Phone </div>:
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={Userprofileedit}
                  name="phone_number"
                  value={profile.phone_number}
                  className="userprofile-input"
                />
              </div>
              <div className="userprofile-input-box">
                <div className="userprofile-input-label">Email </div>:
                <input
                  type="text"
                  onChange={Userprofileedit}
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  className="userprofile-input"
                />
              </div>

              <button
                type="submit"
                className="userprofile-update"
                onClick={() => profileUpdate(profile._id)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userprofileupdate;
