import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteMemberInGroup, deleteMemberInProject } from "../../services/apiService";

const ModalRemoveStaffGroup = (pros) => {
   const {
      show,
      setShow,
      dataDelete,
      PAGE_LIMIT,
      projectId,
      fetchListMemberProject,
      fetchListStaff,
   } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async (item) => {
      console.log(dataDelete.id, projectId);
      let res = await deleteMemberInGroup(dataDelete.id);
      console.log(res);
      if (res.status == 200) {
         toast.success(`Xoá thành viên ${dataDelete.fullName} #${dataDelete.id} thành công`);
      } else {
         Object.values(res.data.error).map((item, index) => {
            // msgToast += item + "\n";
            toast.error(item);
         });
      }
      // handleClose(projectId, 1, PAGE_LIMIT);
      // pros.setCurrentPage(1);
      // pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "");
      handleClose();
      await fetchListMemberProject(projectId, 1, 10);
      await fetchListStaff();
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

export default ModalRemoveStaffGroup;
