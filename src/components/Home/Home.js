import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import storage from "redux-persist/es/storage";
import localStorage from "redux-persist/es/storage";
import videoHomePage from "../../assets/intro-home.mp4";
import profile_1 from "../../assets/profile-1.jpg";

import { AccessToken } from "../Auth/auth";
const Home = () => {
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   const account = useSelector((state) => state.user.account);
   const storedDataPromise = localStorage.getItem("persist:root");
   console.log(storedDataPromise);

   return (
      <div className="home-container">
         <div className="d-flex w-100 ">
            <div className="w-50">
               <h1 className="">
                  Phần mềm check in chấm công etcetc etc etc etc etc etc etc etc etc etc etc c
               </h1>
               <div className="mt-3">
                  loremispum loremispum loremispum loremispum loremispum loremispum loremispum
                  loremispum loremispum
               </div>
               <div className="mt-3">
                  loremispum loremispum loremispum loremispum loremispum loremispum loremispum
                  loremispum loremispum
               </div>
               <div className="mt-3 w-100 d-flex justify-content-center">
                  <button className="btn border-dark form-control-lg text-info border-2 ">
                     Check in here
                  </button>
               </div>
            </div>
            <div className="d-flex justify-content-end w-[720px]">
               <video className=" right-0" width="700px" autoPlay muted loop>
                  <source src={videoHomePage} type="video/mp4" />
               </video>
            </div>
         </div>
         <div className="home-content w-100 mt-3 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center">
               <div className="img-profile">
                  {/* <img src={require(profile_1)} /> */}
                  <img className="w-[250px] h-[160px]" src={profile_1} />
               </div>
               <div className="">Profescor ssxsx</div>
            </div>
         </div>
         <div className="mt-5 home-content w-100 mt-3 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center">
               <div className="img-profile">
                  {/* <img src={require(profile_1)} /> */}
                  <img className="w-[250px] h-[160px]" src={profile_1} />
               </div>
               <div className="">Profescor ssxsx</div>
            </div>
            <div className="d-flex flex-column align-items-center">
               <div className="img-profile">
                  {/* <img src={require(profile_1)} /> */}
                  <img className="w-[250px] h-[160px]" src={profile_1} />
               </div>
               <div className="">Profescor ssxsx</div>
            </div>
            <div className="d-flex flex-column align-items-center">
               <div className="img-profile">
                  {/* <img src={require(profile_1)} /> */}
                  <img className="w-[250px] h-[160px]" src={profile_1} />
               </div>
               <div className="">Profescor ssxsx</div>
            </div>
            <div className="d-flex flex-column align-items-center">
               <div className="img-profile">
                  {/* <img src={require(profile_1)} /> */}
                  <img className="w-[250px] h-[160px]" src={profile_1} />
               </div>
               <div className="">Profescor ssxsx</div>
            </div>
         </div>
      </div>
   );
};

export default Home;
