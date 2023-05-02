import React from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { FiImage, FiSearch, FiMenu } from "react-icons/fi";
import { GiPlainCircle } from "react-icons/gi";
const TableStaffPaginate = (pros) => {
   const { listStaff, pageCount, searchValue, filterIndex, PAGE_LIMIT, handleClickView } = pros;
   const handlePageClick = async (event) => {
      pros.setCurrentPage(event.selected + 1);
      await pros.fetchListUser(event.selected + 1, PAGE_LIMIT, searchValue, filterIndex);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   const convertTime = (time) => {
      const date = new Date(time);

      const options = {
         timeZone: "Asia/Ho_Chi_Minh",
         // weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
         // hour: "numeric",
         // minute: "numeric",
         // second: "numeric",
      };
      try {
         const localTime = date.toLocaleString("vi-VN", options);
         return localTime;
      } catch (er) {
         return "Không xác định";
      }
   };
   const navigate = useNavigate();
   return (
      <>
         <Table striped bordered hover responsive className="user-table">
            <thead>
               <tr>
                  <th scope="col">Mã ID</th>
                  <th scope="col">Tên </th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Cấp bậc</th>
                  <th scope="col">Chức vụ</th>
                  <th scope="col">Trạng thái</th>
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
                           <td scope="row">{convertTime(item.dateOfBirth)}</td>
                           <td scope="row">{item.email}</td>
                           <td scope="row">{item.phone}</td>
                           <td scope="row">{item.promotionLevel}</td>
                           <td scope="row">{item.roleName}</td>
                           <td scope="">
                              {/* <input type="checkbox" disabled={true} checked={item.enable} /> */}
                              <GiPlainCircle color={`${item.enable ? "green" : "red"}`} />
                              {/* {item.enable ? "TRUE" : "FALSE"} */}
                           </td>
                           <th className="actions">
                              <button
                                 className="btn btn-primary "
                                 onClick={() => {
                                    handleClickView(true, item);
                                 }}
                              >
                                 <FiImage />
                              </button>
                              <button
                                 className="btn btn-primary"
                                 onClick={() => {
                                    navigate(`/profile/${item.username}`);
                                 }}
                              >
                                 <FiSearch />
                              </button>
                              <button
                                 disabled={item.roleName !== "Human resource" ? false : true}
                                 className="btn btn-warning"
                                 onClick={() => pros.handleClickUpdate(true, item)}
                              >
                                 <FiMenu />
                              </button>
                           </th>
                        </tr>
                     );
                  })}
               {listStaff && listStaff.length === 0 && (
                  <tr>
                     <td colSpan={4}>Hiện không có dữ liệu</td>
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

export default TableStaffPaginate;
