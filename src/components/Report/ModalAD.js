import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalAD = (pros) => {
   const { show, setShow, data, action, putApi } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async () => {
      //   let res = await putStatusAccount(item.id);
      //   // if (res) {
      //   if (res.status === 200) {
      //      toast.success(`Cập nhật tài khoản ${dataDelete.username} thành công `);
      //   } else if (res.status === 409) {
      //      toast.error("Không thể tự khóa tài khoản bản thân");
      //   } else {
      //      Object.values(res.data.error).map((item, index) => {
      //         // msgToast += item + "\n";
      //         toast.error(item);
      //      });
      //   }
      //   handleClose();
      //   pros.setCurrentPage(1);
      //   await pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "");
      //   // await pros.fetchListUser();
      //   // }
      if (!data.id || !action) return toast.error("Lỗi");
      let res = await putApi(data.id, action);
   };
   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Bạn có chắc muốn <b>{action == 1 ? "phê duyệt" : "từ chối"}</b> yêu cầu số{" "}
               <b>{data.id} </b> ?
            </Modal.Body>
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
export default ModalAD;
