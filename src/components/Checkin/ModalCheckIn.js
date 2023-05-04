import React from "react";
import { Button, Modal } from "react-bootstrap";
import { addRecognizeImg } from "../../services/apiService";
import axios from "../../utils/axiosCustomize";
const ModalCheckIn = (props) => {
   const { show, setShow, imgPreview } = props;
   const handleClose = () => {
      setShow(false);
   };
   // console.log(imgPreview);
   const sendAPI = async () => {
      // const imgData = imgPreview.substring(22);
      const imgData = imgPreview.substring("data:image/webp;base64,".length);
      // console.log(imgData);
      // let data = { img: { imgPreview } };
      let res = await addRecognizeImg(imgData);
      console.log(res);
   };
   return (
      <div>
         <>
            <Modal show={show} onHide={handleClose} size="xl">
               <Modal.Header closeButton>
                  <Modal.Title>Add new user</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <form className="row g-3" encType="multipart/form-data">
                     <div className="col-md-6">
                        <label className="form-label">Tên tài khoản</label>
                        <input
                           type="text"
                           className="form-control"
                           //    value={username || ""}
                           //    onChange={(event) => setUsername(event.target.value)}
                        />
                     </div>
                     <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                           type="password"
                           className="form-control"
                           //    value={password || ""}
                           //    onChange={(event) => setPassword(event.target.value)}
                        />
                     </div>
                     <div className="col-md-12">
                        {imgPreview && (
                           <div className=" d-flex flex-column justify-content-center align-items-center ">
                              <div className="">Ảnh xem trước</div>
                              <img
                                 width="300px"
                                 height="200px"
                                 src={imgPreview}
                                 alt="Đang tải ..."
                              />
                           </div>
                        )}
                     </div>
                  </form>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                     Đóng
                  </Button>
                  <Button variant="primary" onClick={() => sendAPI()}>
                     Xác nhận
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      </div>
   );
};

export default ModalCheckIn;
