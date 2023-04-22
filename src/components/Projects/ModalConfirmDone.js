import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalConfirmDone = (pros) => {
   const { show, setShow, dataDelete, PAGE_LIMIT, confirm } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async () => {
      await confirm();
   };
   if (show === true) console.log(dataDelete);
   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Xác nhận hoàn thành dự án</Modal.Title>
            </Modal.Header>
            <Modal.Body>Xác nhận hoàn thành dự án này ?</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button
                  variant="primary"
                  onClick={() => {
                     handleComfirm();
                  }}
               >
                  Xác nhận
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalConfirmDone;
