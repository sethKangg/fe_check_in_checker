import React, { useEffect, useState } from "react";
import ModalAddUser from "./ModalAddUser";
import { getAllUser, getCombineUser, getUserPage } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { Button, Form, InputGroup } from "react-bootstrap";
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

   const fetchListUser = async (page, size, searchValue, filterIndex) => {
      let res = await getCombineUser(page, size, searchValue, filterIndex);
      // console.log("Userdata: ", res);
      if (res.status == 200) {
         setListUser(res.data.list);
         setPageCount(res.data.allPages);
      }
   };

   useEffect(() => {
      fetchListUser(1, PAGE_LIMIT, searchValue, filterIndex);
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

   const handleClickSearch = async () => {
      setCurrentPage(1);
      let res = await fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
      console.log(res);
   };

   const handleClickFilter = (event) => {
      console.log("filter index current >>>", event.target.value);
      setFilterIndex(event.target.value);
      setCurrentPage(1);
      // this.forceUpdate();
      console.log("filter", currentPage, PAGE_LIMIT, searchValue, filterIndex);
      // fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
   };

   return (
      <div className="manage-container">
         <div className="title d-flex justify-content-center ">
            <h1>Manage User</h1>
         </div>
         <div className="user-content mt-3">
            <div>
               <InputGroup className="mb-3">
                  <Form.Control
                     placeholder="Tìm theo tên tài khoản"
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => handleClickSearch()}>
                     Tìm kiếm
                  </Button>
               </InputGroup>
            </div>
            <div className="d-flex align-items-center justify-content-between">
               <div>
                  <button className="border-0 btn btn-primary" onClick={() => setShowModal(true)}>
                     Thêm nhân viên mới
                  </button>
               </div>
               <div className="">
                  <Form.Select
                     aria-label="Default select example"
                     value={filterIndex}
                     onChange={(event) => handleClickFilter(event)}
                  >
                     <option value="1">Tất cả</option>
                     <option value="2">Active</option>
                     <option value="3">Inactive</option>
                  </Form.Select>
               </div>
            </div>
            <div className="table-user mt-3">
               {/* <TableUser
                  listUser={listUser}
                  handleClickUpdate={handleClickUpdate}
                  handleDelete={handleDelete}
               /> */}
               <TableUserPaginate
                  listUser={listUser}
                  handleClickUpdate={handleClickUpdate}
                  handleDelete={handleDelete}
                  fetchListUser={fetchListUser}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  searchValue={searchValue}
                  filterIndex={filterIndex}
                  setCurrentPage={setCurrentPage}
               />
            </div>
         </div>
         <div>
            <ModalAddUser
               show={showModal}
               setShow={handleShowHideModal}
               fetchListUser={fetchListUser}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
            <ModalUpdateUser
               show={showUpdate}
               setShow={handleClickUpdate}
               fetchListUser={fetchListUser}
               dataUpdate={dataUpdate}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser
               show={showModalDelete}
               setShow={setShowModalDelete}
               dataDelete={dataDelete}
               fetchListUser={fetchListUser}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
         </div>
      </div>
   );
};

export default ManageUser;
