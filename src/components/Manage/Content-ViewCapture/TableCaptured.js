import React from "react";
import { useState } from "react";

import ReactPaginate from "react-paginate";
const TableCaptured = (pros) => {
   const { listVB, pageCount, setCurrentPage, putApi, handleSrcImg } = pros;
   const [showImage, setShowImage] = useState(false);
   const [imageSrc, setImageSrc] = useState("");
   function togglePreview(src) {
      setImageSrc(src);
      setShowImage(true);
   }
   const handlePageClick = (event) => {
      setCurrentPage(event.selected + 1);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   return (
      <>
         {listVB &&
            listVB.map((item, index) => (
               <div className="d-flex mt-3 flex-column" key={index}>
                  <h2 className="">Ngày {item.verifyDate}</h2>
                  {/* List Cards             */}
                  <div className="d-flex gap-3 flex-wrap">
                     {/* Card */}
                     {item.data.map((e, i) => (
                        <div className="d-flex mt-3" key={i}>
                           <div className="captured-card">
                              <div className=" d-flex m-auto flex-column">
                                 <div className="img-captured">
                                    {/* <img src={`../../../assets/Images` + e[i]} /> */}
                                    {/* <img src={require(`../../../assets/Images${e.imagePath}`)} /> */}
                                    <img
                                       src={handleSrcImg(e.imagePath)}
                                       onClick={() => togglePreview(handleSrcImg(e.imagePath))}
                                    />
                                 </div>
                                 <span className="mt-1 d-flex justify-content-center captured-name ">
                                    {e.lastName} {e.firstName}
                                 </span>
                                 <span className="mt-1 d-flex justify-content-center ">
                                    {e.verifyTime.slice(0, -3)}
                                 </span>
                                 <span
                                    className={`status-view mt-1 d-flex justify-content-center ${
                                       e.status === "APPROVED"
                                          ? "text-success"
                                          : e.status === "PENDING"
                                          ? "text-warning"
                                          : ""
                                    }  `}
                                 >
                                    {e.status === "APPROVED"
                                       ? "Thành công"
                                       : e.status === "PENDING"
                                       ? "Đang duyệt"
                                       : "Không nhận dạng được"}
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  {showImage && (
                     <div className="modal-preview" onClick={() => setShowImage(false)}>
                        <img src={imageSrc} alt="big image" />
                     </div>
                  )}
               </div>
            ))}
         {/* {listVB && listVB <div>Không có dữ liệu</div>} */}
         <div className="mt-3 d-flex justify-content-center text-center">
            <ReactPaginate
               nextLabel="Next>"
               onPageChange={(e) => handlePageClick(e)}
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
               //    forcePage={pros.currentPage - 1}
            />
         </div>
      </>
   );
};

export default TableCaptured;
