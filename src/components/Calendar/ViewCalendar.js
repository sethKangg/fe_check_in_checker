import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import profile_1 from "../../assets/profile-1.jpg";
import profile_2 from "../../assets/profile-2.jpg";
const ViewCalendar = (pros) => {
   const { show, setShow, day, month, year } = pros;
   const [showImage, setShowImage] = useState(false);
   const [imageSrc, setImageSrc] = useState("");

   function togglePreview(src) {
      setImageSrc(src);
      setShowImage(true);
   }
   const handleClose = () => {
      setShow(false);
   };
   useEffect(() => {
      if (show === true) {
         console.log(day + 1 + "/" + (month + 1) + "/" + year);
      }
   }, [show]);
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
                     <div className="container-img">
                        <img src={profile_1} width={250} onClick={() => togglePreview(profile_1)} />
                        <p>Lorem ispum</p>
                     </div>
                     <div className="container-img">
                        <img src={profile_1} width={250} onClick={() => togglePreview(profile_1)} />
                        <p>Lorem ispum</p>
                     </div>
                     <div className="container-img">
                        <img src={profile_1} width={250} onClick={() => togglePreview(profile_1)} />
                        <p>Lorem ispum</p>
                     </div>
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
