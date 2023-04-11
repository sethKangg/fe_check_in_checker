import _, { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { components } from "react-select";
import { toast } from "react-toastify";
import { getListGL, postCreateGroup } from "../../services/apiService";
const ModalAddGroup = (pros) => {
   const { show, setShow, fetchListGroup, PAGE_LIMIT } = pros;
   const [listGL, setListGL] = useState([]);
   const handleClose = () => {
      setShow(false);
   };
   //    const handleShow = () => pros.setShow(true);

   const newGroupName = useRef("");
   const assignGroupLeader = useRef(null);

   const fetchListGroupLeader = async () => {
      let res = await getListGL();
      console.log("listGL: ", res);
      if (res.status == 200) {
         setListGL(res.data.list);
      }
   };
   const NoOptionsMessage = (props) => {
      return (
         <components.NoOptionsMessage {...props}>
            Không có trưởng nhóm khả dụng
         </components.NoOptionsMessage>
      );
   };
   useEffect(() => {
      const fetchData = async () => {
         // let res = await fetchListUser(currentPage, PAGE_LIMIT, searchValue, filterIndex);
         // Process the response here
         fetchListGroupLeader();
      };
      if (show === true) {
         fetchData();
      }
   }, [show]);

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

   const newArray = listGL.map((item) => {
      return { value: item.id, label: `${item.fullName} #${item.id}` };
   });
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

                     {listGL && (
                        <Select
                           ref={assignGroupLeader}
                           onChange={(event) => handleSelectGroupLeader(event)}
                           className="basic-single"
                           classNamePrefix="Chojn"
                           defaultValue={newArray[0]}
                           options={newArray}
                           isSearchable={true}
                           placeholder={<div>Chọn trưởng nhóm</div>}
                           components={{ NoOptionsMessage }}
                        />
                     )}
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
