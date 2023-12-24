import React, { useEffect, useState } from "react";
import "./Volunteerlist.css";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { Toast, ToastContainer } from "react-toastify/dist/components";

const Volunteerlist = () => {
  const token = localStorage.getItem("Token");
  const [volunteerlist, SetVolunteerlist] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/volunteer/volunteerlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        SetVolunteerlist(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   console.log(volunteerlist);

  return (
    <div className="volunteerlist-body">
      <div className="volunteerlist-sub-body">
        <div className="volunteerlist-sub-body-heading">VOLUNTEERS LIST</div>
        <div className="volunteerlist-content">
          {volunteerlist.map((data) => (
            <div className="volunteerlist-card-body" key={data._id}>
              <div className="volunteerlist-card-image-sec">
                {data.image !== "" ? (
                  <img
                    src={`/upload/${data.image}`}
                    alt=""
                    className="volunteerlist-card-img"
                  />
                ) : (
                  <img
                    src="/volunteerprofile.png"
                    alt=""
                    className="volunteerlist-card-img"
                  />
                )}
              </div>
              <div className="volunteerlist-card-details">
                <h3 className="volunteerlist-h3"> {data.name}</h3>
                <h3 className="volunteerlist-h3"> {data.status}</h3>
                <h3 className="volunteerlist-h3"> {data.age}</h3>
                <h3 className="volunteerlist-h3"> {data.qualification}</h3>
                <h3 className="volunteerlist-h3"> {data.phone_number}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volunteerlist;
