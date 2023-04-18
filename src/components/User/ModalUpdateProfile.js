import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { toast } from "react-toastify";
import { putProfile } from "../../services/apiService";
import axios from "axios";
import { useSelector } from "react-redux";
const ModalUpdateProfile = (pros) => {
   const { show, setShow, dataUpdate, fetchProfileInfor } = pros;
   const account = useSelector((state) => state.user.account);
   const handleClose = () => {
      setShow(false);
      // setEmail("");
   };
   //    const handleShow = () => pros.setShow(true);
   // const [id, setId] = useState("");
   const [surname, setSurname] = useState("");
   const [firstName, setFirstName] = useState("");
   const [dob, setDOB] = useState("");
   const [phone, setPhone] = useState("");
   useEffect(() => {
      if (show !== true) return;
      console.log("dataupdate", dataUpdate);
      if (!_.isEmpty(dataUpdate)) {
         setSurname(dataUpdate.surname);
         setFirstName(dataUpdate.firstName);
         setDOB(dataUpdate.dateOfBirth);
         setPhone(dataUpdate.phone);
      }
   }, [dataUpdate]);

   const updateProfile = async () => {
      let res = await putProfile(dataUpdate.id, surname, firstName, dob, phone);
      if (res.status === 200) {
         toast.success("Cập nhật thông tin tài khoản thành công");
      } else {
         toast.error("Có lỗi xảy ra");
      }
   };

   const handleSubmit = async () => {
      //validate

      //api
      await updateProfile();
      await fetchProfileInfor();
      handleClose();
      // let res = await postCreateUser(email);
      // pros.fetchListUser();

      // pros.fetchListUser(pros.currentPage, 1, "", "   ");
      // handleClose();
      // toast.error("ehe");
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>
                  Cập nhật thông tin hồ sơ - <b>{dataUpdate.username}</b>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3">
                  <div className="col-md-6">
                     <label className="form-label">Họ</label>
                     <input
                        type="text"
                        className="form-control"
                        value={surname ? surname : ""}
                        onChange={(event) => setSurname(event.target.value)}
                     />
                  </div>

                  <div className="col-md-6">
                     <label className="form-label">Tên</label>
                     <input
                        type="text"
                        className="form-control"
                        value={firstName ? firstName : ""}
                        onChange={(event) => setFirstName(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Ngày sinh</label>
                     <input
                        type="date"
                        className="form-control"
                        value={dob ? dob : ""}
                        onChange={(event) => setDOB(event.target.value)}
                     />
                  </div>

                  <div className="col-md-6">
                     <label className="form-label">Số điện thoại</label>
                     <input
                        type="text"
                        className="form-control"
                        value={phone ? phone : ""}
                        onChange={(event) => setPhone(event.target.value)}
                     />
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
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

export default ModalUpdateProfile;
