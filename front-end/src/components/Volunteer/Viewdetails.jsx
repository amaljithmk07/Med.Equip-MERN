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
  const [viewdetails, setViewdetails] = useState({});

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
        setViewdetails(data.data.data[0]);
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
  console.log(viewdetails);
  return (
    <div>
      <Toaster />
      <div className="addressdetails-body">
        <div className="a-d-sub-body">
          <div className="a-d-sub-body-head">View Details</div>

          {/* {viewdetails.map((data) => ( */}
          <div className="a-d-details" key={viewdetails._id}>
            <div className="a-d-address">
              <div className="a-d-address-data">{viewdetails._id}</div>
              <div className="a-d-address-data">{viewdetails.product_name}</div>
              <div className="a-d-address-data">{viewdetails.cart_qty}</div>
              <div className="a-d-address-data">{viewdetails.category}</div>
              <div className="a-d-address-data">{viewdetails.sub_category}</div>
              <div className="a-d-address-data">{viewdetails.orderstatus}</div>
              <div className="a-d-address-data">{viewdetails.description}</div>
              <div className="a-d-address-data">{viewdetails.sub_category}</div>
            </div>
            <div className="a-d-address">
              {viewdetails.orderstatus == "Order Accepted" ? (
                <>
                  <video width={"200"} height={"50"} autoPlay muted loop>
                    <source src="/delivery.mp4" type="video/mp4" />
                  </video>
                </>
              ) : (
                <>
                  {viewdetails.orderstatus == "Delivered" ? (
                    <>
                      <video width={"200"} height={"150"} autoPlay muted loop>
                        <source src="/delivered.mp4" type="video/mp4" />
                      </video>
                    </>
                  ) : (
                    <>
                      <video width={"200"} height={"100"} autoPlay muted loop>
                        <source src="/pending.mp4" type="video/mp4" />
                      </video>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="a-d-address">
              <div className="a-d-address-data">{viewdetails.name}</div>
              <div className="a-d-address-data">{viewdetails.email}</div>
              <div className="a-d-address-data">
                {viewdetails.alternate_phone}
              </div>
              <div className="a-d-address-data">{viewdetails.address}</div>
              <div className="a-d-address-data">{viewdetails.district}</div>
              <div className="a-d-address-data">{viewdetails.state}</div>
              <div className="a-d-address-data">{viewdetails.pin_code}</div>
            </div>
          </div>
          {/* ))} */}
          <div className="a-d-track">
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
              <>
                {viewdetails.orderstatus == "Order Accepted" ? (
                  <>
                    <Box sx={{ width: "100%" }}>
                      <Stepper activeStep={2} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label} </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ width: "100%" }}>
                      <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label} </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </>
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
