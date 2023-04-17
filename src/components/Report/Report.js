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
const Report = () => {
   const [show, setShow] = useState(false);
   const [listComplaints, setListComplaints] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageCount, setPageCount] = useState(1);
   const [status, setStatus] = useState("");
   const LIMIT_PAGE = 5;
   const [isLoading, setIsLoading] = useState(false);
   const account = useSelector((state) => state.user.account);
   const staffId = account.roleName === "Human resource" ? "0" : account.id;

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
      console.log(res);
      if (res.status === 200) {
         toast.success("Cập nhật yêu cầu thành công");
         setCurrentPage(1);
      }
   };
   useEffect(() => {
      fetchApi(currentPage, status);
   }, [currentPage, status]);
   const clickFilterButton = (filter) => {
      setCurrentPage(1);
      setStatus(filter);
   };
   const msgHR = "Đang đăng nhập bằng tài khoản HR. Bạn có thể phê duyệt các yêu cầu ";
   const msgNonHR = "Bạn không thể phê duyệt các yêu cầu. ";
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
            {/* <div class="card-2 mt-3">
               <div class="card-2-top-part">
                  <div class="left-part">
                     <div class="user-name d-flex justify-content-between">
                        <div className="d-flex  align-items-center">
                           <p class="name">Yêu cầu ?</p>
                        </div>
                        <div>
                           <p className="name">Thời gian: </p>
                        </div>
                     </div>
                     <div class="user-position d-flex justify-content-between">
                        <div className="d-flex">
                           <p class="position">Người gửi: </p>
                           <p class="role mx-2"> Admin </p>
                        </div>
                        <div className="d-flex">
                           <p class="position">Người duyệt: </p>
                           <p class="role mx-2"> Admin </p>
                        </div>
                     </div>
                     <div className="content">Nội dung</div>
                  </div>
               </div>
               <div class="card-2-bottom-part ">
                  <div class="bottom-part click-yeah py-3">
                     <div class="link">
                        <span class="icon">
                           <AiOutlineCheckCircle size={30} color="green" />
                        </span>
                        Phê duyệt
                     </div>
                  </div>
                  <div class="bottom-part click-yeet py-3">
                     <div class="link">
                        <span class="icon">
                           <AiFillStop size={30} color="red" />
                        </span>
                        Từ chối
                     </div>
                  </div>
               </div>
            </div> */}
            {!isLoading ? (
               <TablePageReport
                  listComplaints={listComplaints}
                  setCurrentPage={setCurrentPage}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  putApi={putApi}
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
      </div>
   );
};

export default Report;
