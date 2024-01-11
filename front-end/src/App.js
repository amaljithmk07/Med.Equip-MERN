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
import Navbar from "./components/Navbar/Navbar";
import Editproduct from "./components/AdminProduct/Editproduct";
import Userproduct from "./components/Userproduct/Home";
import Useraddproduct from "./components/Userproduct/Useraddproduct";
import Userviewproduct from "./components/Userproduct/Viewproduct";
import Volunteerhome from "./components/Volunteer/Volunteerhome";
import Profilehome from "./components/Profile/Profilehome";
// import Profileedit from "./components/Profile/Profileedit";
import Uuidverify from "./components/uuid/Uuidverify";
import Usercart from "./components/Userproduct/Usercart";
import Footer from "./components/footer/Footer";
import Volunteerregister from "./components/Volunteer/Volunteerregister";
import Volunteerlist from "./components/AdminProduct/Volunteerlist";
import Volunteerrequest from "./components/AdminProduct/Volunteerrequest";
import Userprofileupdate from "./components/Profile/Userprofileupdate";
import Volunteerprofileupdate from "./components/Profile/Volunteerprofileupdate";
import Home from "./components/Userproduct/Home";
import Ordersummary from "./components/Userproduct/Ordersummary";
import Orderrequest from "./components/Volunteer/Orderrequest";
import Acceptedorders from "./components/Volunteer/Acceptedorders";

function App() {
  // const navigate = useNavigate();

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/order-summary" element={<Ordersummary />} />

        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<Home />} />
        <Route path="/admin/addproduct" element={<Addproduct />} />
        <Route path="/admin/editproduct/:id" element={<Editproduct />} />
        <Route path="/admin/viewproduct" element={<Userviewproduct />} />

        <Route path="/profile" element={<Profilehome />} />
        <Route path="/Userprofileupdate" element={<Userprofileupdate />} />
        <Route
          path="/volunteerprofileupdate"
          element={<Volunteerprofileupdate />}
        />

        <Route path="/user/addproduct" element={<Useraddproduct />} />
        <Route path="/user/viewproduct" element={<Userviewproduct />} />
        <Route path="/uuidverify" element={<Uuidverify />} />
        <Route path="/usercart" element={<Usercart />} />

        <Route path="/volunteer" element={<Volunteerhome />} />
        <Route path="/volunteer/register" element={<Volunteerregister />} />
        <Route path="/volunteer/list" element={<Volunteerlist />} />
        <Route path="/volunteer/request" element={<Volunteerrequest />} />
        <Route path="/volunteer/order-request" element={<Orderrequest />} />
        <Route path="/volunteer/accepted-orders" element={<Acceptedorders />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
