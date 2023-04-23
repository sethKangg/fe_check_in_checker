import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { setStaffPm } from "../../services/apiService";

const ModalSetStaffPM = (pros) => {
   const { show, setShow, data, fetchListMemberProject, projectId } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async () => {
      // console.log(data.id);
      let res = await setStaffPm(data.id);
      if (res.status === 200) {
         toast.success("Cập nhật thành công");
      } else {
         toast.error("Có lỗi trong quá trình cập nhật");
      }
      handleClose();
      await fetchListMemberProject(projectId, 1, 10);
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Cập nhận nhân viên </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Bạn có chắc muốn đưa nhân viên <b>{data.fullName + " "}</b> lên làm PM ?
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

export default ModalSetStaffPM;
