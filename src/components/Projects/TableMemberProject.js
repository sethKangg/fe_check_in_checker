import React from "react";
import ReactPaginate from "react-paginate";

const TableMemberProject = (pros) => {
   const {
      PAGE_LIMIT,
      listMember,
      pageCount,
      setCurrentPage,
      handleRemove,
      fetchListMember,
      projectId,
      data,
   } = pros;
   const handlePageClick = (event) => {
      fetchListMember(projectId, event.selected + 1, PAGE_LIMIT);
      setCurrentPage(event.selected + 1);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   // console.log(listMember);
   return (
      <>
         <table className="table table-hover table-bordered">
            <thead>
               <tr>
                  <th scope="col">Mã ID</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Email</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col">Cấp bậc</th>
               </tr>
            </thead>
            <tbody>
               {listMember &&
                  listMember.length > 0 &&
                  listMember.map((item, index) => {
                     return (
                        <tr key={index}>
                           <th scope="row">{item.staffId}</th>
                           <td>{item.fullName}</td>
                           <td>{item.phone}</td>
                           <td>{item.email}</td>
                           <td>{item.roleName}</td>
                           <td>{item.promotionLevel}</td>
                           {item.roleName != "Project manager" && data.status === "Processing" ? (
                              <th className="d-flex ">
                                 {/* <button className="btn btn-primary ml-3">Xem</button> */}
                                 <button
                                    className="btn btn-danger mx-3"
                                    onClick={() => handleRemove(item)}
                                 >
                                    Xoá khỏi dự án
                                 </button>
                              </th>
                           ) : (
                              <td></td>
                           )}
                        </tr>
                     );
                  })}
               {listMember && listMember.length === 0 && (
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

export default TableMemberProject;
