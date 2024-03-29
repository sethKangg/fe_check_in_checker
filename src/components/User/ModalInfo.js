import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { getInfoTS, getViewCaptured } from "../../services/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalInfo = (pros) => {
   const { show, setShow, idParams, setId, modalTitle } = pros;
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
      // const id_true = idParams.id ? idParams.id : idParams.staffId;
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
      setId([]);
      setDataDay([]);
      setListImg([]);
      setShow(false);
   };
   useEffect(() => {
      if (show === true) {
         const time = new Date().toISOString().slice(0, 10);
         fetchImg(time);
         fetchInfo(time);
         // console.log(time);
      }
   }, [show]);

   const handleSrcImg = (img) => {
      let src = null;
      try {
         //  src = require(`../../assets/Images${img}`);
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
                  <div>Check-In hôm nay</div>
                  {dataDay && dataDay.updatedHistory && dataDay.lastUpdated && (
                     <div>
                        {dataDay.updatedHistory} lúc {dataDay.lastUpdated}
                     </div>
                  )}{" "}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/* {!isLoading && !isLoading1 ? <div className="row g-3"></div> : <div>LOADING ....</div>} */}
               <div className="info">
                  <div className="d-flex justify-content-between">
                     <div className="h3 info-title">Thông tin người dùng</div>
                  </div>
                  <div className="info-content d-flex align-items-center ">
                     <div className=" col-md-6">
                        Tên:{" "}
                        {modalTitle && modalTitle.length > 0 ? modalTitle : " chưa có thông tin"}
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
                  <div className="d-flex mt-3 ">
                     <div className="w-50">
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
                        {/* <div className="mt-3 d-flex align-items-center">
                           {dataDay && dataDay.lateCheckInMinutes && (
                              <div>
                                 <label>Check-in muộn: </label>
                                 {" " + convertMinutesToTime(dataDay.lateCheckInMinutes)}
                              </div>
                           )}
                           {dataDay && dataDay.earlyCheckOutMinutes && (
                              <div>
                                 <label>Check-out sớm: </label>
                                 {" " + convertMinutesToTime(dataDay.earlyCheckOutMinutes)}
                              </div>
                           )}
                        </div> */}
                     </div>
                     <div className="w-50 mt-">
                        {dataDay && dataDay.timeCheckIn && (
                           <div className="d-flex gap-2 align-items-center">
                              <label>Check-in lúc: </label>
                              {" " + dataDay.timeCheckIn}
                              {dataDay && dataDay.lateCheckInMinutes && (
                                 <div>
                                    {"(Muộn " +
                                       convertMinutesToTime(dataDay.lateCheckInMinutes) +
                                       ")"}
                                 </div>
                              )}
                           </div>
                        )}
                        {dataDay && dataDay.timeCheckOut && (
                           <div className="d-flex gap-2 align-items-center">
                              <label>Check-out lúc:</label>
                              {" " + dataDay.timeCheckOut}
                              {dataDay && dataDay.earlyCheckOutMinutes && (
                                 <div>
                                    {"(Sớm " +
                                       convertMinutesToTime(dataDay.earlyCheckOutMinutes) +
                                       ")"}
                                 </div>
                              )}
                           </div>
                        )}
                     </div>
                  </div>
                  <h5 className="mt-3">
                     <b>
                        Thời gian làm việc: {dataDay.workingHours ? dataDay.workingHours : "0"}{" "}
                        tiếng
                     </b>
                  </h5>
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
         </Modal>
         {showImage && (
            <div className="modal-preview" onClick={() => setShowImage(false)}>
               <img src={imageSrc} alt="big image" />
            </div>
         )}
      </div>
   );
};

export default ModalInfo;
