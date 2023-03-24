import _, { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import {
   getAllMemberInProject,
   fetchListAvaiableStaff,
   postAddStaffProject,
} from "../../services/apiService";
import ModalRemoveStaff from "./ModalRemoveStaff";
import TableMemberProject from "./TableMemberProject";

const ModalViewProject = (pros) => {
   const { show, setShow, fetchListProject, PAGE_LIMIT, dataView } = pros;

   const handleClose = () => {
      setShow(false);
   };
   //    const handleShow = () => pros.setShow(true);

   const newGroupName = useRef("");
   const [listSelected, setListSelected] = useState([]);
   const [listMember, setListMember] = useState([]);
   const [listStaff, setListStaff] = useState([]);
   const [pageCount, setPageCount] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchValue, setSearchValue] = useState("");
   const [dateRemove, setDataRemove] = useState([]);
   const LIMIT_MEMBER = 10;
   const [showRemove, setShowRemove] = useState(false);

   const [isLoading, setIsLoading] = useState(false);
   const [isLoading1, setIsLoading1] = useState(false);

   const handleRemove = (item) => {
      setDataRemove(item);
      setShowRemove(true);
      console.log(item);
   };

   const postStaffToProject = async (staffId, projectId) => {
      let res = await postAddStaffProject(staffId, projectId);
      if (res.status == 200) {
         toast.success("Thêm nhân viên thành công");
      }
   };
   const fetchListMemberProject = async (projectId, page, size) => {
      setIsLoading(true);
      try {
         const response = await getAllMemberInProject(projectId, page, size);
         //   const data = await response.json();
         //console.log(data);
         if (response.status == 200) {
            // console.log("LIST MEMBER: ", response);
            setListMember(response.data.list);
            setPageCount(response.data.allPages);
         }
      } catch (error) {
         // console.log("Error", error);
      } finally {
         setIsLoading(false);
      }
   };

   const fetchListStaff = async () => {
      setIsLoading1(true);
      try {
         const response = await fetchListAvaiableStaff(dataView.groupId);
         //   const data = await response.json();
         //console.log(data);
         if (response.status == 200) {
            console.log("LIST Staff: ", response);
            setListStaff(response.data.list);
            // listSelected.current.value = response?.data?.list[0]?.id;
         }
      } catch (error) {
         // console.log("Error", error);
      } finally {
         setIsLoading1(false);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         if (show === true) {
            let res = await fetchListMemberProject(dataView.id, currentPage, LIMIT_MEMBER);
            let res2 = await fetchListStaff();
         }
         // let res = await fetchListMemberProject(dataView.id);
         // Process the response here
      };

      fetchData();
   }, [show, currentPage]);

   const handleSubmit = async () => {
      console.log(listSelected);
      let res = await postStaffToProject(listSelected, dataView.id);
      // if (res.status === 200) {
      //    toast.success(`Thêm thành công ${listSelected.length} thành viên !`);
      // }
      // handleClose();
      await fetchListMemberProject(dataView.id, 1, LIMIT_MEMBER);
      await fetchListStaff();
      //   pros.setCurrentPage(1);
      //   return fetchListProject(1, "");
   };

   const handleSelectGroupLeader = (e) => {
      // listSelected.current.value = e.value;
      // console.log(listSelected.current.value);
   };

   console.log("dataView", dataView);
   const newArray = listStaff.map((item) => {
      return { value: item.id, label: `${item.fullName} #${item.id}` };
   });

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>
                  Dự án{" "}
                  <b>
                     {dataView.projectName} - {dataView.id}
                  </b>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {!isLoading && !isLoading1 ? (
                  <div className="row g-3">
                     <div className=" col-md-12  ">
                        <label className="form-label">Thêm nhân viên mới</label>
                        <Select
                           onChange={(event) => setListSelected(event)}
                           className="basic-single"
                           classNamePrefix="select"
                           // defaultValue={newArray[0]}
                           isClearable={true}
                           isSearchable={true}
                           isMulti={true}
                           // name="color"
                           options={newArray}
                        />
                     </div>
                     <div className="table-user mt-3">
                        <TableMemberProject
                           PAGE_LIMIT={LIMIT_MEMBER}
                           listMember={listMember}
                           pageCount={pageCount}
                           currentPage={currentPage}
                           searchValue={searchValue}
                           setCurrentPage={setCurrentPage}
                           handleRemove={handleRemove}
                           fetchListMember={fetchListMemberProject}
                           projectId={dataView.id}
                        />
                     </div>
                  </div>
               ) : (
                  <div>LOADING ....</div>
               )}
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Thêm thành viên
               </Button>
            </Modal.Footer>
            <ModalRemoveStaff
               PAGE_LIMIT={LIMIT_MEMBER}
               fetchListMemberProject={fetchListMemberProject}
               show={showRemove}
               setShow={setShowRemove}
               dataDelete={dateRemove}
               projectId={dataView.id}
               // setIsLoading={setIsLoading}
               // setListMember={setListMember}
            />
         </Modal>
      </>
   );
};

export default ModalViewProject;
