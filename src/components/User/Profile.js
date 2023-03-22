import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProfile } from "../../services/apiService";
import "./Profile.scss";
import profile from "../../assets/profile-2.jpg";
const Profile = (pros) => {
   const params = useParams();
   const usernameParam = params.username;
   const fetchProfileInfor = async () => {
      let res = await getProfile();
   };

   useEffect(() => {}, [usernameParam]);
   return (
      <div className="wrapper">
         <div className="left">
            {/* <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100"> */}
            <img alt="user" width="240" src={profile} />
            <h4>Alex William</h4>
            <p>UI Developer</p>
         </div>
         <div className="right">
            <div className="info">
               <h3>Thông tin</h3>
               <div className="info_data">
                  <div className="data">
                     <h4>Email</h4>
                     <p>alex@gmail.com</p>
                  </div>
                  <div className="data">
                     <h4>Phone</h4>
                     <p>0001-213-998761</p>
                  </div>
               </div>
            </div>

            <div className="projects">
               <h3>Dự án gần đây </h3>
               <div className="projects_data">
                  <div className="dat">
                     <div className="d-flex gap-3 mb-3">
                        <div>Tên dự án: lỏem ípma ínad ía dmgưo niwrng iởng iwnrg iởn </div>
                        <div>Thời gian: 01/02/2001 - 03/04/2002 </div>
                        <div>
                           Trạng thái: <b>Hoàn thành</b>{" "}
                        </div>
                     </div>
                     <div className="d-flex gap-3">
                        <div>Tên dự án: lỏem ípma ínad ía dmgưo niwrng iởng iwnrg iởn </div>
                        <div>Thời gian: 01/02/2001 - 03/04/2002 </div>
                        <div>
                           Trạng thái: <b>Hoàn thành</b>{" "}
                        </div>
                     </div>
                  </div>
                  {/* <div className="data">
                     <h4>Most Viewed</h4>
                     <p>dolor sit amet.</p>
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;
