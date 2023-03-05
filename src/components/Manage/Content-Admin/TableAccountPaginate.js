import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableAccountPaginate = (pros) => {
   const { listUser, pageCount, searchValue, filterIndex } = pros;
   const handlePageClick = (event) => {
      pros.fetchListUser(event.selected + 1, 1, searchValue, filterIndex);
      pros.setCurrentPage(event.selected + 1);
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
                  <th scope="col">Khả dụng</th>
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
                           <td>{item.enable}</td>
                           <th className="d-flex ">
                              <button className="btn btn-primary ml-3">View</button>
                              <button
                                 className="btn btn-warning mx-3"
                                 onClick={() => pros.handleClickUpdate(true, item)}
                              >
                                 Update
                              </button>
                              <button
                                 className="btn btn-danger mr-3"
                                 onClick={() => pros.handleDelete(item)}
                              >
                                 Disable
                              </button>
                           </th>
                        </tr>
                     );
                  })}
               {listUser && listUser.length === 0 && (
                  <tr>
                     <td colSpan={4}>No data found</td>
                  </tr>
               )}
            </tbody>
         </table>
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

export default TableAccountPaginate;
