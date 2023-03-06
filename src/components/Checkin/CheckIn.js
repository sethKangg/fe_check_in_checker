import React, { useState } from "react";
import Camera from "../Camera/Camera";
import "./CheckIn.scss";
import ModalCheckIn from "./ModalCheckIn";
const CheckIn = () => {
   const [imgPreview, setImgPreview] = useState(null);
   const [showModal, setShowModal] = useState(false);
   return (
      <>
         <Camera
            imgPreview={imgPreview}
            setImgPreview={setImgPreview}
            show={showModal}
            setShow={setShowModal}
         />
         <ModalCheckIn show={showModal} setShow={setShowModal} imgPreview={imgPreview} />
      </>
   );
};

export default CheckIn;
