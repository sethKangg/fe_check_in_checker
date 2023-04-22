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
import Report from "./components/Report/Report";
import ForgotPassword from "./components/Auth/ForgotPassword";
import PrivateRoute from "./routes/PrivateRoute";
import ErrorAuth from "./components/Auth/ErrorAuth";
import ErrorPage from "./components/Auth/ErrorPage";
import MonthlyReport from "./components/Report/MonthlyReport";
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
               <Route
                  path="/group"
                  element={
                     <PrivateRoute acceptRole={[2, 4]}>
                        <Groups />
                     </PrivateRoute>
                  }
               ></Route>
               <Route
                  path="/project"
                  element={
                     <PrivateRoute acceptRole={[2, 3, 4]}>
                        <Projects />
                     </PrivateRoute>
                  }
               ></Route>
               <Route path="/calendar" element={<Calendar />}></Route>
               <Route path="/allCamera" element={<AllCamera />}></Route>
               <Route path="/report" element={<Report />}></Route>
               <Route path="/monthly-report" element={<MonthlyReport />}></Route>
               {/* <Route path="/testCamera" element={<TestCamera />}></Route> */}
            </Route>
            <Route
               path="/manage/"
               element={
                  <PrivateRoute acceptRole={[1, 2]}>
                     <Manage />
                  </PrivateRoute>
               }
            >
               <Route
                  path="manage-account"
                  element={
                     <PrivateRoute acceptRole={[1]}>
                        <ManageAccount />
                     </PrivateRoute>
                  }
               />
               <Route path="manage-staff" element={<ManageStaff />} />
               <Route path="view-capture" element={<ViewCaptured />} />
               {/* <Route path="dashboard" element={<Admin />} /> */}
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/error-authe" element={<ErrorAuth />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
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
