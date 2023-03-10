import React from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const TableStaffPaginate = (pros) => {
   const { listStaff, pageCount, searchValue, filterIndex, PAGE_LIMIT } = pros;
   const handlePageClick = (event) => {
      pros.fetchListUser(event.selected + 1, PAGE_LIMIT, searchValue, filterIndex);
      pros.setCurrentPage(event.selected + 1);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   return (
      <>
         <Table striped bordered hover responsive className="user-table">
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
               {listStaff &&
                  listStaff.length > 0 &&
                  listStaff.map((item, index) => {
                     return (
                        <tr key={index}>
                           <th scope="row">{item.id}</th>
                           <td scope="row">{item.fullName}</td>
                           <td scope="row">{item.dateOfBirth}</td>
                           <td scope="row">{item.email}</td>
                           <td scope="row">{item.phone}</td>
                           <td scope="row">{item.promotionLevel}</td>
                           <th className="actions">
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
               {listStaff && listStaff.length === 0 && (
                  <tr>
                     <td colSpan={4}>No data found</td>
                  </tr>
               )}
            </tbody>
         </Table>

         {/* <Table striped bordered hover responsive className="user-table">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <tr key={user.id}>
                     <td>{user.id}</td>
                     <td>{user.email}</td>
                     <td>{user.name}</td>
                     <td>{user.role}</td>
                     <td>{user.phone}</td>
                     <td className="actions">
                        <Button variant="primary">View</Button>
                        <Button variant="danger">Disable</Button>
                        <Button variant="warning">Edit</Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table> */}
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

export default TableStaffPaginate;
