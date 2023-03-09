import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "./Profile.scss";
const Profile = () => {
   const nameRef = useRef(null);
   const emailRef = useRef(null);
   const dobRef = useRef(null);
   const idRef = useRef(null);
   const levelRef = useRef(null);
   const roleRef = useRef(null);

   const handleReset = () => {
      nameRef.current.value = "";
      emailRef.current.value = "";
      dobRef.current.value = "";
      idRef.current.value = "";
      levelRef.current.value = "";
      roleRef.current.value = "";
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
         name: nameRef.current.value,
         email: emailRef.current.value,
         dob: dobRef.current.value,
         id: idRef.current.value,
         level: levelRef.current.value,
         role: roleRef.current.value,
      };
      console.log(formData); // or send the data to server
   };

   return (
      <Form className="profile-form" onSubmit={handleSubmit}>
         <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" ref={nameRef} />
         </Form.Group>

         <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" ref={emailRef} />
         </Form.Group>

         <Form.Group controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" placeholder="Enter your date of birth" ref={dobRef} />
         </Form.Group>

         <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter your ID" ref={idRef} />
         </Form.Group>

         <Form.Group controlId="formLevel">
            <Form.Label>Level</Form.Label>
            <Form.Control type="text" placeholder="Enter your level" ref={levelRef} />
         </Form.Group>

         <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" placeholder="Enter your role" ref={roleRef} />
         </Form.Group>

         <Button className="mt-3 mx-5" variant="primary" type="submit">
            Save
         </Button>
         <Button className="mt-3 " variant="secondary" onClick={handleReset}>
            Reset
         </Button>
      </Form>
   );
};

export default Profile;
