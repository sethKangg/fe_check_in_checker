import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postCreateUser, resetPassword } from "../../../services/apiService";

const ModalResetPass = (pros) => {
   const { show, setShow, fetchListUser, PAGE_LIMIT, data } = pros;

   const handleClose = () => {
      setShow(false);
      setPassword("");
   };
   //    const handleShow = () => pros.setShow(true);

   const [password, setPassword] = useState("");
   const handleSubmit = async () => {
      //validate
      if (!password) return toast.error("Mật khẩu không được để trống");
      if (password.length < 6) return toast.error("Mật khẩu phải có ít nhất 6 kí tự");
      //api
      // console.log(username, password, roleId, email, firstName, surName, dateOfBirth, phone);
      let res = await resetPassword(data.username, password);
      // console.log("res +", res);

      if (res.status === 200) {
         handleClose();
         toast.success(`Cập nhật mật khẩu thành công `);
      } else {
         //  let response = res.data.error.map((number, index) => {
         // });
         // var msgToast = "";
         Object.values(res.data.error).map((item, index) => {
            // msgToast += item + "\n";
            toast.error(item);
         });
         // console.log(msgToast);
      }
      pros.setCurrentPage(1);
      await pros.fetchListUser(1, PAGE_LIMIT, "", "");
   };
   return (
      <>
         {/* <Button variant='primary' onClick={handleShow}>
             Launch demo modal
          </Button> */}

         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Đặt lại mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3" encType="multipart/form-data">
                  <div className="col-md-6">
                     <label className="form-label">Mật khẩu mới</label>
                     <input
                        type="password"
                        className="form-control"
                        value={password || ""}
                        onChange={(event) => setPassword(event.target.value)}
                     />
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Xác nhận
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalResetPass;
