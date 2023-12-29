import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./components/loginpage/LoginPage";
import RegistrationPage from "./components/registrationpage/RegistrationPage";
import Addproduct from "./components/AdminProduct/Addproduct";
import Viewproduct from "./components/AdminProduct/Viewproduct";
import Navbar from "./components/Navbar/Navbar";
import Editproduct from "./components/AdminProduct/Editproduct";
import Userproduct from "./components/Userproduct/Userproduct";
import Useraddproduct from "./components/Userproduct/Useraddproduct";
import Userviewproduct from "./components/Userproduct/Userviewproduct";
import Volunteerhome from "./components/Volunteer/Volunteerhome";
import Profilehome from "./components/Profile/Profilehome";
// import Profileedit from "./components/Profile/Profileedit";
import Uuidverify from "./components/uuid/Uuidverify";
import Usercart from "./components/Userproduct/Usercart";
import Footer from "./components/footer/Footer";
import Volunteerregister from "./components/Volunteer/Volunteerregister";
import Volunteerlist from "./components/AdminProduct/Volunteerlist";
import Volunteerrequest from "./components/AdminProduct/Volunteerrequest";
import axios from "axios";

function App() {
  // const navigate=useNavigate()
  const token = localStorage.getItem("Token");
  useEffect(() => {
    axios
      .get(`http://localhost:2222/api/login/authtime`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        // navigate('/login')
      });
  });

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Userproduct />} />

        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<Viewproduct />} />
        <Route path="/admin/addproduct" element={<Addproduct />} />
        <Route path="/admin/editproduct/:id" element={<Editproduct />} />
        <Route path="/admin/viewproduct" element={<Viewproduct />} />
        {/* <Route path="/user" element={<ReactOne />} /> */}

        <Route path="/profile" element={<Profilehome />} />

        {/* <Route path="/" element={<Useraddproduct />} /> */}

        <Route path="/user" element={<Userproduct />} />
        <Route path="/user/addproduct" element={<Useraddproduct />} />
        <Route path="/user/viewproduct" element={<Userviewproduct />} />
        {/* <Route path="/profileedit" element={<Profileedit />} /> */}
        <Route path="/uuidverify" element={<Uuidverify />} />
        <Route path="/usercart" element={<Usercart />} />

        <Route path="/volunteer" element={<Volunteerhome />} />
        <Route path="/volunteer/register" element={<Volunteerregister />} />
        <Route path="/volunteer/list" element={<Volunteerlist />} />
        <Route path="/volunteer/request" element={<Volunteerrequest />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
