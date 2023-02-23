import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Admin = () => {
   const [collapsed, setCollapsed] = useState(false);
   return (
      <div className='admin-container'>
         <div className='admin-sidebar'>
            <SideBar collapsed={collapsed} />
         </div>
         <div className='admin-content'>
            <div className='admin-header'>
               <FaBars onClick={() => setCollapsed(!collapsed)} /> lorem
            </div>
            <div className='admin-main p-3'>
               <Outlet />
            </div>
         </div>
         <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
         />
      </div>
   );
};

export default Admin;
