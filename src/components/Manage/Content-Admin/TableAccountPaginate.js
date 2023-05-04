import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GiPlainCircle } from "react-icons/gi";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { MdSettingsBackupRestore } from "react-icons/md";
const TableAccountPaginate = (pros) => {
   const { listUser, pageCount, searchValue, filterIndex, handleClickReset } = pros;
   const dis = false;
   const handlePageClick = async (event) => {
      pros.setCurrentPage(event.selected + 1);
      await pros.fetchListUser(event.selected + 1, 1, searchValue, filterIndex);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   return (
      <>
         <table className="table table-hover table-bordered">
            <thead>
               <tr>
                  <th scope="col">Mã ID</th>
                  <th scope="col">Tên tài khoản</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Chức vụ</th>
                  <th scope="col">Trạng thái hoạt động</th>
               </tr>
            </thead>
            <tbody>
               {listUser &&
                  listUser.length > 0 &&
                  listUser.map((item, index) => {
                     return (
                        <tr key={index}>
                           <th scope="row">{item.id}</th>
                           <td>{item.username}</td>
                           <td>{item.staffName}</td>
                           <td>{item.email}</td>
                           <td>{item.roleName}</td>
                           <td className="d-flex justify-content-center">
                              {/* <input type="checkbox" disabled={dis} checked={item.enable} /> */}
                              <GiPlainCircle color={`${item.enable ? "green" : "red"}`} />
                              {/* {item.enable ? "TRUE" : "FALSE"} */}
                           </td>
                           {/* <td className=" "> */}

                           <td
                              className=""
                              onClick={() => handleClickReset(item)}
                              style={{
                                 cursor: "pointer",
                              }}
                           >
                              <MdSettingsBackupRestore />
                           </td>
                           <td
                              // className={`btn mr-3  ${
                              //    item.enable ? "btn-danger" : "btn-primary"
                              // }`}
                              onClick={() => pros.handleDelete(item)}
                              style={{
                                 cursor: "pointer",
                              }}
                           >
                              {item.enable ? (
                                 <AiOutlineLock color="red" />
                              ) : (
                                 <AiOutlineUnlock color="green" />
                              )}
                           </td>
                           {/* </td> */}
                        </tr>
                     );
                  })}
               {listUser && listUser.length === 0 && (
                  <tr>
                     <td colSpan={4}>Hiện không có dữ liệu</td>
                  </tr>
               )}
            </tbody>
         </table>
         <div className="mt-3 d-flex justify-content-center text-center">
            <ReactPaginate
               nextLabel="Trang sau>"
               onPageChange={handlePageClick}
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
               forcePage={pros.currentPage - 1}
            />
         </div>
      </>
   );
};

export default TableAccountPaginate;
