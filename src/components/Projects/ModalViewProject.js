import _, { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import { getAllMemberInProject, postAddProject } from "../../services/apiService";
import TableMemberProject from "./TableMemberProject";

const ModalViewProject = (pros) => {
   const { show, setShow, fetchListProject, PAGE_LIMIT, dataView } = pros;

   const handleClose = () => {
      setShow(false);
   };
   //    const handleShow = () => pros.setShow(true);

   const newGroupName = useRef("");
   const assignGroupLeader = useRef(null);
   const [listMember, setListMember] = useState([]);
   const [pageCount, setPageCount] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchValue, setSearchValue] = useState("");

   const [isLoading, setIsLoading] = useState(false);

   const fetchListMemberProject = async (projectID) => {
      let res = await getAllMemberInProject(projectID);
      console.log("Member: ", res);
      if (res.status == 200) {
         setListMember(res.data.list);
      }
   };

   const test = async () => {
      setIsLoading(true);
      try {
         const response = await getAllMemberInProject(dataView.id);
         //   const data = await response.json();
         //console.log(data);
         if (response.status == 200) {
            setListMember(response.data.list);
         }
      } catch (error) {
         console.log("Error", error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         let res = await test();
         // let res = await fetchListMemberProject(dataView.id);
         // Process the response here
      };

      fetchData();
   }, [show]);

   const handleSubmit = async () => {
      //validate
      //   if (!values.newGroupName) {
      //      return toast.error("Tên nhóm không được để trống");
      //   }
      //api
      //   let res = await postAddProject(newGroupName, assignGroupLeader);
      //   if (res.status === 200) {
      //      handleClose();
      //      toast.success(`${res.data} `);
      //   } else {
      //      Object.values(res.data.error).map((item, index) => {
      //         toast.error(item);
      //      });
      //   }
      //   pros.setCurrentPage(1);
      //   return fetchListProject(1, "");
   };

   const handleSelectGroupLeader = (e) => {
      assignGroupLeader.current.value = e.value;
      console.log(assignGroupLeader.current.value);
   };

   const options = [
      { value: "ocean", label: "Ocean" },
      { value: "blue", label: "Blue" },
      { value: "purple", label: "Purple" },
      { value: "red", label: "Red" },
      { value: "orange", label: "Orange" },
      { value: "yellow", label: "Yellow" },
      { value: "green", label: "Green" },
      { value: "forest", label: "Forest" },
      { value: "slate", label: "Slate" },
      { value: "silver", label: "Silver" },
   ];
   console.log("dataView", dataView);
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
               <form className="row g-3" encType="multipart/form-data">
                  <div className=" col-md-12  ">
                     <label className="form-label">Thêm nhân viên mới</label>
                     <Select
                        ref={assignGroupLeader}
                        onChange={(event) => handleSelectGroupLeader(event)}
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={options[0]}
                        isClearable={true}
                        isSearchable={true}
                        isMulti
                        // name="color"
                        options={options}
                     />
                  </div>
               </form>
               {!isLoading ? (
                  <div className="table-user mt-3">
                     <TableMemberProject
                        PAGE_LIMIT={PAGE_LIMIT}
                        listMember={listMember}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        searchValue={searchValue}
                        setCurrentPage={setCurrentPage}
                     />
                  </div>
               ) : (
                  <div>LOADING ....</div>
               )}
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalViewProject;
