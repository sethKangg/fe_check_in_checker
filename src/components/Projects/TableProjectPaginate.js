import React from "react";
import { Button, Card } from "react-bootstrap";
import ReactPaginate from "react-paginate";
const TableProjectPaginate = (pros) => {
   const {
      listProject,
      pageCount,
      searchValue,
      showOptionsIndex,
      setShowOptionsIndex,
      fetchListProject,
      PAGE_LIMIT,
      setCurrentPage,
      handleClickView,
      handleClickUpdate,
      handleDelete,
   } = pros;
   const handlePageClick = (event) => {
      fetchListProject(event.selected + 1, PAGE_LIMIT, searchValue);
      setCurrentPage(event.selected + 1);
      // console.log(`User requested page number ${event.selected}, which is offset `);
   };
   //    console.log(ListGroup);
   return (
      <>
         <div className="task-list ">
            {listProject &&
               listProject.length > 0 &&
               listProject.map((task, index) => {
                  return (
                     <Card key={index} className="mb-3" style={{ width: "24%" }}>
                        <Card.Body>
                           <div className="d-flex justify-content-between align-items-center">
                              <div>
                                 <Card.Title
                                    className={
                                       showOptionsIndex === index ? "hidden-title" : "normal-title"
                                    }
                                    onClick={() => handleClickView(true, task)}
                                 >
                                    {task.projectName}
                                 </Card.Title>
                              </div>
                              <div className="text-right">
                                 {showOptionsIndex === index ? (
                                    <>
                                       <div className="background-options ">
                                          {task.status != "Cancel" && task.status != "Done" && (
                                             <Button
                                                variant="danger"
                                                size="sm"
                                                className=""
                                                onClick={() => handleDelete(task)}
                                             >
                                                Huỷ
                                             </Button>
                                          )}
                                          <Button
                                             variant="primary"
                                             size="sm"
                                             onClick={() => handleClickUpdate(true, task)}
                                          >
                                             Sửa
                                          </Button>
                                       </div>
                                    </>
                                 ) : (
                                    <Button
                                       className="border-0 p-1 align-items-center"
                                       variant="secondary"
                                       size="sm"
                                       onClick={() => setShowOptionsIndex(index)}
                                    >
                                       ...
                                    </Button>
                                 )}
                              </div>
                           </div>
                           <Card.Text>
                              Người phụ trách: <b>{" " + task.projectManagerName}</b>
                           </Card.Text>
                           <Card.Text>Time: {new Date(task.time).toLocaleString()}</Card.Text>
                           <Card.Text>Nhóm: {task.group}</Card.Text>
                           <Card.Text>
                              Status:{" "}
                              {task.status === "Done"
                                 ? "Hoàn thành"
                                 : task.status === "Cancel"
                                 ? "Hủy bỏ"
                                 : "Đang tiến hành"}
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  );
               })}
            {listProject && listProject.length === 0 && <div>NOT FOUND</div>}
         </div>

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

export default TableProjectPaginate;
