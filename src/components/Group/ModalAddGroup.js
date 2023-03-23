import _, { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import { postCreateGroup, postCreateUser } from "../../services/apiService";
const ModalAddGroup = (pros) => {
   const { show, setShow, fetchListGroup, PAGE_LIMIT } = pros;

   const handleClose = () => {
      setShow(false);
   };
   //    const handleShow = () => pros.setShow(true);

   const newGroupName = useRef("");
   const assignGroupLeader = useRef(null);

   const fetchListGroupLeader = () => {
      // let res = await getCombineUser(page, size, searchValue, filterIndex);
      // console.log("Userdata: ", res);
      // if (res.status == 200) {
      // }
   };

   useEffect(() => {
      const fetchData = async () => {
         // let res = await fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
         // Process the response here
      };

      fetchData();
   }, []);

   const handleSubmit = async () => {
      //validate
      if (!values.newGroupName) {
         return toast.error("Tên nhóm không được để trống");
      }
      //api

      let res = await postCreateGroup(newGroupName, assignGroupLeader);

      if (res.status === 200) {
         handleClose();
         toast.success(`${res.data} `);
      } else {
         Object.values(res.data.error).map((item, index) => {
            toast.error(item);
         });
      }
      pros.setCurrentPage(1);
      return fetchListGroup(1, PAGE_LIMIT, "", "");
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

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Tạo nhóm mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3" encType="multipart/form-data">
                  <div className="col-md-6">
                     <label className="form-label">Tên nhóm</label>
                     <input type="text" className="form-control" ref={newGroupName} />
                  </div>
                  <div className=" col-md-4  ">
                     <label className="form-label">Họ</label>
                     {/* <Form.Select
                        // value={roleId}
                        ref={assignGroupLeader}
                        onChange={(event) => handleSelectGroupLeader(event)}
                     >
                        <option value="1">Admin</option>
                        <option value="2">HR</option>
                        <option value="5">Staff</option>
                     </Form.Select> */}

                     <Select
                        ref={assignGroupLeader}
                        onChange={(event) => handleSelectGroupLeader(event)}
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={options[0]}
                        isClearable={true}
                        isSearchable={true}
                        // name="color"
                        options={options}
                     />
                  </div>
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

export default ModalAddGroup;