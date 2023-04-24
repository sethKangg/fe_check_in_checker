import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateGroup } from "../../services/apiService";

const ModalUpdateGroup = (props) => {
   const { show, setShow, data, fetchListGroup } = props;
   const [currentPass, setCurrentPass] = useState("");

   const [error, setError] = useState("");
   const handleClose = () => {
      setShow(false);
      setCurrentPass("");
   };
   const changeAPI = async () => {
      let res = await updateGroup(data.id, currentPass);
      if (res.status === 200) {
         toast.success("Cập nhật nhóm thành công");
         handleClose();
      } else {
         Object.values(res.data.error).map((item, index) => {
            // msgToast += item + "\n";
            toast.error(item);
         });
      }
   };
   useEffect(() => {
      if (show === true) {
         //  console.log(data);
         setCurrentPass(data.groupName);
      }
   }, [show]);
   const handleSubmit = () => {
      //vali
      if (!currentPass) return toast.error("Tên nhóm không được để trốngz");

      //api
      changeAPI();
   };
   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Cập nhập thông tin nhóm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3">
                  <div className="col-md-8">
                     <label className="form-label">Tên nhóm</label>
                     <input
                        type="text"
                        className="form-control"
                        value={currentPass ? currentPass : ""}
                        onChange={(event) => setCurrentPass(event.target.value)}
                     />
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => handleClose()}>
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

export default ModalUpdateGroup;
