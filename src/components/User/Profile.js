import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../services/apiService";
import "./Profile.scss";
import profile from "../../assets/profile-2.jpg";
import LetterAvatar from "./LetterAvatar";
import ModalUpdateProfile from "./ModalUpdateProfile";
import { useSelector } from "react-redux";

const Profile = (pros) => {
   const account = useSelector((state) => state.user.account);
   // console.log("account", account);
   const [userData, setUserData] = useState([]);
   const [showUpdate, setShowUpdate] = useState(false);
   const [dataUpdate, setDataUpdate] = useState({});
   const params = useParams();
   const usernameParam = params.username;
   const navigate = useNavigate();
   const fetchProfileInfor = async () => {
      let res = await getProfile(usernameParam);
      console.log(res.data);
      if (res.status === 200) {
         setUserData(res.data);
      } else {
         navigate("/");
      }
   };

   const handleClickUpdate = (value, item) => {
      setShowUpdate(value);
      setDataUpdate(item);
      // console.log(item);
   };

   useEffect(() => {
      fetchProfileInfor();
   }, [usernameParam]);
   return (
      <div className="wrapper">
         <div className="left">
            <div className="d-flex flex-column justify-content-center">
               <LetterAvatar
                  name={
                     userData.surname && userData.firstName
                        ? userData.surname + " " + userData.firstName
                        : ""
                  }
               />
               <h3 className="mt-3">{userData.surname + " " + userData.firstName}</h3>
               <h5 className="mt-1">{userData.roleName}</h5>
            </div>
         </div>
         <div className="right">
            {account.username === userData.username && (
               <div className="btn-edit d-flex justify-content-end">
                  <button
                     className="btn btn-warning"
                     onClick={() => handleClickUpdate(true, userData)}
                  >
                     Cập nhật tài khoản
                  </button>
               </div>
            )}
            <div className="info">
               <h3>Thông tin</h3>
               <div className="info_data">
                  <div className="data">
                     <h3>Email</h3>
                     <p>{userData.email}</p>
                  </div>
                  <div className="data">
                     <h3>Phone</h3>
                     <p>{userData.phone}</p>
                  </div>
               </div>
               <div className="info_data">
                  <div className="data">
                     <h3>Ngày sinh</h3>
                     <p>{!userData.dateOfBirth ? "" : userData.dateOfBirth}</p>
                  </div>
                  <div className="data">
                     <h3>Cấp bậc</h3>
                     {/* <p>{userData.promotionLevel}</p> */}
                     <p>{userData.dateOfBirth}</p>
                  </div>
               </div>
            </div>

            <div className="projects">
               <h3>Dự án gần đây </h3>
               <div className="projects_data">
                  <div className="dat">
                     {userData.listProject &&
                        userData.listProject.map((e, i) => (
                           <div key={i} className="d-flex gap-3 mb-3">
                              <div>Tên dự án: {userData.listProject[i].projectName} </div>
                              <div>Thời gian: {userData.listProject[i].createDate} </div>
                              <div>
                                 Trạng thái: <b>{userData.listProject[i].status}</b>
                              </div>
                           </div>
                        ))}
                  </div>
                  ;
                  {/* <div className="data">
                     <h3>Most Viewed</h3>
                     <p>dolor sit amet.</p>
                  </div> */}
               </div>
            </div>
         </div>
         <ModalUpdateProfile show={showUpdate} setShow={setShowUpdate} dataUpdate={dataUpdate} />
      </div>
   );
};

export default Profile;
