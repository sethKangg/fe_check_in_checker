import _, { values } from "lodash";
import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getListOptionComplaints, postComplain } from "../../services/apiService";

const ModalAddReport = (pros) => {
   const [value, setValue] = useState("");
   const inputRef = useRef(null);
   const [listOp, setListOp] = useState([]);
   const [compType, setCompType] = useState("1");
   const handleChange = (event) => {
      setValue(event.target.value);
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
   };
   const fetchListOption = async () => {
      let res = await getListOptionComplaints();
      console.log(res);
      if (res.status === 200) {
         setListOp(res.data.list);
      }
   };
   const { show, setShow, fetchApi, setCurrentPage } = pros;
   const handleClose = () => {
      setShow(false);
   };

   const [title, setTitle] = useState("");
   useEffect(() => {
      const fetchData = async () => {
         if (show === true) {
            fetchListOption();
         }
         // Process the response here
      };

      fetchData();
   }, [show]);
   const postApi = async () => {
      let res = await postComplain(value, compType);
      console.log(res);
      if (res.status === 200) {
         toast.success("Thêm yêu cầu mới thành công!");
         setCurrentPage(1);
         handleClose();
         fetchApi(1, "");
      } else {
         toast.error("Thêm yêu cầu gặp sự cố");
      }
   };
   const handleSubmit = async () => {
      //validate
      if (!value) return toast.error("Nội dung không được trống");
      postApi();
      // console.log(compType);
      //api
      //   let res = await postNewProject(newGroupName, assignPM, assignGroup);
      // console.log(newGroupName, assignPM, assignGroup);
      // let res = await postAddProject(newGroupName, assignPM);
      //   if (res.status === 200) {
      //      handleClose();
      //      toast.success(`Thêm dự án ${newGroupName} thành công `);
      //   }
      // pros.setCurrentPage(1);
      //   return fetchListProject(1, "");
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Tạo yêu cầu mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3" encType="multipart/form-data">
                  {/* <div className="col-md-8">
                     <label className="form-label">Tiêu đề </label>
                     <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                           setTitle(e.target.value);
                        }}
                     />
                  </div> */}
                  <div className="col-md-4">
                     <label className="form-label">Loại yêu cầu</label>
                     <Form.Select
                        // value={roleId}
                        onChange={(event) => setCompType(event.target.value + "")}
                     >
                        {listOp &&
                           listOp.map((e, i) => (
                              <option key={i} value={e.id}>
                                 {e.name}
                              </option>
                           ))}
                        {/* <option value="2">HR</option>
                        <option value="5">Staff</option> */}
                     </Form.Select>
                  </div>
                  <label className="form-label">Nội dung</label>
                  <div className=" col-md-12  m-auto ">
                     {/* <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                           setTitle(e.target.value);
                        }}
                     /> */}

                     <textarea
                        ref={inputRef}
                        value={value}
                        onChange={handleChange}
                        style={{
                           resize: "none",
                           width: "100%",
                           overflow: "hidden",
                           border: "3px solid #eceef1",
                           borderRadius: "6px",
                           padding: "0px 3px",
                        }}
                     />
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Gửi yêu cầu
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalAddReport;
