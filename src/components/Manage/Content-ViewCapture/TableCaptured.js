import React from "react";
import { useState } from "react";

import ReactPaginate from "react-paginate";
const TableCaptured = (pros) => {
   const {
      listVB,
      pageCount,
      setCurrentPage,
      handleSrcImg,
      fetchListCaptured,
      onlyMe,
      isError,
      startDay,
      endDay,
      searchValue,
      currentPage,
   } = pros;
   const [showImage, setShowImage] = useState(false);
   const [imageSrc, setImageSrc] = useState("");
   function togglePreview(src) {
      setImageSrc(src);
      setShowImage(true);
   }
   const handlePageClick = async (event) => {
      setCurrentPage(event.selected + 1);
      await fetchListCaptured(onlyMe, isError, startDay, endDay, searchValue, event.selected + 1);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   return (
      <>
         {/* <h2 className="">Ngày {item.verifyDate}</h2> */}
         {/* List Cards             */}
         <div className="d-flex gap-3 flex-wrap">
            {/* Card */}
            {listVB &&
               listVB.map((item, index) => (
                  <div className="d-flex mt-3" key={index}>
                     <div className="captured-card">
                        <div className=" d-flex m-auto flex-column">
                           <div className="img-captured">
                              <img
                                 src={handleSrcImg(item.imagePath)}
                                 onClick={() => togglePreview(handleSrcImg(item.imagePath))}
                              />
                           </div>
                           <span className="mt-1 d-flex justify-content-center captured-name ">
                              {item.lastName} {item.firstName}
                           </span>
                           <span className="mt-1 d-flex justify-content-center ">
                              {item.verifyDate}
                           </span>
                           <span className="mt-1 d-flex justify-content-center ">
                              {item.verifyTime.slice(0, -3)}
                           </span>
                           <span
                              className={`status-view mt-1 d-flex justify-content-center ${
                                 item.status === "APPROVED"
                                    ? "text-success"
                                    : item.status === "PENDING"
                                    ? "text-warning"
                                    : ""
                              }  `}
                           >
                              {item.status === "APPROVED"
                                 ? "Thành công"
                                 : item.status === "PENDING"
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

         {listVB && listVB.length === 0 && (
            <h3 className="d-flex justify-content-center mt-3">
               Không có dữ liệu trong khoảng thời gian này
            </h3>
         )}
         {/* {listVB && listVB <div>Không có dữ liệu</div>} */}
         <div className="mt-3 d-flex justify-content-center text-center">
            <ReactPaginate
               nextLabel="Trang sau>"
               onPageChange={(e) => handlePageClick(e)}
               pageRangeDisplayed={3}
               marginPagesDisplayed={2}
               pageCount={pageCount}
               previousLabel="<Trang trước"
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
               forcePage={currentPage - 1}
            />
         </div>
      </>
   );
};

export default TableCaptured;
