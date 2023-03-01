import React, { useEffect, useState } from "react";
import ModalAddUser from "./ModalAddUser";
import TableUser from "./TableUser";
import { getAllUser, getCombineUser, getUserPage } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import { ToastContainer } from "react-toastify";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
const ManageUser = (pros) => {
   const PAGE_LIMIT = 1;

   const [showModal, setShowModal] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [pageCount, setPageCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [filterIndex, setFilterIndex] = useState(1);
   const [searchValue, setSearchValue] = useState("");

   const [listUser, setListUser] = useState([]);
   const [dataUpdate, setDataUpdate] = useState({});
   const [dataDelete, setDataDelete] = useState({});

   const fetchListUser = async (page, searchValue, filterIndex) => {
      let res = await getCombineUser(page, 1, searchValue, filterIndex);
      if (res) {
         setListUser(res.list);
         setPageCount(res.allPages);
      }
   };

   const fetchListUserPage = async (page) => {
      let res = await getUserPage(page, 1);
      if (res) {
         setListUser(res.list);
         setPageCount(res.allPages);
      }
   };

   useEffect(() => {
      //   fetchListUser();
      fetchListUserPage(1, PAGE_LIMIT);
   }, []);

   useEffect(() => {
      //   fetchListUser();
      fetchListUserPage(1, PAGE_LIMIT);
   }, [filterIndex]);

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

   const handleClickSearch = () => {
      setCurrentPage(1);
      console.log("search ", 1, PAGE_LIMIT, searchValue, filterIndex);
      // fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
   };

   const handleClickFilter = async (event) => {
      console.log("filter index current >>>", event.target.value);
      await setFilterIndex(event.target.value);
      setCurrentPage(1);
      console.log("filter", currentPage, PAGE_LIMIT, searchValue, filterIndex);
      // fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
   };

   return (
      <div className='manage-container'>
         <div className='title d-flex justify-content-center '>
            <h1>Manage User</h1>
         </div>
         <div className='user-content mt-3'>
            <div>
               <InputGroup className='mb-3'>
                  <Form.Control
                     placeholder='Tìm theo tên tài khoản'
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Button variant='outline-secondary' onClick={() => handleClickSearch()}>
                     Tìm kiếm
                  </Button>
               </InputGroup>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
               <div>
                  <button className='border-0 btn btn-primary' onClick={() => setShowModal(true)}>
                     Thêm nhân viên mới
                  </button>
               </div>
               <div className=''>
                  <Form.Select
                     aria-label='Default select example'
                     value={filterIndex}
                     onChange={(event) => handleClickFilter(event)}
                  >
                     <option value='1'>Tất cả</option>
                     <option value='2'>Active</option>
                     <option value='3'>Inactive</option>
                  </Form.Select>
               </div>
            </div>
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
