import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import CheckIn from "./components/Checkin/CheckIn";
import ManageAccount from "./components/Manage/Content-Admin/ManageAccount";
import Manage from "./components/Manage/Manage";
import ManageStaff from "./components/Manage/Content-HR/ManageStaff";
import Profile from "./components/User/Profile";
import Groups from "./components/Group/Groups";
import Projects from "./components/Projects/Projects";
import Calendar from "./components/Calendar/Calendar";
import AllCamera from "./components/Camera/AllCamera";
import TestCamera from "./components/Camera/TestCamera";
import ViewCaptured from "./components/Manage/Content-ViewCapture/ViewCaptured";
// import AllCamera from "./components/Camera/AllCamera";
// import Camera from "./components/Camera/Camera";
const Layout = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<App />}>
               <Route index element={<Home />} />
               <Route path="/users" element={<User />} />
               <Route path="/check_in" element={<TestCamera />}></Route>
               <Route path="/profile/:username" element={<Profile />}></Route>
               <Route path="/group" element={<Groups />}></Route>
               <Route path="/project" element={<Projects />}></Route>
               <Route path="/calendar/:id" element={<Calendar />}></Route>
               <Route path="/allCamera" element={<AllCamera />}></Route>
               {/* <Route path="/testCamera" element={<TestCamera />}></Route> */}
            </Route>
            <Route path="/manage/" element={<Manage />}>
               <Route path="manage-account" element={<ManageAccount />} />
               <Route path="manage-staff" element={<ManageStaff />} />
               <Route path="view-capture" element={<ViewCaptured />} />
               {/* <Route path="dashboard" element={<Admin />} /> */}
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
