import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putStatusAccount } from "../../../services/apiService";

const ModalDeleteImgStaff = (pros) => {
   const { show, setShow, dataDelete, PAGE_LIMIT, clickDelete } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async () => {
      await clickDelete();
   };
   if (show === true) console.log(dataDelete);
   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Xóa toàn bộ ảnh chụp</Modal.Title>
            </Modal.Header>
            <Modal.Body>Xác nhận xóa toàn bộ ảnh chụp của nhân viên</Modal.Body>
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

export default ModalDeleteImgStaff;
