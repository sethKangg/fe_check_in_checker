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
      console.log("data day: ", res);
      if (res.status === 200) {
         setDataDay(res.data);
      } else {
         toast.error("Chạy api lỗi");
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
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/* {!isLoading && !isLoading1 ? <div className="row g-3"></div> : <div>LOADING ....</div>} */}
               <div className="info">
                  <div>{dataDay && dataDay.note && <div>Ghi chú: {dataDay.note}</div>}</div>
                  <div className="d-flex justify-content-between">
                     <div className="h3 info-title">Thông tin người dùng</div>
                     {month === new Date().getMonth() &&
                        year === new Date().getFullYear() &&
                        account.roleName === "HUMAN RESOURCE" && (
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
                        {dataDay && dataDay.length > 0
                           ? dataDay.lastName + " " + dataDay.firstName
                           : " chưa có thông tin"}
                     </div>
                     <div className="col-md-6 d-flex mx-1 align-items-center gap-2">
                        Trạng thái Check-In:
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

               <div className="info mt-3">
                  <div className="h3 info-title">Ảnh Check-In </div>
                  <div className="info-img d-flex align-items-center justify-align-content-start gap-3 flex-wrap  ">
                     {listImg &&
                        listImg.map((i, e) => (
                           <div className="container-img" key={e}>
                              <img
                                 src={handleSrcImg(i.imagePath)}
                                 width={220}
                                 onClick={() => togglePreview(handleSrcImg(i.imagePath))}
                              />
                              <p>Ảnh thứ #{i.imageVerifyId}</p>
                              <p>{i.status}</p>
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
