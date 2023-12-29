import React, { useEffect, useState } from "react";
import "./Volunteerrequest.css";
import axios from "axios";

const Volunteerrequest = () => {
  const token = localStorage.getItem("Token");

  const [volunteerreqlist, setVolunteerreqlist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2222/api/volunteer/volunteerrequestlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setVolunteerreqlist(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ///////////

  const approveHandler = async (id) => {
    console.log(id);
    try {
      console.log(token);
      await axios
        .put(
          `http://localhost:2222/api/volunteer/statusupdate/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
          const updatedstatus = volunteerreqlist.filter((details) => {
            if (details._id == id) {
              details.status = "Approved";
            }
            return details;
          });
          setVolunteerreqlist(updatedstatus);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("catch error:", err);
    }
  };

  ////

  const rejectHandler = (id) => {
    axios
      .delete(`http://localhost:2222/api/volunteer/reject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        // setVolunteerreqlist(data.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    // window.location.reload();
  };
  return (
    <div>
      <div className="vol-req-main-body">
        <div className="vol-req-sub-body">
          <div className="vol-req-container">
            <div className="vol-req-container-head">New Volunteer Request</div>
            <div className="vol-req-container-components">
              <div className="vol-req-title"> ID</div>
              <div className="vol-req-title"> Name</div>
              <div className="vol-req-title">Age</div>
              <div className="vol-req-title">Phone Number</div>
              <div className="vol-req-title">Qualification</div>
              <div className="vol-req-title">Status</div>
              <div className="vol-req-title">Decision</div>
            </div>
            {volunteerreqlist.map((data) => (
              <div className="vol-req-container-body" key={data._id}>
                <div className="vol-req-data">{data._id}</div>
                <div className="vol-req-data">{data.name}</div>
                <div className="vol-req-data">{data.age}</div>
                <div className="vol-req-data">{data.phone_number}</div>
                <div className="vol-req-data">{data.qualification}</div>
                <div className="vol-req-data">{data.status}</div>
                <div className="vol-req-btn">
                  <button
                    id="btn-approve"
                    onClick={() => approveHandler(data._id)}
                  >
                    {data.status === "Approved" ? <>Accepted</> : <>Accept</>}
                  </button>

                  <button
                    onClick={() => rejectHandler(data._id)}
                    id="btn-reject"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteerrequest;
