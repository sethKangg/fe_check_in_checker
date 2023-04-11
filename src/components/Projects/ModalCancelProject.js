import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putStatusProject } from "../../services/apiService";
// import { putStatusAccount } from "../../../services/apiService";

const ModalCancelProject = (pros) => {
   const { show, setShow, dataDelete, PAGE_LIMIT, fetchListProject } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async (item) => {
      let res = await putStatusProject(item.id, 3);
      if (res.status == 200) {
         toast.success(`Change Status ${item.id} sucessfully`);
         fetchListProject(1, "");
         handleClose();
      }
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Huỷ bỏ dự án </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Bạn có chắc muốn huỷ bỏ dự án
               <b>
                  {" " + dataDelete && dataDelete.projectName
                     ? " " + dataDelete.projectName + " "
                     : ` `}
               </b>
               hay không ?
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Cancel
               </Button>
               <Button
                  variant="primary"
                  onClick={() => {
                     handleComfirm(dataDelete);
                  }}
               >
                  Comfirm
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalCancelProject;
