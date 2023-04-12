import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getInfoTS, getViewCaptured, putTS } from "../../services/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalUpdateCalendar = (pros) => {
   const { show, setShow, day, month, year, idParams, data, fetchImg, fetchInfo } = pros;

   const account = useSelector((state) => state.user.account);
   const [value, setValue] = useState("");
   const inputRef = useRef(null);
   const [vSelect, setVSelect] = useState("0");
   const handleClose = () => {
      setShow(false);
   };
   const handleChange = (event) => {
      setValue(event.target.value);
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
   };
   useEffect(() => {
      if (show === true) {
         if (data.dateStatus && data.dateStatus !== undefined) {
            setVSelect(data.dateStatus);
         } else {
            setVSelect("0");
         }
         if (data.note && data.note !== undefined) {
            setValue(data.note);
         }
      }
   }, [show]);
   const putApi = async (date) => {
      let res = await putTS(idParams, date, vSelect, value);
      console.log(res);
      if (res.status === 200) {
         toast.success("Cập nhật thành công");
      } else {
         toast.error("Có lỗi trong quá trình cập nhật");
      }
   };
   const handleSubmit = async () => {
      if (vSelect === "0") return toast.error("Vui lòng chọn trạng thái");
      toast.success(vSelect, value);
      const trueMonth = month + 1 < 10 ? "0" + (month + 1) : month + 1;
      const trueDay = day + 1 < 10 ? "0" + (day + 1) : day + 1;
      const time = year + "-" + trueMonth + "-" + trueDay;
      await putApi(time);
      await fetchImg(time);
      await fetchInfo(time);
      handleClose();
   };

   return (
      <div>
         <Modal className="modal-view-check-in" show={show} onHide={handleClose} size="xl">
            <Modal.Header>
               <Modal.Title className="w-100 d-flex justify-content-between">
                  <div>
                     Check-In{" "}
                     <b>
                        {day + 1} / {month + 1} / {year}{" "}
                     </b>
                  </div>
                  {/* {dataDay && dataDay.note && <div>Ghi chú: {dataDay.note}</div>} */}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/* {!isLoading && !isLoading1 ? <div className="row g-3"></div> : <div>LOADING ....</div>} */}
               <div className="info">
                  {/* from this */}
                  <div className="col-md-4">
                     <label className="form-label" onClick={() => console.log(vSelect)}>
                        Tình trạng ngày
                     </label>
                     <Form.Select
                        value={vSelect}
                        onChange={(event) => setVSelect(event.target.value)}
                     >
                        <option value="0" disabled={true}>
                           Chưa có
                        </option>
                        <option value="OK">Đúng giờ</option>
                        <option value="LATE">Đi muộn</option>
                        <option value="ABSENT">Không đi</option>
                     </Form.Select>
                  </div>
                  {/* to this */}
                  <label className="form-label mt-3">Ghi chú</label>
                  <div className=" col-md-12  m-auto ">
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
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleSubmit}>
                  Gửi
               </Button>
               <Button variant="secondary" onClick={handleClose}>
                  Đóng
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
export default ModalUpdateCalendar;
