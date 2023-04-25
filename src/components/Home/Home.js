import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import storage from "redux-persist/es/storage";
import localStorage from "redux-persist/es/storage";
import videoHomePage from "../../assets/intro-home.mp4";
import profile_1 from "../../assets/profile-2.jpg";

import { AccessToken } from "../Auth/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const Home = () => {
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   const account = useSelector((state) => state.user.account);
   const navigate = useNavigate();
   return (
      <div className="home-container w-100 ">
         <div className="d-flex w-100 h-100 p-3 m-auto pt-5">
            <div className="w-50 m-auto">
               <h1
                  style={{
                     fontSize: "50px",
                     fontWeight: "600px",
                  }}
               >
                  Chào mừng đến với hệ thống quản lý chấm công
               </h1>
               <div className="mt-3">
                  Công cụ chấm công sử dụng Server nhận diện khuôn mặt, giúp quản lý thời gian làm
                  việc hiệu quả và chuyên nghiệp hơn.
               </div>
               <div className="mt-3"></div>
                  <div className="mt-3 w-100 d-flex justify-content-center">
                  <div className="text-box">
                     <div className="lg_row" style={{}}>
                        <p
                           onClick={() => navigate("/check_in")}
                           style={{
                              border: "2px solid black",
                              color: "#000",
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           <AiOutlineArrowRight /> Chấm công
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="d-flex justify-content-end w-50">
               <video
                  className=" right-0"
                  width="100%"
                  autoPlay
                  muted
                  loop
                  style={{
                     borderRadius: "10px",
                  }}
               >
                  <source src={videoHomePage} type="video/mp4" />
               </video>
            </div>
         </div>
      </div>
   );
};

export default Home;
