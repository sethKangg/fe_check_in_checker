import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import profile_1 from "../../../assets/profile-1.jpg";
import { getImgTrainStaff, postImgTraining } from "../../../services/apiService";
// import postImgTraining from "../../../services/apiService";
// import profile_2 from "../../assets/profile-2.jpg";

const ModalViewStaff = (pros) => {
   const { show, setShow, dataView } = pros;
   const [showImage, setShowImage] = useState(false);
   const [imageSrc, setImageSrc] = useState("");
   const [base64String, setBase64String] = useState("");
   const [listImg, setListImg] = useState([]);
   function togglePreview(src) {
      setImageSrc(src);
      setShowImage(true);
   }
   const handleClose = () => {
      setShow(false);
   };
   useEffect(() => {
      if (show === true) {
         // console.log(dataView);
         fetchImgUser();
      }
   }, [show]);

   const fetchImgUser = async () => {
      let res = await getImgTrainStaff(dataView.id);
      if (res.status === 200) {
         console.log(res.data);
         setListImg(res.data.content);
      }
   };
   const handleSrcImg = (img) => {
      let src = null;
      try {
         src = require(`../../../assets/Images${img}`);
      } catch {
         src = require(`../../../assets/error.jpg`);
      }
      return src;
   };
   const handleSubmit = () => {
      if (base64String === null || base64String === "") return toast.error("Vui lòng chọn ảnh");
      console.log(base64String);
      console.log(base64String.substring(23));
      postApiTraining(base64String.substring(23));
   };
   const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setBase64String(reader.result);
      };
   };

   const postApiTraining = async (img) => {
      let res = await postImgTraining(dataView.id, img);
      console.log(res);
      if (res.status === 200) {
         toast.success("Thêm ảnh nhận diện thành công");
      }
   };

   const convertTime = (time) => {
      const date = new Date(time);

      const options = {
         timeZone: "Asia/Ho_Chi_Minh",
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
         hour: "numeric",
         minute: "numeric",
         // second: "numeric",
      };

      const localTime = date.toLocaleString("vi-VN", options);
      return localTime;
   };
   return (
      <div>
         <Modal className="modal-view-check-in" show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>
                  Thông tin nhận diện khuôn mặt{" "}
                  <b>
                     {dataView.fullName} #{dataView.id}
                  </b>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/* {!isLoading && !isLoading1 ? <div className="row g-3"></div> : <div>LOADING ....</div>} */}
               <div className="info">
                  <div className="d-flex flex-column">
                     <h3>Thêm ảnh nhận dạng</h3>
                     <div className="d-flex justify-content-between">
                        <input
                           // style="visibility:hidden"
                           type="file"
                           onChange={handleFileInputChange}
                           placeholder="Tải ảnh từ máy "
                        />
                        {base64String && (
                           <div className="d-flex flex-column ">
                              <div className="d-flex justify-content-center">Ảnh chọn</div>
                              <img
                                 className="mt-2"
                                 src={base64String}
                                 alt="Converted to Base64"
                                 width="200"
                              />
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="h3 info-title mt-3">Thông tin người dùng</div>
                  <div className="info-content d-flex align-items-center ">
                     <div className=" col-md-6">Tên tài khoản: </div>
                     <div className="col-md-6">Trạng thái khuôn mặt: </div>
                  </div>
               </div>
               <div className="info mt-3">
                  <div
                     className="h3 info-title"
                     onClick={() => {
                        console.log(listImg);
                     }}
                  >
                     Ảnh nhận diện{" "}
                  </div>
                  <div className="info-img d-flex align-items-center justify-align-content-start gap-3 flex-wrap  ">
                     {listImg &&
                        listImg.map((e, i) => (
                           <div className="container-img" key={i}>
                              <img
                                 src={handleSrcImg(e.image)}
                                 width={250}
                                 onClick={() => togglePreview(profile_1)}
                              />
                              <p className="mt-2"> {convertTime(e.timeSetup)}</p>
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
export default ModalViewStaff;
