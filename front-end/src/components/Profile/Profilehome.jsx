import React, { useEffect, useState } from "react";
import "./Profilehome.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Profilehome = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([
    {
      image: "",
      name: "",
      age: "",
      qualification: "",
      phone_number: "",
      email: "",
    },
  ]);
  const token = localStorage.getItem("Token");
  const role = localStorage.getItem("Role");
  console.log(token);
  console.log(role);
  useEffect(() => {
    const userprofile = `http://localhost:2222/api/user/profile`;
    const volunteerprofile = `http://localhost:2222/api/volunteer/profile`;
    if (role == 3) {
      axios
        .get(volunteerprofile, {
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
            }, 3000);
          }
        });
    } else {
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
            }, 3000);
          }
        });
    }
  }, []);
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
    if (role == 3) {
      const formData = new FormData();
      formData.append("image", profile.image);
      formData.append("name", profile.name);
      formData.append("age", profile.age);
      formData.append("qualification", profile.qualification);
      formData.append("phone_number", profile.phone_number);
      formData.append("email", profile.email);
      console.log(formData);
      axios
        .put(
          `http://localhost:2222/api/volunteer/profileupdate/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          console.log("data :", data);
          navigate("/profile");
          // const updatedprofile = profile.filter((data) => {
          //   cmp.profile(data);
          //   return data;
          // });
          // setProfile(updatedprofile);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    } else {
    }
  };
  console.log(profile);

  return (
    <div>
      <Toaster />
      <div className="profile-home-body">
        <div className="profile-home-sub-body">
          <form
            action=""
            className="profile-home-sub-body-form"
            encType="multipart/form-data"
          >
            <div className="profile-home-content">
              <div className="profile-home-image">
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={profilePhoto}
                  id="image"
                  className="profile-home-upload"
                />
                <label htmlFor="image">
                  {" "}
                  {role == 3 ? (
                    <>
                      {profile.image !== "" ? (
                        <img
                          src={`/upload/${profile.image}`}
                          alt=""
                          className="profile-photo"
                        />
                      ) : (
                        <img
                          src="/profile1.png"
                          alt=""
                          className="profile-photo"
                        />
                      )}
                    </>
                  ) : (
                    <img src="/profile1.png" alt="" className="profile-photo" />
                  )}
                </label>
                PROFILE
              </div>
              {role == 3 ? (
                <>
                  <div className="profile-input-box">
                    <div className="profile-input-label">Name </div> :
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
                    <div className="profile-input-label">Status</div>:
                    <input
                      type="text"
                      placeholder="Status"
                      // name="user_id"
                      value={profile.status}
                      className="profile-input"
                      onChange={profileEdit}
                      disabled
                    />
                  </div>
                  <div className="profile-input-box">
                    <div className="profile-input-label">Age </div>:
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
                    <div className="profile-input-label">Qualification </div>:
                    <input
                      type="text"
                      placeholder="Qualification"
                      name="qualification"
                      value={profile.qualification}
                      className="profile-input"
                      onChange={profileEdit}
                    />
                  </div>
                  <div className="profile-input-box">
                    <div className="profile-input-label">Phone </div>:
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
                    <div className="profile-input-label">Email </div>:
                    <input
                      type="text"
                      name="email"
                      onChange={profileEdit}
                      placeholder="Email"
                      value={profile.email}
                      className="profile-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="profile-update"
                    onClick={() => profileUpdate(profile._id)}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <div className="profile-input-box">
                    <div className="profile-input-label">Name </div>:
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      placeholder="Name"
                      className="profile-input"
                      onChange={profileEdit}
                    />
                  </div>
                  {role == 2 ? (
                    <div className="profile-input-box">
                      <div className="profile-input-label">User ID</div>:
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
                  ) : (
                    <></>
                  )}
                  <div className="profile-input-box">
                    <div className="profile-input-label">Age </div>:
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
                    <div className="profile-input-label">Phone </div>:
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
                    <div className="profile-input-label">Email </div>:
                    <input
                      type="text"
                      name="email"
                      onChange={profileEdit}
                      placeholder="Email"
                      value={profile.email}
                      className="profile-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="profile-update"
                    // onClick={profileUpdate}
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profilehome;
