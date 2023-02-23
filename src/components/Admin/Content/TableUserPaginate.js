import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

// const PaginatedItems = ({ itemsPerPage }) => {
//    // We start with an empty list of items.
//    const [currentItems, setCurrentItems] = useState(null);
//    const [pageCount, setPageCount] = useState(0);
//    // Here we use item offsets; we could also use page offsets
//    // following the API or data you're working with.
//    const [itemOffset, setItemOffset] = useState(0);

//    useEffect(() => {
//       // Fetch items from another resources.
//       const endOffset = itemOffset + itemsPerPage;
//       console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//       setCurrentItems(items.slice(itemOffset, endOffset));
//       setPageCount(Math.ceil(items.length / itemsPerPage));
//    }, [itemOffset, itemsPerPage]);

//    // Invoke when user click to request another page.

//    return (
//       <>
//          <Items currentItems={currentItems} />
//       </>
//    );
// };

const TableUserPaginate = (pros) => {
   const { listUser } = pros;

   const handlePageClick = (event) => {
      pros.fetchListUserPage(`${+event.selected + 1}`);
      pros.setCurrentPage(event.selected + 1);
      console.log(`User requested page number ${event.selected}, which is offset `);
   };
   return (
      <>
         <table className='table table-hover table-bordered'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>First</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>Handle</th>
               </tr>
            </thead>
            <tbody>
               {listUser &&
                  listUser.length > 0 &&
                  listUser.map((item, index) => {
                     return (
                        <tr key={item.id}>
                           <th scope='row'>{item.id}</th>
                           <td>{item.name}</td>
                           <td>
                              <button className='btn btn-primary'>View</button>
                           </td>
                           <td>
                              <button
                                 className='btn btn-warning'
                                 onClick={() => pros.handleClickUpdate(true, item)}
                              >
                                 Update
                              </button>
                           </td>
                           <td>
                              <button
                                 className='btn btn-danger'
                                 onClick={() => pros.handleDelete(item)}
                              >
                                 Disable
                              </button>
                           </td>
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
         <div className='mt-3 d-flex justify-content-center text-center'>
            <ReactPaginate
               nextLabel='Next>'
               onPageChange={handlePageClick}
               pageRangeDisplayed={3}
               marginPagesDisplayed={2}
               pageCount={5}
               previousLabel='<Prev'
               pageClassName='page-item'
               pageLinkClassName='page-link'
               previousClassName='page-item'
               previousLinkClassName='page-link'
               nextClassName='page-item'
               nextLinkClassName='page-link'
               breakLabel='...'
               breakClassName='page-item'
               breakLinkClassName='page-link'
               containerClassName='pagination'
               activeClassName='active'
               renderOnZeroPageCount={null}
               forcePage={pros.currentPage - 1}
            />
         </div>
      </>
   );
};

export default TableUserPaginate;
