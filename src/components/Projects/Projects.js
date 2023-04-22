import React, { useEffect, useState } from "react";
import { InputGroup, Form, ListGroup } from "react-bootstrap";
import { getAllProjects } from "../../services/apiService";
import "./Project.css";
import TableProjectPaginate from "./TableProjectPaginate";
import ModalAddProject from "./ModalAddProject";
import ModalViewProject from "./ModalViewProject";
import ModalUpdateProject from "./ModalUpdateProject";
import ModalCancelProject from "./ModalCancelProject";
import { useSelector } from "react-redux";

const Projects = () => {
   const [showOptionsIndex, setShowOptionsIndex] = useState(-1);
   const PAGE_LIMIT = 12;

   const [showModal, setShowModal] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalView, setShowModalView] = useState(false);
   const [pageCount, setPageCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [filterIndex, setFilterIndex] = useState(2);
   const [searchValue, setSearchValue] = useState("");

   const [listProject, setListProject] = useState([]);

   const [dataUpdate, setDataUpdate] = useState({});
   const [dataDelete, setDataDelete] = useState({});
   const [dataView, setDataView] = useState({});

   const debouncedSearchTerm = useDebounce(searchValue, 800);
   const account = useSelector((state) => state.user.account);
   const [loading, isLoading] = useState(false);
   const staffId = account.roleName === "Group leader" ? "0" : account.id;
   const groupId = account.roleName === "Group leader" ? account.groupId : "0";

   const fetchListProject = async (page, searchValue) => {
      try {
         isLoading(true);
         let res = await getAllProjects(page, PAGE_LIMIT, searchValue, staffId,groupId);
         // console.log("PROJECT DATA: ", res);
         if (res.status == 200) {
            setListProject(res.data.list);
            setPageCount(res.data.allPages);
         }
      } catch (error) {
      } finally {
         isLoading(false);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         let res = await fetchListProject(currentPage, searchValue);
         // Process the response here
      };

      fetchData();
   }, [currentPage, debouncedSearchTerm]);

   function handleUpdate(index) {
      // TODO: Implement update logic
      setShowOptionsIndex(-1);
   }
   const handleClickUpdate = (value, item) => {
      setShowUpdate(value);
      setDataUpdate(item);
      console.log(item);
   };

   const handleShowHideModal = (value) => {
      setShowModal(value);
   };

   const handleDelete = (value) => {
      // console.log(value);
      setDataDelete(value);
      setShowModalDelete(true);
   };

   const handleClickView = (value, item) => {
      setShowModalView(value);
      setDataView(item);
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

   const handleModalView = (value) => {
      setShowModalView(value);
   };

   return (
      <div className="pt-3">
         <div className="title d-flex justify-content-center ">
            <h1>Quản lý dự án</h1>
         </div>
         <div className="user-content mt-3">
            <div>
               <InputGroup className="mb-3">
                  <Form.Control
                     placeholder="Tìm theo tên dự án"
                     value={searchValue}
                     onChange={(e) => handleSearch(e)}
                  />
               </InputGroup>
            </div>
            <div className="d-flex align-items-center justify-content-between">
               <div>
                  <button className="border-0 btn btn-primary" onClick={() => setShowModal(true)}>
                     Thêm dự án mới
                  </button>
               </div>
               {/* <div className="">
                  <Form.Select
                     aria-label="Default select example"
                     value={filterIndex}
                     onChange={(event) => handleClickFilter(event)}
                  >
                     <option value="2">Tất cả</option>
                     <option value="1">Active</option>
                     <option value="0">Inactive</option>
                  </Form.Select>
               </div> */}
            </div>
            <div className="mt-3">
               {loading === true ? (
                  "Đang tải dữ liệu"
               ) : (
                  <TableProjectPaginate
                     PAGE_LIMIT={PAGE_LIMIT}
                     listProject={listProject}
                     handleClickUpdate={handleClickUpdate}
                     handleDelete={handleDelete}
                     fetchListProject={fetchListProject}
                     showOptionsIndex={showOptionsIndex}
                     setShowOptionsIndex={setShowOptionsIndex}
                     pageCount={pageCount}
                     currentPage={currentPage}
                     searchValue={searchValue}
                     setCurrentPage={setCurrentPage}
                     handleClickView={handleClickView}
                  />
               )}
            </div>
         </div>
         <ModalAddProject
            PAGE_LIMIT={PAGE_LIMIT}
            show={showModal}
            setShow={handleShowHideModal}
            fetchListProject={fetchListProject}
         />
         <ModalUpdateProject
            PAGE_LIMIT={PAGE_LIMIT}
            show={showUpdate}
            setShow={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListProject={fetchListProject}
         />
         <ModalCancelProject
            show={showModalDelete}
            setShow={setShowModalDelete}
            dataDelete={dataDelete}
            PAGE_LIMIT={PAGE_LIMIT}
            fetchListProject={fetchListProject}
         />
         <ModalViewProject
            show={showModalView}
            setShow={setShowModalView}
            dataView={dataView}
            fetchListProject={fetchListProject}
         />
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
export default Projects;
