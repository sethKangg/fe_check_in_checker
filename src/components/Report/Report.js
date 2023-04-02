import React from "react";
import "./Report.css";
import { AiFillStop, AiOutlineCheckCircle } from "react-icons/ai";
import { useState } from "react";
import ModalAddReport from "./ModalAddReport";
import { fetchComplaint, putComplain } from "../../services/apiService";
import { useEffect } from "react";
import TablePageReport from "./TablePageReport";
import { toast } from "react-toastify";
const Report = () => {
   const [show, setShow] = useState(false);
   const [listComplaints, setListComplaints] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageCount, setPageCount] = useState(1);
   const [status, setStatus] = useState();
   const LIMIT_PAGE = 1;
   const [isLoading, setIsLoading] = useState(false);
   const fetchApi = async (page) => {
      setIsLoading(true);
      try {
         let res = await fetchComplaint(page, LIMIT_PAGE);
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
      fetchApi(currentPage);
   }, [currentPage]);

   return (
      <div className="p-3">
         <div className="d-flex justify-content-center">Yêu cầu</div>
         <div className="d-flex justify-content-between ">
            <div className="d-flex gap-3">
               <button className="btn btn-secondary">Tất cả</button>
               <button className="btn btn-secondary">Chờ duyệt</button>
               <button className="btn btn-secondary">Được duyệt</button>
               <button className="btn btn-secondary ">Từ chối</button>
            </div>
            <div>
               <button className="btn btn-primary" onClick={() => setShow(true)}>
                  Gửi yêu cầu mới
               </button>
            </div>
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
               <>Loading</>
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
