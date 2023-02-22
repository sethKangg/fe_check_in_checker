import React, { useEffect, useState } from 'react';
import ModalAddUser from './ModalAddUser';
import TableUser from './TableUser';
import { getAllUser } from '../../../services/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import { Value } from 'sass';
const ManageUser = (pros) => {
   const [showModal, setShowModal] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);
   const [listUser, setListUser] = useState([{ id: 1, name: 'abv' }]);
   const [dataUpdate, setDataUpdate] = useState({});

   const fetchListUser = async () => {
      //     let res = await getAllUser();
      //     console.log(res);
      //   if(res.data. == 0 ){
      //     setListUser = res.data
      //   }
   };
   useEffect(() => {
      //   fetchListUser();
   }, []);

   const handleClickUpdate = (value, item) => {
      setShowUpdate(value);
      setDataUpdate(item);
   };

   const handleShowHideModal = (value) => {
      setShowModal(value);
   };

   return (
      <div className='manage-container'>
         <div className='title'>Manage User</div>
         <div className='user-content'>
            <button className='border-0 btn btn-primary' onClick={() => setShowModal(true)}>
               Add
            </button>
            <div className='table-user mt-3'>
               <TableUser listUser={listUser} handleClickUpdate={handleClickUpdate} />
            </div>
         </div>
         <div>
            <ModalAddUser
               show={showModal}
               setShow={handleShowHideModal}
               fetchListUser={fetchListUser}
            />
            <ModalUpdateUser
               show={showUpdate}
               setShow={handleClickUpdate}
               fetchListUser={fetchListUser}
               dataUpdate={dataUpdate}
            />
         </div>
      </div>
   );
};

export default ManageUser;
