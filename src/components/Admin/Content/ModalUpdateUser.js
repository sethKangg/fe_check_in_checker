import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { postCreateUser } from '../../../services/apiService';
import _ from 'lodash';
const ModalUpdateUser = (pros) => {
   const { show, setShow, dataUpdate } = pros;

   const handleClose = () => {
      pros.setShow(false);
      setEmail('');
   };
   //    const handleShow = () => pros.setShow(true);

   const [email, setEmail] = useState('');

   useEffect(() => {
      console.log('dataupdate', dataUpdate);
      if (!_.isEmpty(dataUpdate)) {
         setEmail(dataUpdate.name);
      }
   }, [dataUpdate]);

   const handleSubmit = async () => {
      //validate

      //api

      //   let res = await postCreateUser(email);
      await pros.fetchListUser();
      pros.toast.error('ehe xd');
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} size='xl'>
            <Modal.Header closeButton>
               <Modal.Title>Update user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className='row g-3'>
                  <div className='col-md-6'>
                     <label htmlFor='inputEmail4' className='form-label'>
                        Email
                     </label>
                     <input
                        type='email'
                        className='form-control'
                        id='inputEmail4'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                     />
                  </div>
                  <div className='col-md-6'>
                     <label htmlFor='inputPassword4' className='form-label'>
                        Password
                     </label>
                     <input type='password' className='form-control' id='inputPassword4' />
                  </div>
                  <div className='col-md-6'>
                     <label htmlFor='inputEmail4' className='form-label'>
                        First Name
                     </label>
                     <input type='email' className='form-control' id='inputEmail4' />
                  </div>
                  <div className='col-md-6'>
                     <label htmlFor='inputPassword4' className='form-label'>
                        Last Name
                     </label>
                     <input type='password' className='form-control' id='inputPassword4' />
                  </div>

                  <div className='col-12'>
                     <label htmlFor='inputAddress2' className='form-label'>
                        Address 2
                     </label>
                     <input
                        type='text'
                        className='form-control'
                        id='inputAddress2'
                        placeholder='Apartment, studio, or floor'
                     />
                  </div>
                  <div className='col-md-6'>
                     <label htmlFor='inputCity' className='form-label'>
                        City
                     </label>
                     <input type='text' className='form-control' id='inputCity' />
                  </div>

                  <div className='col-md-2'>
                     <label htmlFor='inputZip' className='form-label'>
                        Zip
                     </label>
                     <input type='text' className='form-control' id='inputZip' />
                  </div>
                  <div className='col-12'>
                     <div className='form-check'>
                        <input className='form-check-input' type='checkbox' id='gridCheck' />
                        <label className='form-check-label' htmlFor='gridCheck'>
                           Check me out
                        </label>
                     </div>
                  </div>
                  <div className='col-12'>
                     <button type='submit' className='btn btn-primary'>
                        Sign in
                     </button>
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant='secondary' onClick={handleClose}>
                  Close
               </Button>
               <Button variant='primary' onClick={() => handleSubmit()}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalUpdateUser;
