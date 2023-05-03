import _, { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import {
   getAllGroup,
   getListEditGroup,
   getListPMAvaiable,
   putProject,
} from "../../services/apiService";
import { useSelector } from "react-redux";

const ModalUpdateProject = (pros) => {
   const { show, setShow, fetchListProject, PAGE_LIMIT, dataUpdate } = pros;
   const [isLoading, setIsLoading] = useState(false);
   const [isLoading1, setIsLoading1] = useState(false);
   const handleClose = () => {
      setShow(false);
   };
   const [listStaff, setListStaff] = useState([]);
   const [listGroup, setListGroup] = useState([]);
   const [newGroupName, setNewGroupName] = useState("");
   const [assignPM, setassignPM] = useState(null);
   const [assignGroup, setAssignGroup] = useState(null);
   const account = useSelector((state) => state.user.account);

   const fetchListGroup = async () => {
      setIsLoading1(true);
      try {
         const response = await getAllGroup(1, 99, "", 0);
         if (response.status == 200) {
            // console.log("LIST MEMBER: ", response);
            setListGroup(response.data.list);
            // setAssignGroup(response?.data?.list[dataUpdate.groupId - 1]?.id);
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
            // console.log("data UPdate: ", dataUpdate);
            let res1 = await fetchListGroup();
            setNewGroupName(dataUpdate.projectName);
         }
      };

      fetchData();
   }, [show]);

   const handleSubmit = async () => {
      if (!newGroupName) return toast.error("Tên nhóm không được để trống");
      let res = await putProject(dataUpdate.id, newGroupName, dataUpdate.pmId, dataUpdate.groupId);
      // console.log(res);
      if (res.status === 200) {
         toast.success(`Sửa dự án ${newGroupName} thành công `);
         handleClose();
      } else {
         Object.values(res.data.error).map((item, index) => {
            toast.error(item);
         });
      }
      // pros.setCurrentPage(1);
      await fetchListProject(1, "");
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
   let newGroupArray = [
      { value: account.groupId, label: `${account.groupName} #${account.groupId}` },
   ];
   console.log(account.groupId, account.groupName);
   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Sửa dự án {dataUpdate.projectName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3" encType="multipart/form-data">
                  <div className="col-md-8">
                     <label className="form-label">Tên nhóm</label>
                     <input
                        type="text"
                        className="form-control"
                        value={newGroupName}
                        onChange={(e) => {
                           setNewGroupName(e.target.value);
                        }}
                     />
                  </div>
                  {!isLoading && !isLoading1 ? (
                     <>
                        <div className=" col-md-6  ">
                           <label className="form-label">Nhóm</label>
                           <Select
                              onChange={(event) => handleSelectGroup(event)}
                              className="basic-single"
                              classNamePrefix="select"
                              defaultValue={newGroupArray[0]}
                              options={newGroupArray}
                           />
                        </div>
                     </>
                  ) : (
                     <div className=" col-md-4  ">Đang tải dữ liệu ...</div>
                  )}
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Xác nhận
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalUpdateProject;
