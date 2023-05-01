import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { getListEditGroup, updateGroup } from "../../services/apiService";
import Select from "react-select";
const ModalUpdateGroup = (props) => {
   const { show, setShow, data, fetchListGroup } = props;
   const [currentPass, setCurrentPass] = useState("");
   const [listStaff, setListStaff] = useState([]);
   const [error, setError] = useState("");
   const [assignPM, setassignPM] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const handleClose = () => {
      setShow(false);
      setCurrentPass("");
   };
   const changeAPI = async () => {
      let res = await updateGroup(data.id, currentPass, assignPM);
      if (res.status === 200) {
         toast.success("Cập nhật nhóm thành công");
         handleClose();
         await fetchListGroup(1, 99, "");
      } else {
         Object.values(res.data.error).map((item, index) => {
            // msgToast += item + "\n";
            toast.error(item);
         });
      }
   };
   const fetchListGL = async () => {
      try {
         setIsLoading(true);
         let res = await getListEditGroup(data.id);
         if (res.status === 200) {
            setListStaff(res.data.list);
            setassignPM(res.data.list[0].id);
         }
      } catch {
      } finally {
         setIsLoading(false);
      }
   };

   const handleSelectGroupLeader = (e) => {
      setassignPM(e.value);
      // console.log(assignPM.current.value);
   };
   useEffect(() => {
      if (show === true) {
         //  console.log(data);
         setCurrentPass(data.groupName);
         fetchListGL();
      }
   }, [show]);
   const handleSubmit = () => {
      //vali
      if (!currentPass) return toast.error("Tên nhóm không được để trốngz");

      //api
      changeAPI();
   };
   const newArray = listStaff.map((item) => {
      return { value: item.id, label: `${item.fullName} #${item.id}` };
   });
   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Cập nhập thông tin nhóm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3">
                  <div className="col-md-8">
                     <label className="form-label" onClick={() => console.log(assignPM)}>
                        Tên nhóm
                     </label>
                     <input
                        type="text"
                        className="form-control"
                        value={currentPass ? currentPass : ""}
                        onChange={(event) => setCurrentPass(event.target.value)}
                     />
                  </div>
                  {isLoading ? (
                     <div>Đang tải ...</div>
                  ) : (
                     <div className=" col-md-6  ">
                        <label className="form-label">Trưởng nhóm</label>
                        <Select
                           onChange={(event) => handleSelectGroupLeader(event)}
                           className="basic-single"
                           classNamePrefix="select"
                           defaultValue={newArray[0]}
                           options={newArray}
                        />
                     </div>
                  )}
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
