import React, { useEffect, useState } from 'react';
import ModalAddUser from './ModalAddUser';
import TableUser from './TableUser';
import { getAllUser, getUserPage } from '../../../services/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import { ToastContainer } from 'react-toastify';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';
const ManageUser = (pros) => {
   const [showModal, setShowModal] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [pageCount, setPageCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);

   const [listUser, setListUser] = useState([{ id: 1, name: 'abv' }]);
   const [dataUpdate, setDataUpdate] = useState({});
   const [dataDelete, setDataDelete] = useState({});

   const fetchListUser = async () => {
      //     let res = await getAllUser();
      //     console.log(res);
      //   if(res.data. == 0 ){
      //     setListUser = res.data
      //   }
   };

   const fetchListUserPage = async (page) => {
      // let res = await getUserPage(page, 5);
      // if (res) {
      //    setListUser(res.data);
      //    setPageCount(res.data.pageCount);
      // }
   };

   useEffect(() => {
      //   fetchListUser();
      // fetchListUserPage(1, 6);
   }, []);

   const handleClickUpdate = (value, item) => {
      setShowUpdate(value);
      setDataUpdate(item);
   };

   const handleShowHideModal = (value) => {
      setShowModal(value);
   };

   const handleDelete = (value) => {
      setDataDelete(value);
      setShowModalDelete(true);
   };

   return (
      <div className='manage-container'>
         <div className='title'>Manage User</div>
         <div className='user-content'>
            <button className='border-0 btn btn-primary' onClick={() => setShowModal(true)}>
               Add
            </button>
            <div className='table-user mt-3'>
               {/* <TableUser
                  listUser={listUser}
                  handleClickUpdate={handleClickUpdate}
                  handleDelete={handleDelete}
               /> */}
               <TableUserPaginate
                  listUser={listUser}
                  handleClickUpdate={handleClickUpdate}
                  handleDelete={handleDelete}
                  fetchListUserPage={fetchListUserPage}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
               />
            </div>
         </div>
         <div>
            <ModalAddUser
               show={showModal}
               setShow={handleShowHideModal}
               fetchListUser={fetchListUser}
               fetchListUserPage={fetchListUserPage}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
            <ModalUpdateUser
               show={showUpdate}
               setShow={handleClickUpdate}
               fetchListUser={fetchListUser}
               dataUpdate={dataUpdate}
               fetchListUserPage={fetchListUserPage}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser
               show={showModalDelete}
               setShow={setShowModalDelete}
               dataDelete={dataDelete}
               fetchListUser={fetchListUser}
               fetchListUserPage={fetchListUserPage}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
         </div>
      </div>
   );
};

export default ManageUser;
