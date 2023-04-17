import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteMemberInProject } from "../../services/apiService";

const ModalRemoveStaff = (pros) => {
   const { show, setShow, dataDelete, PAGE_LIMIT, projectId, fetchListMemberProject } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async (item) => {
      console.log(dataDelete.staffId, projectId);
      let res = await deleteMemberInProject(dataDelete.staffId, projectId);
      // console.log(res);
      if (res.status == 200) {
         toast.success(`Xoá thành viên ${dataDelete.fullName} #${dataDelete.staffId} thành công`);
      }
      // handleClose(projectId, 1, PAGE_LIMIT);
      // pros.setCurrentPage(1);
      // pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "");
      handleClose();
      await fetchListMemberProject(projectId, 1, 10);
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
               <Modal.Title>Xoá thành viên </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Bạn có chắc muốn xóa thành viên
               <b>
                  {" " + dataDelete && dataDelete.fullName ? " " + dataDelete.fullName + " " : ` `}
               </b>
               hay không ?
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

export default ModalRemoveStaff;
