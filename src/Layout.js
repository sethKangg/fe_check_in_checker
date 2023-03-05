import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Admin from "./components/Admin/Admin";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import CheckIn from "./components/Checkin/CheckIn";
import ManageAccount from "./components/Manage/Content-Admin/ManageAccount";
import Manage from "./components/Manage/Manage";
// import AllCamera from "./components/Camera/AllCamera";
// import Camera from "./components/Camera/Camera";
const Layout = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<App />}>
               <Route index element={<Home />} />
               <Route path="/users" element={<User />} />
               <Route path="/check_in" element={<CheckIn />}></Route>
            </Route>
            <Route path="/manage" element={<Manage />}>
               <Route index path="manage-account" element={<ManageAccount />} />
               <Route path="dashboard" element={<Admin />} />
            </Route>
            <Route path="/login" element={<Login />}></Route>
         </Routes>
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
         />
      </>
   );
};

export default Layout;
