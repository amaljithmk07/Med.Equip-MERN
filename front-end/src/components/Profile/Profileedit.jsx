import React, { useEffect, useState } from "react";
import "./Profileedit.css";
import axios from "axios";
const Profileedit = () => {
  const [letters, setletters] = useState({});
  const profileInput = (event) => {
    const { name, value } = event.target;
    setletters({ ...letters, [name]: value });
    // console.log(letters);
  };

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
