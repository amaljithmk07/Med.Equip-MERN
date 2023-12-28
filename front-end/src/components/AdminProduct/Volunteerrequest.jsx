import React, { useEffect, useState } from "react";
import "./Volunteerrequest.css";
import axios from "axios";

const Volunteerrequest = () => {
  const token = localStorage.getItem("Token");

  const [volunteerreqlist, setVolunteerreqlist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2222/api/volunteer/volunteerlist", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
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
    console.log(token);
    console.log(id);
    try {
      await axios
        .put(`http://localhost:2222/api/volunteer/statusupdate/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data);
          // setVolunteerreqlist(data.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      // window.location.reload();
    } catch (err) {
      console.log("catch error:", err);
    }
  };
  return (
    <div>
      <div className="vol-req-main-body">
        <div className="vol-req-sub-body">
          <div className="vol-req-container">
            <table className="vol-req-table" border={1}>
              <tr>
                <th>Login ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Qualification</th>
                <th>Status</th>
                <th>Decision</th>
              </tr>
              {volunteerreqlist.map((data) => (
                <tr key={data._id}>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.address}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.qualification}</td>
                  <td>{data.status}</td>
                  <td>
                    <button onClick={() => approveHandler(data._id)}>
                      Approve
                    </button>
                    <button>Decline</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteerrequest;
