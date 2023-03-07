import React from "react";

const ModalStaffInfo = (pros) => {
   const { show, setShow, fetchListUser } = pros;

   const handleClose = () => {
      pros.setShow(false);
   };

   return (
      <>
         <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
               <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form className="row g-3" encType="multipart/form-data">
                  <div className="col-md-6">
                     <label className="form-label">Tên tài khoản</label>
                     <input
                        type="text"
                        className="form-control"
                        value={username || ""}
                        onChange={(event) => setUsername(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Password</label>
                     <input
                        type="password"
                        className="form-control"
                        value={password || ""}
                        onChange={(event) => setPassword(event.target.value)}
                     />
                  </div>
                  <div className="col-md-8 ">
                     <label className="form-label">Email</label>
                     <input
                        type="email"
                        className="form-control"
                        value={email || ""}
                        onChange={(event) => setEmail(event.target.value)}
                     />
                  </div>
                  <div className="col-md-4">
                     <label className="form-label">Họ</label>
                     <Form.Select
                        value={roleId}
                        onChange={(event) => setRoleId(event.target.value)}
                     >
                        <option value="1">Admin</option>
                        <option value="2">HR</option>
                        <option value="5">Staff</option>
                     </Form.Select>
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Họ</label>
                     <input
                        type="text"
                        className="form-control"
                        value={surName || ""}
                        onChange={(event) => setSurName(event.target.value)}
                     />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Tên</label>
                     <input
                        type="text"
                        className="form-control"
                        value={firstName || ""}
                        onChange={(event) => setFirstName(event.target.value)}
                     />
                  </div>

                  <div className="col-7">
                     <label className="form-label">Số điện thoại</label>
                     <input
                        type="text"
                        className="form-control"
                        placeholder="X.XXX.XXX.XXX"
                        value={phone || ""}
                        onChange={(event) => setPhone(event.target.value)}
                     />
                  </div>
                  <div className="col-5">
                     <label className="form-label">Ngày sinh</label>
                     <input
                        type="date"
                        className="form-control"
                        value={dateOfBirth || ""}
                        onChange={(e) => setdateOfBirth(e.target.value)}
                     />
                  </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalStaffInfo;
