import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postCreateUser } from "../../../services/apiService";
const ModalAddAccount = (pros) => {
   const { show, setShow, fetchListUser, PAGE_LIMIT } = pros;

   const handleClose = () => {
      pros.setShow(false);
      setEmail("");
      setPassword("");
      setUsername("");
      setRoleId(1);
      setSurName("");
      setFirstName("");
      setPhone("");
      setdateOfBirth("");
   };
   //    const handleShow = () => pros.setShow(true);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [roleId, setRoleId] = useState(1);
   const [surName, setSurName] = useState("");
   const [firstName, setFirstName] = useState("");
   const [phone, setPhone] = useState("");
   const [dateOfBirth, setdateOfBirth] = useState("");

   const handleSubmit = async () => {
      //validate
      //api
      // console.log(username, password, roleId, email, firstName, surName, dateOfBirth, phone);
      let res = await postCreateUser(
         username,
         password,
         roleId,
         email,
         firstName,
         surName,
         dateOfBirth,
         phone,
      );
      // console.log("res +", res);

      if (res.status === 200) {
         handleClose();
         toast.success(`Tạo tài khoản mới thành công `);
      } else {
         // let response = res.data.error.map((number, index) => {
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
               <Modal.Title>Thêm tài khoản mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3" encType="multipart/form-data">
                  <div className="col-md-6">
                     <label className="form-label">Tên tài khoản</label>
                     <input
                        type="text"
                        className="form-control"
                        value={username || ""}
                        onChange={(event) => setUsername(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Password</label>
                     <input
                        type="password"
                        className="form-control"
                        value={password || ""}
                        onChange={(event) => setPassword(event.target.value)}
                     />
                  </div>
                  <div className="col-md-8 ">
                     <label className="form-label">Email</label>
                     <input
                        type="email"
                        className="form-control"
                        value={email || ""}
                        onChange={(event) => setEmail(event.target.value)}
                     />
                  </div>
                  <div className="col-md-4">
                     <label className="form-label">Chức vụ</label>
                     <Form.Select
                        value={roleId}
                        onChange={(event) => setRoleId(event.target.value)}
                     >
                        <option value="1">Admin</option>
                        <option value="2">HR</option>
                        <option value="5">Staff</option>
                     </Form.Select>
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Họ</label>
                     <input
                        type="text"
                        className="form-control"
                        value={surName || ""}
                        onChange={(event) => setSurName(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Tên</label>
                     <input
                        type="text"
                        className="form-control"
                        value={firstName || ""}
                        onChange={(event) => setFirstName(event.target.value)}
                     />
                  </div>

                  <div className="col-7">
                     <label className="form-label">Số điện thoại</label>
                     <input
                        type="text"
                        className="form-control"
                        placeholder="X.XXX.XXX.XXX"
                        value={phone || ""}
                        onChange={(event) => setPhone(event.target.value)}
                     />
                  </div>
                  <div className="col-5">
                     <label className="form-label">Ngày sinh</label>
                     <input
                        type="date"
                        className="form-control"
                        value={dateOfBirth || ""}
                        onChange={(e) => setdateOfBirth(e.target.value)}
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

export default ModalAddAccount;
