import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { putLevelStaff } from "../../../services/apiService";

const ModalUpdateStaff = (pros) => {
   const { show, setShow, dataUpdate, listLevel, setDataUpdate, PAGE_LIMIT } = pros;
   const [role, SetRole] = useState("");
   const handleClose = () => {
      setShow(false);
      setCurrentLevel("");
   };
   //    const handleShow = () => pros.setShow(true);

   const [currentLevel, setCurrentLevel] = useState("");
   const roles = {
      Admin: 1,
      "Human resource": 2,
      "Project manager": 3,
      "Group leader": 4,
      Staff: 5,
   };

   function getRoleId(roleName) {
      const check = roles[roleName];
      return check !== undefined ? check : 0;
   }
   const updateStaffLevel = async () => {
      let res = await putLevelStaff("" + dataUpdate.id, "" + currentLevel, getRoleId(role));
      // console.log("update status: ", res);
      if (res.status === 200) {
         toast.success(`Cập nhật tài khoản ${dataUpdate.fullName} thành công`);
         handleClose();
         await pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "");
      } else {
         // toast.error("Có lỗi xảy ra trong tiến trình cập nhật thông tin nhaan viên");
         Object.values(res.data.error).map((item, index) => {
            // msgToast += item + "\n";
            toast.error(item);
         });
      }
   };
   useEffect(() => {
      // console.log('dataupdate', dataUpdate);
      if (show === true) {
         // console.log(dataUpdate);
         // console.log("dataUpdate >>>.", dataUpdate);
         setCurrentLevel("" + dataUpdate.promotionLevelId);
         SetRole(dataUpdate.roleName);
      }
   }, [show]);

   const handleSubmit = async () => {
      //validate
      await updateStaffLevel();
      // console.log("" + dataUpdate.id, "" + currentLevel, getRoleId(role));
      //   let res = await postCreateUser(email);
      // pros.fetchListUser();

      // toast.error("ehe");
   };

   const handleClickFilter = (event) => {
      setCurrentLevel(event.target.value);
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Cập nhật thông tin tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3">
                  {/* <div className="col-md-6">
                     <label className="form-label">Level</label>
                     <input
                        type="text"
                        className="form-control"
                        value={dataUpdate.promotionLevel ? dataUpdate.promotionLevel : ""}
                        onChange={(event) => setCurrentLevel(event.target.value)}
                     />
                  </div> */}
                  <div className="col-md-6">
                     <label className="form-label">Cấp bậc</label>
                     <Form.Select
                        aria-label="Default select example"
                        value={currentLevel ? currentLevel : "2"}
                        onChange={(event) => handleClickFilter(event)}
                     >
                        {listLevel.map((level, index) => {
                           return (
                              <option key={level.id} value={level.id}>
                                 {level.description}
                              </option>
                           );
                        })}
                     </Form.Select>
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Chức vụ</label>
                     <Form.Select value={role} onChange={(event) => SetRole(event.target.value)}>
                        <option value="Staff">Staff</option>
                        <option value="Project manager">Project manager</option>
                        <option value="Group leader">Group Leader</option>
                     </Form.Select>
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
               <Button variant="primary" onClick={() => handleSubmit()}>
                  Xác nhận
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};
export default ModalUpdateStaff;
