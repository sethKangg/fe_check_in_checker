import React, { useEffect, useState } from "react";
import { getCombineUser, getUserPage } from "../../../services/apiService";
import TableAccountPaginate from "./TableAccountPaginate";
import { Button, Form, InputGroup } from "react-bootstrap";
import ModalAddAccount from "./ModalAddAccount";
import ModalUpdateAccount from "./ModalUpdateAccount";
import ModalDisableAccount from "./ModalDisableAccount";
const ManageAccount = (pros) => {
   const PAGE_LIMIT = 1;

   const [showModal, setShowModal] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [pageCount, setPageCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [filterIndex, setFilterIndex] = useState(2);
   const [searchValue, setSearchValue] = useState("");

   const [listUser, setListUser] = useState([]);
   const [dataUpdate, setDataUpdate] = useState({});
   const [dataDelete, setDataDelete] = useState({});

   const debouncedSearchTerm = useDebounce(searchValue, 800);

   const fetchListUser = async (page, size, searchValue, filterIndex) => {
      let res = await getCombineUser(page, size, searchValue, filterIndex);
      console.log("Userdata: ", res);
      if (res.status == 200) {
         setListUser(res.data.list);
         setPageCount(res.data.allPages);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         let res = await fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
         // Process the response here
      };

      fetchData();
   }, [currentPage, debouncedSearchTerm, filterIndex]);

   const handleClickUpdate = (value, item) => {
      setShowUpdate(value);
      setDataUpdate(item);
      // console.log(item);
   };

   const handleShowHideModal = (value) => {
      setShowModal(value);
   };

   const handleDelete = (value) => {
      // console.log(value);
      setDataDelete(value);
      setShowModalDelete(true);
   };

   const handleSearch = (e) => {
      setSearchValue(e.target.value);
      setCurrentPage(1);
      // let res = await fetchListUser(1, PAGE_LIMIT, searchValue, filterIndex);
      // console.log(res);
   };
   const handleClickFilter = (event) => {
      setFilterIndex(event.target.value);
      setCurrentPage(1);
      // let res = await fetchListUser(1, PAGE_LIMIT, searchValue, event.target.value);
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
                     onChange={(e) => handleSearch(e)}
                  />
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
                     <option value="2">Tất cả</option>
                     <option value="1">Active</option>
                     <option value="0">Inactive</option>
                  </Form.Select>
               </div>
            </div>
            <div className="table-user mt-3">
               <TableAccountPaginate
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
            <ModalAddAccount
               PAGE_LIMIT={PAGE_LIMIT}
               show={showModal}
               setShow={handleShowHideModal}
               fetchListUser={fetchListUser}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
            <ModalUpdateAccount
               show={showUpdate}
               setShow={handleClickUpdate}
               fetchListUser={fetchListUser}
               dataUpdate={dataUpdate}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
            <ModalDisableAccount
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

function useDebounce(value, delay) {
   // State and setters for debounced value
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

export default ManageAccount;
