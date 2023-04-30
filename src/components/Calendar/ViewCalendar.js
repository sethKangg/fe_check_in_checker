import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import profile_1 from "../../assets/profile-1.jpg";
import profile_2 from "../../assets/profile-2.jpg";
import { getInfoTS, getViewCaptured } from "../../services/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalUpdateCalendar from "./ModalUpdateCalendar";
const ViewCalendar = (pros) => {
   const { show, setShow, day, month, year, idParams, initCalendar, fetchDataCalendar } = pros;
   const [listImg, setListImg] = useState([]);
   const [showImage, setShowImage] = useState(false);
   const [imageSrc, setImageSrc] = useState("");
   const [dataDay, setDataDay] = useState([]);
   const [showUp, setShowUp] = useState(false);
   const account = useSelector((state) => state.user.account);
   const fetchImg = async (day) => {
      let res = await getViewCaptured(idParams, 1, 0, day, day, "", 1, 20);
      // console.log(res);
      if (res.status === 200) {
         setListImg(res.data.content);
      } else {
         toast.error("Hiện không có ảnh hoặc ảnh bị lỗi");
      }
   };
   const fetchInfo = async (day) => {
      let res = await getInfoTS(idParams, day);
      // console.log("data day: ", res);
      if (res.status === 200) {
         setDataDay(res.data);
      } else {
         toast.error("Có lỗi trong quá trình tải dữ liệu");
      }
   };
   function togglePreview(src) {
      setImageSrc(src);
      setShowImage(true);
   }
   const handleClose = () => {
      setShow(false);
   };
   useEffect(() => {
      if (show === true) {
         const trueMonth = month + 1 < 10 ? "0" + (month + 1) : month + 1;
         const trueDay = day + 1 < 10 ? "0" + (day + 1) : day + 1;
         const time = year + "-" + trueMonth + "-" + trueDay;
         fetchImg(time);
         fetchInfo(time);
         // console.log(time);
      }
   }, [show]);

   const handleSrcImg = (img) => {
      let src = null;
      try {
         src = require(`../../assets/Images${img}`);
      } catch {
         src = require(`../../assets/error.jpg`);
      }
      return src;
   };
   const handleSubmit = () => {};
   const convertMinutesToTime = (minutes) => {
      if (minutes < 60) {
         return minutes + " phút";
      }
      const hour = Math.floor(minutes / 60);
      const minute_remainder = minutes % 60;

      let timeString = `${hour < 10 ? "0" : ""}${hour}:`;
      timeString += `${minute_remainder < 10 ? "0" : ""}${minute_remainder} tiếng`;

      return timeString;
   };
   const converToHM = (time) => {
      try {
         const dateObj = new Date(time);

         const hour = dateObj.getHours();
         const minutes = dateObj.getMinutes().toString().padStart(2, "0");

         const formattedTime = `${hour}:${minutes}`;
         return formattedTime;
      } catch {
         return "Không xác định";
      }
   };
   return (
      <div>
         <Modal className="modal-view-check-in" show={show} onHide={handleClose} size="xl">
            <Modal.Header>
               <Modal.Title className="w-100 d-flex justify-content-between">
                  <div>
                     Check-In{" "}
                     <b>
                        {day + 1} / {month + 1} / {year}{" "}
                     </b>
                  </div>
                  {dataDay && dataDay.updatedHistory && dataDay.lastUpdated && (
                     <div>
                        {dataDay.updatedHistory} lúc {dataDay.lastUpdated}
                     </div>
                  )}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/* {!isLoading && !isLoading1 ? <div className="row g-3"></div> : <div>LOADING ....</div>} */}
               <div className="info">
                  <div className="d-flex justify-content-between">
                     <div className="h3 info-title">Thông tin người dùng</div>
                     {month === new Date().getMonth() &&
                        year === new Date().getFullYear() &&
                        account.roleName === "Human resource" && (
                           <div>
                              <button className="btn btn-warning" onClick={() => setShowUp(true)}>
                                 Chỉnh sửa
                              </button>
                           </div>
                        )}
                  </div>
                  <div className="info-content d-flex align-items-center ">
                     <div className=" col-md-6">
                        Tên:
                        {dataDay.lastName && dataDay.lastName.length > 0
                           ? " " + dataDay.lastName + " " + dataDay.firstName
                           : " chưa có thông tin"}
                     </div>
                     <div className="col-md-6 d-flex mx-1 align-items-center gap-2">
                        Trạng thái Check-In:
                        <div>
                           <div
                              className={`
                           d-flex align-items-center gap-2
                           ${
                              dataDay?.dateStatus === "OK"
                                 ? "c_right_time"
                                 : dataDay?.dateStatus === "LATE"
                                 ? "c_late"
                                 : dataDay?.dateStatus === "ABSENT"
                                 ? "c_not_go"
                                 : ""
                           }`}
                           >
                              <b>
                                 {dataDay?.dateStatus === "OK"
                                    ? " Đúng giờ"
                                    : dataDay?.dateStatus === "LATE"
                                    ? "Đến muộn"
                                    : dataDay?.dateStatus === "ABSENT"
                                    ? " Không đi"
                                    : "Chưa có thông tin"}
                              </b>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="d-flex justify-content-between">
                     <div>
                        <div>
                           {dataDay && dataDay.note && (
                              <>
                                 <label>Ghi chú:</label> {dataDay.note}
                              </>
                           )}
                        </div>
                        <div>
                           {dataDay && dataDay.dayWorkingStatus && (
                              <>
                                 <label>Trạng thái ngày:</label> {dataDay.dayWorkingStatus}
                              </>
                           )}
                        </div>
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                           {dataDay && dataDay.lateCheckInMinutes && (
                              <div>
                                 <label>Check-in muộn: </label>{" "}
                                 {" " + convertMinutesToTime(dataDay.lateCheckInMinutes)}
                              </div>
                           )}
                           {dataDay && dataDay.earlyCheckOutMinutes && (
                              <div>
                                 <label>Check-out sớm: </label>
                                 {" " + convertMinutesToTime(dataDay.earlyCheckOutMinutes)}{" "}
                              </div>
                           )}
                        </div>
                     </div>
                     <div>
                        {dataDay && dataDay.timeCheckIn && (
                           <div className="d-flex justify-content-end align-items-center">
                              <label>Check-in lúc:</label>
                              {" " + dataDay.timeCheckIn}
                           </div>
                        )}
                        {dataDay && dataDay.timeCheckOut && (
                           <div className="d-flex justify-content-end align-items-center">
                              <label>Check-out lúc:</label>
                              {" " + dataDay.timeCheckOut}
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               <div className="info mt-3">
                  <div className="h3 info-title">Ảnh Check-In</div>
                  <div className="info-img d-flex align-items-center justify-align-content-start gap-3 flex-wrap  ">
                     {listImg &&
                        listImg.map((i, e) => (
                           <div className="container-img" key={e}>
                              <img
                                 src={handleSrcImg(i.imagePath)}
                                 width={220}
                                 onClick={() => togglePreview(handleSrcImg(i.imagePath))}
                              />
                              {/* <p>Ảnh thứ #{i.imageVerifyId}</p> */}
                              <p className="mt-3">
                                 {i.status === "APPROVED"
                                    ? "Thành công"
                                    : i.status === "PENDING"
                                    ? "Đang duyệt"
                                    : "Không nhận dạng được"}
                              </p>
                              <p>Chụp lúc {i.verifyTime}</p>
                           </div>
                        ))}

                     {/* <img src={profile_2} width={250} onClick={() => togglePreview(profile_2)} /> */}
                     {/* <img src={profile_1} /> */}
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
            </Modal.Footer>
            <ModalUpdateCalendar
               show={showUp}
               setShow={setShowUp}
               day={day}
               month={month}
               year={year}
               idParams={idParams}
               data={dataDay}
               fetchImg={fetchImg}
               fetchInfo={fetchInfo}
               initCalendar={initCalendar}
               fetchDataCalendar={fetchDataCalendar}
            />
         </Modal>
         {showImage && (
            <div className="modal-preview" onClick={() => setShowImage(false)}>
               <img src={imageSrc} alt="big image" />
            </div>
         )}
      </div>
   );
};

export default ViewCalendar;
