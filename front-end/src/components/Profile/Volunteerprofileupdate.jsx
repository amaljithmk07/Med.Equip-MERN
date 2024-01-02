import React from "react";
import "./Volunteerprofileupdate.css";
const Volunteerprofileupdate = () => {



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
                  onChange={volprofilephoto}
                  className="vol-profile-home-upload"
                  accept="image/*"
                />
                <label htmlFor="image">
                  <img
                    src="/profile1.png"
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
                  onChange={vol-profileedit}
                  className="vol-profile-input"
                />
              </div>
              <div className="vol-profile-input-box">
                <div className="vol-profile-input-label">Age </div>:
                <input
                  type="text"
                  placeholder="Age"
                  onChange={vol-profileedit}
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
                  onChange={vol-profileedit}
                  name="phone_number"
                  value={profile.phone_number}
                  className="vol-profile-input"
                />
              </div>
              <div className="vol-profile-input-box">
                <div className="vol-profile-input-label">Email </div>:
                <input
                  type="text"
                  onChange={vol-profileedit}
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  className="vol-profile-input"
                />
              </div>

              <button
                type="submit"
                className="vol-profile-update"
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

export default Volunteerprofileupdate;
