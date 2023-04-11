import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import profile_1 from "../../assets/profile-1.jpg";
import profile_2 from "../../assets/profile-2.jpg";
import { getViewCaptured } from "../../services/apiService";
import { useSelector } from "react-redux";
const ViewCalendar = (pros) => {
   const { show, setShow, day, month, year } = pros;
   const [listImg, setListImg] = useState([]);
   const [showImage, setShowImage] = useState(false);
   const [imageSrc, setImageSrc] = useState("");
   const account = useSelector((state) => state.user.account);
   const fetchImg = async (day) => {
      let res = await getViewCaptured(account.id, 1, 0, day, day, "", 1, 20);
      console.log(res);
      if (res.status === 200) {
         setListImg(res.data.content);
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
         const time = year + "-" + trueMonth + "-" + (day + 1);
         fetchImg(time);
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
            <Modal.Header closeButton>
               <Modal.Title>
                  Check-In{" "}
                  <b>
                     {day + 1} / {month + 1} / {year}
                  </b>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/* {!isLoading && !isLoading1 ? <div className="row g-3"></div> : <div>LOADING ....</div>} */}
               <div className="info">
                  <div className="h3 info-title">Thông tin người dùng</div>
                  <div className="info-content d-flex align-items-center ">
                     <div className=" col-md-6">Tên: </div>
                     <div className="col-md-6">Trạng thái Check-In: </div>
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
               <Button variant="primary" onClick={handleSubmit}>
                  Thêm thành viên
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

export default ViewCalendar;
