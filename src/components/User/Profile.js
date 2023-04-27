import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../services/apiService";
import "./Profile.scss";
import profile from "../../assets/profile-2.jpg";
import LetterAvatar from "./LetterAvatar";
import ModalUpdateProfile from "./ModalUpdateProfile";
import { useSelector } from "react-redux";
import ModalChangePass from "./ModalChangePass";

const Profile = (pros) => {
   const account = useSelector((state) => state.user.account);
   // console.log("account", account);
   const [userData, setUserData] = useState([]);
   const [showUpdate, setShowUpdate] = useState(false);
   const [dataUpdate, setDataUpdate] = useState({});
   const [dataCP, setDataCP] = useState({});
   const [showCP, setShowCP] = useState(false);
   const params = useParams();
   const usernameParam = params.username;
   const navigate = useNavigate();
   const fetchProfileInfor = async () => {
      let res = await getProfile(usernameParam);
      console.log(res.data);
      if (res.status === 200) {
         setUserData(res.data);
      } else {
         navigate("/error-authe");
      }
   };

   const handleClickUpdate = (value, item) => {
      setShowUpdate(value);
      setDataUpdate(item);
      // console.log(item);
   };
   const handleClickCP = (value, item) => {
      setShowCP(value);
      setDataCP(item);
   };
   useEffect(() => {
      fetchProfileInfor();
   }, [usernameParam]);
   const convertTime = (time) => {
      const date = new Date(time);

      const options = {
         timeZone: "Asia/Ho_Chi_Minh",
         // weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
         // hour: "numeric",
         // minute: "numeric",
         // second: "numeric",
      };

      const localTime = date.toLocaleString("vi-VN", options);
      return localTime;
   };
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
            <div className="btn-edit d-flex justify-content-end gap-3">

               {account.username === userData.username ? <button
                  className="btn btn-warning"
                  onClick={() => handleClickUpdate(true, userData)}
               >
                  Cập nhật tài khoản
               </button> : account.roleName === "Human resource" ? <button
                  className="btn btn-warning"
                  onClick={() => handleClickUpdate(true, userData)}
               >
                  Cập nhật tài khoản
               </button> : (
                  <></>
               )}
               {account.username === userData.username && (
                  <button className="btn btn-warning" onClick={() => handleClickCP(true, userData)}>
                     Đặt lại mật khẩu
                  </button>
               )}
            </div>
            <div className="info mt-3">
               <h1
                  className="d-flex justify-content-center "
                  onClick={() => {
                     console.log(account.username === userData.username, account.roleName === "Human resource");
                  }}
               >
                  Thông tin tài khoản
               </h1>
               <div className="info_data">
                  <div className="data">
                     <h3>Email</h3>
                     <p>{userData.email}</p>
                  </div>
                  <div className="data">
                     <h3>Số điện thoại</h3>
                     <p>{userData.phone}</p>
                  </div>
               </div>
               <div className="info_data">
                  <div className="data">
                     <h3>Ngày sinh</h3>
                     <p>{!userData.dateOfBirth ? "" : convertTime(userData.dateOfBirth)}</p>
                  </div>
                  <div className="data">
                     <h3>Nhóm hiện tại</h3>
                     <p>
                        {account.groupName
                           ? `${account.groupName} #${account.groupId}`
                           : "Đang không thuộc nhóm nào"}
                     </p>
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
                              <div>Tên dự án: {e.projectName} </div>
                              <div>Thời gian: {e.createDate} </div>
                              <div>
                                 Trạng thái: <b> {e.status === "Done"
                                    ? "Hoàn thành"
                                    : e.status === "Cancel"
                                       ? "Hủy bỏ"
                                       : "Đang tiến hành"}</b>
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
         <ModalChangePass show={showCP} setShow={setShowCP} data={dataCP} />
         <ModalUpdateProfile
            show={showUpdate}
            setShow={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchProfileInfor={fetchProfileInfor}
         />
      </div>
   );
};

export default Profile;
