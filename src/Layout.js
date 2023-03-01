import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './App';
import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import User from './components/User/User';
import AllCamera from './components/Camera/AllCamera';
import Camera from './components/Camera/Camera';
const Layout = () => {
   return (
      <>
         <Routes>
            <Route path='/' element={<App />}>
               <Route index element={<Home />} />
               <Route path='/users' element={<User />} />
            </Route>
            <Route path='/admins' element={<Admin />}>
               <Route index path='dashboard' element={<Dashboard />} />
               <Route path='manage-users' element={<ManageUser />} />
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/camera' element={<Camera />}></Route>
         </Routes>
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
      </>
   );
};

export default Layout;
