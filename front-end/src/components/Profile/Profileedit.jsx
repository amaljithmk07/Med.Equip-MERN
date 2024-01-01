import React, { useEffect, useState } from "react";
import "./Profileedit.css";
import axios from "axios";
const Profileedit = () => {
  const profileEdit = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setProfile({ ...profile, [name]: value });
  };
  const profilePhoto = (e) => {
    const { name } = e.target;
    setProfile({ ...profile, [name]: e.target.files[0] });
  };
  const profileUpdate = (id, e) => {
    // if (role == 3) {
    var formDetails = new FormData();
    formDetails.append("image", profile.image);
    formDetails.append("name", profile.name);
    formDetails.append("age", profile.age);
    formDetails.append("qualification", profile.qualification);
    formDetails.append("phone_number", profile.phone_number);
    formDetails.append("email", profile.email);
    console.log("form data image:", formDetails.image);
    axios
      .post(
        `http://localhost:2222/api/volunteer/profileupdate/${id}`,
        formDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((data) => {
        // console.log("data :", data);
        // console.log("data :", data.data.data[0]);
        setProfile(data);
        navigate("/profile");
        // var ProfileUpdated = response.data.data[0];

        // const updatedprofile = profile.filter((data) => {
        //   if (data._id == id) {
        //     return { ...profile, profile: ProfileUpdated };
        //   }
        //   return data;
        // });
        // setProfile(updatedprofile);
      })
      .catch((err) => {
        console.log("err:", err);
      });
    console.log(profile);
    e.preventDefault();
  };
  // const profileImage = profile.image;
  // const imgLength=profileImage.length
  // console.log(imgLength);
  console.log(profile.image);



  return (
    <div>
      <div className="profile-edit-body">
        <div className="profile-edit-sub-body">
          <div className="profile-edit-content">
            <img src="/profile.png" alt="" id="profile-edit-photo" />
            <div className="profile-edit-input-box">
              <input
                type="text"
                name="name"
                // value={profile.name}
                placeholder="Name"
                className="profile-edit-input"
                onChange={profileInput}
              />
              {letters.name == null ? (
                <></>
              ) : (
                <>
                  <img src="/profile-edit.png" alt="" id="profile-input-edit" />
                </>
              )}
            </div>
            <div className="profile-input-box">
              <input
                type="text"
                placeholder="Age"
                name="age"
                // value={profile.age}
                className="profile-edit-input"
                onChange={profileInput}
              />
              {letters.age == null ? (
                <></>
              ) : (
                <>
                  <img src="/profile-edit.png" alt="" id="profile-input-edit" />
                </>
              )}
            </div>
            <div className="profile-input-box">
              <input
                type="text"
                placeholder="Phone Number"
                name="phone_number"
                // value={profile.phone_number}
                className="profile-edit-input"
              />
              {letters.phone_number == null ? (
                <></>
              ) : (
                <>
                  <img src="/profile-edit.png" alt="" id="profile-input-edit" />
                </>
              )}
            </div>

            <div className="profile-input-box">
              <input
                type="text"
                name="email"
                placeholder="Email"
                // value={profile.email}
                className="profile-edit-input"
                onChange={profileInput}
              />
              {letters.email == null ? (
                <></>
              ) : (
                <>
                  <img src="/profile-edit.png" alt="" id="profile-input-edit" />
                </>
              )}
            </div>

            <input type="submit" value={"Update"} id="profile-edit-update" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profileedit;
