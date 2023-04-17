import React from "react";
import { AiFillStop, AiOutlineCheckCircle, AiOutlineCoffee } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const TablePageReport = (pros) => {
   const { listComplaints, pageCount, setCurrentPage, putApi } = pros;
   const handlePageClick = (event) => {
      setCurrentPage(event.selected + 1);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   const account = useSelector((state) => state.user.account);
   return (
      <>
         {listComplaints &&
            listComplaints.map((e, i) => (
               <div className="card-2 mt-3" key={i}>
                  <div className="card-2-top-part">
                     <div className="left-part">
                        <div className="user-name d-flex justify-content-between">
                           <div className="d-flex  align-items-center">
                              <p className="name">
                                 {e.complaintType} #{e.id}
                              </p>
                           </div>
                           <div>
                              <p className="name">Thời gian: {e.createDay}</p>
                           </div>
                        </div>
                        <div className="user-position d-flex justify-content-between">
                           <div className="d-flex">
                              <p className="position">
                                 Người gửi: {e.staffName} #{e.staffId}
                              </p>
                              {/* <p className="role mx-2"> Admin </p> */}
                           </div>
                           <div className="d-flex">
                              <p className="position">
                                 Người duyệt: {e.approveName} #{e.approveId}
                              </p>
                              {/* <p className="role mx-2"> Admin </p> */}
                           </div>
                        </div>
                        <div className="content">Nội dung: {e.content}</div>
                     </div>
                  </div>
                  <div className="card-2-bottom-part ">
                     {/* <div className="bottom-part click-yeah py-3"> */}
                     <div className="link  m-auto py-3">
                        {e.status === "Accept" ? (
                           <>
                              <span className="icon">
                                 <AiOutlineCheckCircle size={30} color="green" />
                              </span>
                              Phê duyệt
                           </>
                        ) : e.status === "Reject" ? (
                           <>
                              <span className="icon">
                                 <AiFillStop size={30} color="red" />
                              </span>
                              Từ chối
                           </>
                        ) : e.status === "Pending" ? (
                           <>
                              <span className="icon">
                                 <AiOutlineCoffee size={30} color="#a7a49e" />
                              </span>
                              Đang duyệt
                           </>
                        ) : (
                           <></>
                        )}
                     </div>
                     {/* </div> */}
                  </div>
                  {e.status === "Pending" && account.roleName === "Human resource" && (
                     <div className="card-2-bottom-part ">
                        <div className="bottom-part click-yeah py-3">
                           <div
                              className="link"
                              onClick={() => {
                                 putApi(e.id, 1);
                              }}
                           >
                              <span className="icon">
                                 <AiOutlineCheckCircle size={30} color="green" />
                              </span>
                              Phê duyệt
                           </div>
                        </div>
                        <div className="bottom-part click-yeet py-3">
                           <div
                              className="link"
                              onClick={() => {
                                 putApi(e.id, 0);
                              }}
                           >
                              <span className="icon">
                                 <AiFillStop size={30} color="red" />
                              </span>
                              Từ chối
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            ))}
         <div className="mt-3 d-flex justify-content-center text-center">
            <ReactPaginate
               nextLabel="Next>"
               onPageChange={handlePageClick}
               pageRangeDisplayed={3}
               marginPagesDisplayed={2}
               pageCount={pageCount}
               previousLabel="<Prev"
               pageClassName="page-item"
               pageLinkClassName="page-link"
               previousClassName="page-item"
               previousLinkClassName="page-link"
               nextClassName="page-item"
               nextLinkClassName="page-link"
               breakLabel="..."
               breakClassName="page-item"
               breakLinkClassName="page-link"
               containerClassName="pagination"
               activeClassName="active"
               renderOnZeroPageCount={null}
               forcePage={pros.currentPage - 1}
            />
         </div>
      </>
   );
};

export default TablePageReport;
