import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ModalUpdateAccount = (pros) => {
   const { show, setShow, dataUpdate } = pros;

   const handleClose = () => {
      setShow(false);
      setEmail("");
   };
   //    const handleShow = () => pros.setShow(true);

   const [email, setEmail] = useState("");
   const [id, setId] = useState("");
   const [isEnable, setIsEnable] = useState();
   const [staffName, setStaffName] = useState("");
   const [roleName, setRoleName] = useState("");

   const [username, setUsername] = useState("");
   useEffect(() => {
      // console.log('dataupdate', dataUpdate);
      if (!_.isEmpty(dataUpdate)) {
         setEmail(dataUpdate.email);
         setId(dataUpdate.id);
         setIsEnable(dataUpdate.isEnable);
         setStaffName(dataUpdate.staffName);
         setUsername(dataUpdate.username);
         setRoleName(dataUpdate.roleName);
      }
   }, [dataUpdate]);

   const handleSubmit = async () => {
      //validate

      //api

      //   let res = await postCreateUser(email);
      // pros.fetchListUser();

      await pros.fetchListUser(pros.currentPage, 1, "", "   ");
      handleClose();
      // toast.error("ehe");
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Update user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3">
                  <div className="col-md-6">
                     <label className="form-label">ID</label>
                     <input
                        type="text"
                        className="form-control"
                        value={id ? id : ""}
                        onChange={(event) => setId(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Email</label>
                     <input
                        type="email"
                        className="form-control"
                        value={email ? email : ""}
                        onChange={(event) => setEmail(event.target.value)}
                     />
                  </div>

                  <div className="col-md-6">
                     <label className="form-label">Username</label>
                     <input
                        type="text"
                        className="form-control"
                        value={username ? username : ""}
                        onChange={(event) => setUsername(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Staff Name</label>
                     <input
                        type="text"
                        className="form-control"
                        value={staffName ? staffName : ""}
                        onChange={(event) => setStaffName(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Role</label>
                     <input
                        type="text"
                        className="form-control"
                        value={roleName ? roleName : ""}
                        onChange={(event) => setRoleName(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">isEnable</label>
                     <input
                        type="text"
                        className="form-control"
                        value={isEnable ? isEnable : ""}
                        onChange={(event) => setIsEnable(event.target.value)}
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

export default ModalUpdateAccount;
