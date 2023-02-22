import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../../services/apiService';

const TableUser = (pros) => {
   const { listUser, handleClickUpdate } = pros;
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
                              <button className='btn btn-danger'>Disable</button>
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
      </>
   );
};

export default TableUser;
