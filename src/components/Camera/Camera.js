import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
   width: 840,
   facingMode: "enviroment",
};

const Camera = (props) => {
   const { imgPreview, setImgPreview, show, setShow } = props;
   const wecamRef = useRef(null);
   // const [url, setUrl] = useState(null);
   const capturedPhoto = useCallback(async () => {
      const imageSrc = wecamRef.current.getScreenshot();
      setImgPreview(imageSrc);
      // setUrl(imageSrc);
   }, [wecamRef]);

   const onUserMedia = (e) => {
      // console.log(e);
   };

   const handleClickCheckIn = () => {
      setShow(true);
   };

   return (
      <>
         <div className="camera-div d-flex flex-column position-relative">
            <Webcam
               height="500px"
               ref={wecamRef}
               audio={false}
               screenshotFormat="image/png"
               videoConstraints={videoConstraints}
               onUserMedia={onUserMedia}
               mirrored={true}
            />
            <div className="d-flex gap-5 w-100 justify-content-center mt-3 ">
               <button className="btn btn-primary border-0" onClick={capturedPhoto}>
                  Chụp
               </button>
               <button className="btn btn-primary border-0" onClick={() => setImgPreview(null)}>
                  Tải lại
               </button>
            </div>
            <div className="d-flex justify-content-center">
               <button className="btn btn-primary mt-3" onClick={() => handleClickCheckIn()}>
                  Xác nhận Check-in
               </button>
            </div>
            {imgPreview && (
               <div className="preview-img d-flex flex-column justify-content-center align-items-center ">
                  <div className="preview-header">Ảnh xem trước</div>
                  <img width="300px" height="200px" src={imgPreview} alt="Đang tải ..." />
               </div>
            )}
         </div>
      </>
   );
};

export default Camera;
