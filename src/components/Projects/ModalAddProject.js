import _, { values } from "lodash";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import {
   fetchListAvaiableStaff,
   getAllGroup,
   getListPMAvaiable,
   postAddProject,
   postNewProject,
} from "../../services/apiService";

const ModalAddProject = (pros) => {
   const { show, setShow, fetchListProject, PAGE_LIMIT } = pros;
   const [isLoading, setIsLoading] = useState(false);
   const [isLoading1, setIsLoading1] = useState(false);
   const handleClose = () => {
      setShow(false);
   };
   //    const handleShow = () => pros.setShow(true);
   const [listStaff, setListStaff] = useState([]);
   const [listGroup, setListGroup] = useState([]);
   const [newGroupName, setNewGroupName] = useState("");
   const [assignPM, setassignPM] = useState(null);
   const [assignGroup, setAssignGroup] = useState(null);
   const fetchListProjectLeader = async () => {
      setIsLoading(true);
      try {
         const response = await getListPMAvaiable();
         //   const data = await response.json();
         //console.log(data);
         if (response.status == 200) {
            // console.log("LIST MEMBER: ", response);
            setListStaff(response.data.list);
            setassignPM(response?.data?.list[0]?.id);
         }
      } catch (error) {
         // console.log("Error", error);
      } finally {
         setIsLoading(false);
      }
   };
   const fetchListGroup = async () => {
      setIsLoading1(true);
      try {
         const response = await getAllGroup(1, 99, "");
         //   const data = await response.json();
         //console.log(data);
         if (response.status == 200) {
            // console.log("LIST MEMBER: ", response);
            setListGroup(response.data.list);
            setAssignGroup(response?.data?.list[0]?.id);
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
            let res = await fetchListProjectLeader();
            let res1 = await fetchListGroup();
         }
         // Process the response here
      };

      fetchData();
   }, [show]);

   const handleSubmit = async () => {
      //validate
      // if (!values.newGroupName) {
      //    return toast.error("Tên nhóm không được để trống");
      // }
      //api

      let res = await postNewProject(newGroupName, assignPM, assignGroup);
      // console.log(newGroupName, assignPM, assignGroup);
      // let res = await postAddProject(newGroupName, assignPM);

      if (res.status === 200) {
         handleClose();
         toast.success(`Thêm dự án ${newGroupName} thành công `);
      } else {
         Object.values(res.data.error).map((item, index) => {
            toast.error(item);
         });
      }
      // pros.setCurrentPage(1);
      return fetchListProject(1, "");
   };

   const handleSelectGroupLeader = (e) => {
      setassignPM(e.value);
      // console.log(assignPM.current.value);
   };
   const handleSelectGroup = (e) => {
      setAssignGroup(e.value);
      // console.log(assignPM.current.value);
   };

   const newArray = listStaff.map((item) => {
      return { value: item.id, label: `${item.fullName} #${item.id}` };
   });
   const newGroupArray = listGroup.map((item) => {
      return { value: item.id, label: `${item.groupName} #${item.id}` };
   });
   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Tạo nhóm mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3" encType="multipart/form-data">
                  <div className="col-md-8">
                     <label className="form-label">Tên nhóm</label>
                     <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                           setNewGroupName(e.target.value);
                        }}
                     />
                  </div>
                  {!isLoading && !isLoading1 ? (
                     <>
                        <div className=" col-md-6  ">
                           <label className="form-label">Người chủ trì dự án</label>
                           <Select
                              onChange={(event) => handleSelectGroupLeader(event)}
                              className="basic-single"
                              classNamePrefix="select"
                              defaultValue={newArray[0]}
                              isClearable={true}
                              isSearchable={true}
                              // name="color"
                              options={newArray}
                           />
                        </div>

                        <div className=" col-md-6  ">
                           <label className="form-label">Nhóm</label>
                           <Select
                              onChange={(event) => handleSelectGroup(event)}
                              className="basic-single"
                              classNamePrefix="select"
                              defaultValue={newGroupArray[0]}
                              isClearable={true}
                              isSearchable={true}
                              // name="color"
                              options={newGroupArray}
                           />
                        </div>
                     </>
                  ) : (
                     <div className=" col-md-4  ">Loading ...</div>
                  )}
               </form>
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
export default ModalAddProject;
