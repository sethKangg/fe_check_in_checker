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
      if (res.status === 200) {
         toast.success(`Cập nhật tài khoản ${dataDelete.username} thành công `);
      } else if (res.status === 409) {
         toast.error("Không thể tự khóa tài khoản bản thân");
      } else {
         toast.error("Có lỗi trong quá trình cập nhật");
      }

      handleClose();
      pros.setCurrentPage(1);
      await pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "");
      // await pros.fetchListUser();
      // }
   };
   if (show === true) console.log(dataDelete);
   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Xác nhận khóa/mở lại tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {dataDelete.enable ? "Xác nhận khóa tài khoản " : "Xác nhận mở lại tài khoản "}
               <b>{dataDelete && dataDelete.username ? dataDelete.username : ` `} </b> ?
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button
                  variant="primary"
                  onClick={() => {
                     handleComfirm(dataDelete);
                  }}
               >
                  Xác nhận
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalDisableAccount;
