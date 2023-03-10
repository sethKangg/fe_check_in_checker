import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, DropdownButton, Form, InputGroup, Table } from "react-bootstrap";
import { getListLevel, getStaff } from "../../../services/apiService";
import "./HRManager.scss";
import ModalUpdateStaff from "./ModalUpdateStaff";
import TableStaffPaginate from "./TableStaffPaginate";
const ManageStaff = () => {
   const PAGE_LIMIT = 4;

   const [showModal, setShowModal] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [pageCount, setPageCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [filterIndex, setFilterIndex] = useState(2);
   const [searchValue, setSearchValue] = useState("");

   const [listStaff, setListStaff] = useState([]);
   const [listLevel, setListLevel] = useState([]);
   const [dataUpdate, setDataUpdate] = useState({});
   const [dataDelete, setDataDelete] = useState({});

   const debouncedSearchTerm = useDebounce(searchValue, 800);

   const fetchListUser = async (page, size, searchValue, filterIndex) => {
      let res = await getStaff(page, size, searchValue, filterIndex);
      // console.log("Userdata: ", res);
      if (res.status == 200) {
         setListStaff(res.data.list);
         setPageCount(res.data.allPages);
      }
   };
   const fetchListLevel = async () => {
      let res = await getListLevel();
      console.log("List Level: ", res);
      if (res.status == 200) {
         setListLevel(res.data);
         // setPageCount(res.data.allPages);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         let res = await fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
         // Process the response here
      };

      fetchData();
   }, [currentPage, debouncedSearchTerm, filterIndex]);

   useEffect(() => {
      const fetchLevel = async () => {
         let res = await fetchListLevel();
         // console.log(res);
         // console.log("Fetch level");
         // Process the response here
      };

      fetchLevel();
   }, []);
   const handleClickUpdate = (value, item) => {
      setShowUpdate(value);
      setDataUpdate(item);
      // console.log(item);
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
   };
   const handleClickFilter = async (event) => {
      setFilterIndex(event.target.value);
      setCurrentPage(1);
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
                     placeholder="T??m theo t??n t??i kho???n"
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                  />
               </InputGroup>
            </div>
            <div className="d-flex align-items-center justify-content-between">
               <div>
                  <button className="border-0 btn btn-primary" onClick={() => setShowModal(true)}>
                     Th??m nh??n vi??n m???i
                  </button>
               </div>
               <div className="">
                  <Form.Select
                     aria-label="Default select example"
                     value={filterIndex}
                     onChange={(event) => handleClickFilter(event)}
                  >
                     <option value="2">T???t c???</option>
                     <option value="1">Active</option>
                     <option value="0">Inactive</option>
                  </Form.Select>
               </div>
            </div>
            <div className="table-user mt-3">
               <TableStaffPaginate
                  PAGE_LIMIT={PAGE_LIMIT}
                  listStaff={listStaff}
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
            {/* <ModalAddAccount
               show={showModal}
               setShow={handleShowHideModal}
               fetchListUser={fetchListUser}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            /> */}
            <ModalUpdateStaff
               PAGE_LIMIT={PAGE_LIMIT}
               listLevel={listLevel}
               show={showUpdate}
               setShow={setShowUpdate}
               fetchListUser={fetchListUser}
               dataUpdate={dataUpdate}
               setDataUpdate={setDataUpdate}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
            {/* <ModalDisableAccount
               show={showModalDelete}
               setShow={setShowModalDelete}
               dataDelete={dataDelete}
               fetchListUser={fetchListUser}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            /> */}
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

export default ManageStaff;
