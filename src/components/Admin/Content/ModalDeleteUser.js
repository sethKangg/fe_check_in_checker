import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';
const ModalDeleteUser = (pros) => {
   const { show, setShow, dataDelete } = pros;

   const handleClose = () => setShow(false);

   const handleComfirm = async (item) => {
      // let res = await deleteUser(item.id);
      // if (res) {
      toast.success(`Deactive ${item.name} sucessfully`);
      handleClose();
      pros.setCurrentPage(1);
      pros.fetchListUserPage(pros.currentPage);
      // await pros.fetchListUser();
      // }
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} backdrop='static'>
            <Modal.Header closeButton>
               <Modal.Title>Comfirm Disable User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Are you sure to disable this user ?
               <b>{dataDelete && dataDelete.name ? dataDelete.name : ``}</b>
            </Modal.Body>
            <Modal.Footer>
               <Button variant='secondary' onClick={handleClose}>
                  Cancel
               </Button>
               <Button
                  variant='primary'
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

export default ModalDeleteUser;
