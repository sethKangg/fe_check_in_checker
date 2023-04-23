import React from "react";
import ReactPaginate from "react-paginate";
import { FiImage, FiX, FiTrendingUp } from "react-icons/fi";
const TableMemberGroup = (pros) => {
   const {
      PAGE_LIMIT,
      listMember,
      pageCount,
      setCurrentPage,
      handleRemove,
      fetchListMember,
      projectId,
      handleClickSet,
      handleClickInfo,
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
                           <th scope="row">{item.id}</th>
                           <td>{item.fullName}</td>
                           <td>{item.phone}</td>
                           <td>{item.email}</td>
                           <td>{item.roleName}</td>
                           <td>{item.promotionLevel}</td>
                           <th className="d-flex gap-3">
                              <button
                                 className="btn btn-primary"
                                 onClick={() => handleClickInfo(item)}
                              >
                                 <FiImage />
                              </button>
                              {item.roleName == "Staff" ? (
                                 <button
                                    className="btn btn-warning "
                                    onClick={() => handleClickSet(item)}
                                 >
                                    <FiTrendingUp />
                                 </button>
                              ) : (
                                 <></>
                              )}
                              {item.roleName != "Group leader" ? (
                                 <button
                                    className="btn btn-danger"
                                    onClick={() => handleRemove(item)}
                                 >
                                    <FiX />
                                 </button>
                              ) : (
                                 <></>
                              )}
                           </th>
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

export default TableMemberGroup;
