import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { changePassword } from "../../services/apiService";

const ModalChangePass = (props) => {
   const { show, setShow, data } = props;
   const [currentPass, setCurrentPass] = useState("");
   const [newPass, setNewPass] = useState("");
   const [comfirmPass, setComfirmPass] = useState("");
   const [error, setError] = useState("");
   const handleClose = () => {
      setShow(false);
      // setEmail("");
      setCurrentPass("");
      setNewPass("");
      setComfirmPass("");
   };
   const changeAPI = async () => {
      let res = await changePassword(data.id, currentPass, newPass, comfirmPass);
      console.log(res);
      if (res.status === 200) {
         toast.success("Đổi mật khẩu thành công");
         handleClose();
      } else {
         Object.values(res.data.error).map((item, index) => {
            // msgToast += item + "\n";
            toast.error(item);
         });
      }
   };
   useEffect(() => {
      if (show === true) {
         //  console.log(data);
      }
   }, [show]);
   const handleSubmit = () => {
      //vali
      if (!currentPass) return toast.error("Mật khẩu cũ không được để trống");
      if (!newPass) return toast.error("Mật khẩu mới không được để trống");
      if (!comfirmPass) return toast.error("Xác nhận mật khẩu không được để trống");
      if (currentPass.length < 6) return toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      if (newPass.length < 6) return toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      if (comfirmPass.length < 6) return toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      //api
      changeAPI();
   };
   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Đặt lại mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3">
                  <div className="col-md-8">
                     <label className="form-label">Mật khẩu cũ</label>
                     <input
                        type="password"
                        className="form-control"
                        value={currentPass ? currentPass : ""}
                        onChange={(event) => setCurrentPass(event.target.value)}
                     />
                  </div>

                  <div className="col-md-6">
                     <label className="form-label">Mật khẩu mới</label>
                     <input
                        type="password"
                        className="form-control"
                        value={newPass ? newPass : ""}
                        onChange={(event) => setNewPass(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Xác nhận lại mật khẩu</label>
                     <input
                        type="password"
                        className="form-control"
                        value={comfirmPass ? comfirmPass : ""}
                        onChange={(event) => setComfirmPass(event.target.value)}
                     />
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => handleClose()}>
                  Đóng
               </Button>
               <Button variant="primary" onClick={() => handleSubmit()}>
                  Xác nhận
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalChangePass;
