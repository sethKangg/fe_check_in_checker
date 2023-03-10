import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { putLevelStaff } from "../../../services/apiService";

const ModalUpdateStaff = (pros) => {
   const { show, setShow, dataUpdate, listLevel, setDataUpdate, PAGE_LIMIT } = pros;

   const handleClose = () => {
      setShow(false);
      setCurrentLevel("");
   };
   //    const handleShow = () => pros.setShow(true);

   const [currentLevel, setCurrentLevel] = useState("");

   const updateStaffLevel = async () => {
      let res = await putLevelStaff("" + dataUpdate.id, "" + currentLevel);
      console.log("update status: ", res);
      if ((res.status = 200)) {
         toast.success(`Update ${dataUpdate.fullName} successfully`);
      }
   };
   useEffect(() => {
      // console.log('dataupdate', dataUpdate);
      if (!_.isEmpty(dataUpdate)) {
         console.log("dataUpdate >>>.", dataUpdate);
         setCurrentLevel("" + dataUpdate.promotionLevel);
      }
   }, [show]);

   useEffect(() => {
      console.log("currentLevel: ", currentLevel);
   }, [currentLevel]);

   const handleSubmit = async () => {
      //validate
      await updateStaffLevel();
      //api

      //   let res = await postCreateUser(email);
      // pros.fetchListUser();

      pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "");
      handleClose();

      // toast.error("ehe");
   };

   const handleClickFilter = (event) => {
      setCurrentLevel(event.target.value);
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Update levle of user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3">
                  <div className="col-md-6">
                     <label className="form-label">Level</label>
                     <input
                        type="text"
                        className="form-control"
                        value={dataUpdate.promotionLevel ? dataUpdate.promotionLevel : ""}
                        onChange={(event) => setCurrentLevel(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Level</label>
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
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={() => handleSubmit()}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};
export default ModalUpdateStaff;
