import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../../services/apiService';

const TableUser = (pros) => {
   const { listUser, handleClickUpdate } = pros;
   return (
      <>
         <table className='table table-hover table-bordered'>
            <thead>
               <tr>
                  <th scope='col'>Mã ID</th>
                  <th scope='col'>Họ</th>
                  <th scope='col'>Tên</th>
                  <th scope='col'>Email</th>
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
                           <tr>
                              <button className='btn btn-primary'>View</button>
                           </tr>
                           <tr>
                              <button
                                 className='btn btn-warning'
                                 onClick={() => pros.handleClickUpdate(true, item)}
                              >
                                 Update
                              </button>
                           </tr>
                           <tr>
                              <button
                                 className='btn btn-danger'
                                 onClick={() => pros.handleDelete(item)}
                              >
                                 Disable
                              </button>
                           </tr>
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
