import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putStatusAccount } from "../../../services/apiService";
const ModalDisableAccount = (pros) => {
   const { show, setShow, dataDelete, PAGE_LIMIT } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async (item) => {
      let res = await putStatusAccount(item.id);
      // if (res) {
      toast.success(`Change Status ${item.id} sucessfully`);
      handleClose();
      pros.setCurrentPage(1);
      pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "");
      // await pros.fetchListUser();
      // }
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Comfirm Disable User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Are you sure to disable this user ?
               <b>{dataDelete && dataDelete.username ? dataDelete.username : ``}</b>
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

export default ModalDisableAccount;
