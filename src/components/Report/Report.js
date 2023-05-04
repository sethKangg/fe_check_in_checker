import React from "react";
import "./Report.css";
import { AiFillStop, AiOutlineCheckCircle } from "react-icons/ai";
import { useState } from "react";
import ModalAddReport from "./ModalAddReport";
import { fetchComplaint, putComplain } from "../../services/apiService";
import { useEffect } from "react";
import TablePageReport from "./TablePageReport";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ModalAD from "./ModalAD";
const Report = () => {
   const [show, setShow] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [dataShow, setDataShow] = useState([]);
   const [listComplaints, setListComplaints] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageCount, setPageCount] = useState(1);
   const [status, setStatus] = useState("");
   const LIMIT_PAGE = 5;
   const [isLoading, setIsLoading] = useState(false);
   const account = useSelector((state) => state.user.account);
   const staffId = account.roleName === "Human resource" ? "0" : account.id;
   const [action, setAction] = useState("");
   const fetchApi = async (page, statusC) => {
      setIsLoading(true);
      try {
         let res = await fetchComplaint(page, LIMIT_PAGE, statusC, staffId);
         console.log(res);
         if (res.status === 200) {
            setListComplaints(res.data.list);
            setPageCount(res.data.allPages);
         }
      } catch (error) {
      } finally {
         setIsLoading(false);
      }
   };
   const putApi = async (complainId, statusId) => {
      let res = await putComplain(complainId, statusId);
      // console.log(res);
      if (res.status === 200) {
         toast.success("Cập nhật yêu cầu thành công");
         setShowModal(false);
         setCurrentPage(1);
         await fetchApi(currentPage, status);
      }
   };
   const clickHR = (item, queue) => {
      setShowModal(true);
      setDataShow(item);
      setAction(queue);
   };
   useEffect(() => {
      fetchApi(currentPage, status);
   }, [currentPage, status]);
   const clickFilterButton = (filter) => {
      setCurrentPage(1);
      setStatus(filter);
   };

   const msgHR = "Tài khoản hiện tại có thể phê duyệt các yêu cầu ";
   const msgNonHR = "Tài khoản hiện tại không thể phê duyệt các yêu cầu. ";
   return (
      <div className="p-3">
         <div className="d-flex justify-content-center my-2">
            <h2
               style={{
                  color: "red",
               }}
            >
               {account.roleName === "Human resource" ? msgHR : msgNonHR}
            </h2>
         </div>
         <div className="d-flex justify-content-between ">
            <div className="d-flex gap-3 mb-3">
               <button
                  className={`btn ${status === "" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => clickFilterButton("")}
               >
                  Tất cả
               </button>
               <button
                  className={`btn ${status === "pending" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => clickFilterButton("pending")}
               >
                  Chờ duyệt
               </button>
               <button
                  className={`btn ${status === "accept" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => clickFilterButton("accept")}
               >
                  Được duyệt
               </button>
               <button
                  className={`btn ${status === "reject" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => clickFilterButton("reject")}
               >
                  Từ chối
               </button>
            </div>
            {account && account.roleName !== "Human resource" && (
               <div>
                  <button className="btn btn-primary" onClick={() => setShow(true)}>
                     Gửi yêu cầu mới
                  </button>
               </div>
            )}
         </div>
         <div>
            {!isLoading ? (
               <TablePageReport
                  listComplaints={listComplaints}
                  setCurrentPage={setCurrentPage}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  putApi={putApi}
                  clickHR={clickHR}
               />
            ) : (
               <>Đang tải dữ liệu ...</>
            )}
         </div>
         <ModalAddReport
            show={show}
            setShow={setShow}
            fetchApi={fetchApi}
            setCurrentPage={setCurrentPage}
         />
         <ModalAD
            show={showModal}
            setShow={setShowModal}
            data={dataShow}
            putApi={putApi}
            fetchApi={fetchApi}
            currentPage={currentPage}
            status={status}
            action={action}
         />
      </div>
   );
};

export default Report;
