import axios from "axios";
import "./Viewdetails.css";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Item picked ", "Order accepted", "Delvered"];

const Viewdetails = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [viewdetails, setViewdetails] = useState([]);

  const { id } = useParams();
  //Display Accepted Orders
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/volunteer/view-details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setViewdetails(data.data.data);
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

  return (
    <div>
      <Toaster />
      <div className="addressdetails-body">
        <div className="a-d-sub-body">
          {viewdetails.map((data) => (
            <div className="a-d-details" key={data._id}>
              <div className="a-d-address">{data.name}</div>
              <div className="a-d-address"></div>
            </div>
          ))}
          <div className="a-d-track">
            {viewdetails.orderstatus == "Order Accepted" ? (
              <>
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={2} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </>
            ) : (
              <>
                {viewdetails.orderstatus == "Delivered" ? (
                  <>
                    <Box sx={{ width: "100%" }}>
                      <Stepper activeStep={3} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </>
                ) : (
                  <> </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
