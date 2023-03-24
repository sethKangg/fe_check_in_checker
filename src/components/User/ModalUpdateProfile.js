import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { toast } from "react-toastify";
import { putProfile } from "../../services/apiService";
import axios from "axios";
import { useSelector } from "react-redux";
const ModalUpdateProfile = (pros) => {
   const { show, setShow, dataUpdate } = pros;
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
      console.log("dataupdate", dataUpdate);
      if (!_.isEmpty(dataUpdate)) {
         setSurname(dataUpdate.surname);
         setFirstName(dataUpdate.firstName);
         setDOB(dataUpdate.dateOfBirth);
         setPhone(dataUpdate.phone);
      }
   }, [dataUpdate]);

   const updateProfile = async () => {
      // let res = await putProfile(dataUpdate.id, surname, firstName, dob, phone);
      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // // myHeaders.append("Access-Control-Allow-Origin", "*");
      // // myHeaders.append("Authorization", `Bearer ${account.accessToken}`);
      // var raw = JSON.stringify({
      //    firstName: firstName,
      //    surname: surname,
      //    dateOfBirth: dob,
      //    phone: phone,
      // });
      // var requestOptions = {
      //    method: "PUT",
      //    headers: myHeaders,
      //    body: raw,
      //    redirect: "follow",
      // };
      // let res = await fetch(
      //    "https://cts-backend.azurewebsites.net/accounts/updateAccount/" + dataUpdate.id,
      //    requestOptions,
      // )
      //    .then((response) => response.text())
      //    .then((result) => {
      //       toast.success("Cập nhật hồ sơ thành công");
      //       handleClose();
      //    })
      //    .catch((error) => {
      //       toast.error("Có lỗi xảy ra ");
      //    });
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${account.accessToken}`);
      myHeaders.append("access-control-request-headers", "*");
      myHeaders.append("access-control-request-method", "GET, POST, PUT, PATCH, OPTIONS, DELETE");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
         "Cookie",
         "ARRAffinity=92ca53ad8db4fbb93d4d3b7d8ab54dcf8ffecb2d731f25b0e91ad575d7534c3f; ARRAffinitySameSite=92ca53ad8db4fbb93d4d3b7d8ab54dcf8ffecb2d731f25b0e91ad575d7534c3f",
      );

      var raw = JSON.stringify({
         firstName: "hung ehe",
         surname: "le manh",
         dateOfBirth: "2001-05-02",
         phone: "0912312312",
      });

      var requestOptions = {
         method: "PUT",
         headers: myHeaders,
         body: raw,
         redirect: "follow",
      };
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = "https://cts-backend.azurewebsites.net/accounts/updateAccount/1";
      fetch(`${apiUrl}`, requestOptions)
         .then((response) => response.text())
         .then((result) => console.log(result))
         .catch((error) => console.log("error", error));
   };

   const handleSubmit = () => {
      //validate

      //api
      updateProfile();
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
                  Cập nhật Profile - <b>{dataUpdate.username}</b>
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
                  Close
               </Button>
               <Button variant="primary" onClick={() => handleSubmit()}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalUpdateProfile;
