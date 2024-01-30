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
import Editproduct from "./components/User/Editproduct";
import Useraddproduct from "./components/User/Useraddproduct";
import Volunteerhome from "./components/Volunteer/Volunteerhome";
import Profilehome from "./components/Profile/Profilehome";
import Uuidverify from "./components/uuid/Uuidverify";
import Usercart from "./components/User/Usercart";
import Footer from "./components/footer/Footer";
import Volunteerregister from "./components/Volunteer/Volunteerregister";
import Volunteerlist from "./components/AdminProduct/Volunteerlist";
import Volunteerrequest from "./components/AdminProduct/Volunteerrequest";
import Userprofileupdate from "./components/Profile/Userprofileupdate";
import Volunteerprofileupdate from "./components/Profile/Volunteerprofileupdate";
import Home from "./components/User/Home";
import Ordersummary from "./components/User/Ordersummary";
import Orderrequest from "./components/Volunteer/Orderrequest";
import Acceptedorders from "./components/Volunteer/Acceptedorders";
import Viewproduct from "./components/User/Viewproduct";
import Orderplace from "./components/User/Orderplace";
import Address from "./components/Profile/Address";
import Donatedproducts from "./components/User/Donatedproducts";
import Viewdetails from "./components/Volunteer/Viewdetails";
import Updateaddress from "./components/Profile/Updateaddress";

function App() {
  // const navigate = useNavigate();

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<Home />} />
        <Route path="/admin/addproduct" element={<Addproduct />} />
        <Route path="/admin/viewproduct" element={<Viewproduct />} />

        <Route path="/profile" element={<Profilehome />} />
        <Route path="/Userprofileupdate" element={<Userprofileupdate />} />
        <Route
          path="/volunteerprofileupdate"
          element={<Volunteerprofileupdate />}
        />

        <Route path="/user/donated-products" element={<Donatedproducts />} />
        <Route path="/user/editproduct/:id" element={<Editproduct />} />
        <Route path="/user/address" element={<Address />} />
        <Route path="/user/update-address/:id" element={<Updateaddress />} />
        <Route path="/user/addproduct" element={<Useraddproduct />} />
        <Route path="/user/viewproduct" element={<Viewproduct />} />
        <Route path="/uuidverify" element={<Uuidverify />} />
        <Route path="/usercart" element={<Usercart />} />
        <Route path="/user/order-place" element={<Orderplace />} />
        <Route path="/user/order-summary" element={<Ordersummary />} />

        <Route path="/volunteer/view-details/:id" element={<Viewdetails />} />

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
