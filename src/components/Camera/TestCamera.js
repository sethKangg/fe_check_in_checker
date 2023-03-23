import React, { useRef, useState, useEffect } from "react";
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from "jslib-html5-camera-photo";
import { toast } from "react-toastify";
import { addRecognizeImg } from "../../services/apiService";
function TestCamera() {
   const [cameraPhoto, setCameraPhoto] = useState(null);
   const [dataUri, setDataUri] = useState("");
   const videoRef = useRef(null);

   useEffect(() => {
      // We need to instantiate CameraPhoto inside useEffect because we
      // need the refs.video to get the videoElement so the component has to be
      // mounted.
      setCameraPhoto(new CameraPhoto(videoRef.current));
      // startCamera(FACING_MODES.USER, {});
   }, []);

   function startCamera(idealFacingMode, idealResolution) {
      cameraPhoto
         .startCamera(idealFacingMode, idealResolution)
         .then(() => {
            console.log("camera is started !");
         })
         .catch((error) => {
            console.error("Camera not started!", error);
         });
   }

   function startCameraMaxResolution(idealFacingMode) {
      cameraPhoto
         .startCameraMaxResolution(idealFacingMode)
         .then(() => {
            console.log("camera is started !");
         })
         .catch((error) => {
            console.error("Camera not started!", error);
         });
   }

   function takePhoto() {
      const config = {
         sizeFactor: 1,
         imageType: IMAGE_TYPES.JPG,
         imageCompression: 0.95,
         isImageMirror: true,
      };

      let dataUri = cameraPhoto.getDataUri(config);
      // let dataImg = dataUri.substring(23);
      // console.log(dataImg);
      setDataUri(dataUri);
   }

   function stopCamera() {
      cameraPhoto
         .stopCamera()
         .then(() => {
            console.log("Camera stopped!");
         })
         .catch((error) => {
            console.log("No camera to stop!:", error);
         });
   }

   const handleCheckIn = async () => {
      let dataImg = dataUri.substring(23);

      let res = await addRecognizeImg(dataImg);
      console.log(res);
      if (res.status === 200) {
         toast.success("Check - in thành công. Chào mừng ngày mới ");
      } else {
         toast.error("Không nhận diện được khuôn mặt vui lòng thử lại !!");
      }
   };

   const handleSubmit = () => {
      handleCheckIn();
   };

   return (
      <div className="camera-div d-flex flex-column position-relative pt-3">
         <div className="position-relative ">
            <div className="d-flex justify-content-between">
               <button
                  className="btn btn-primary "
                  onClick={() => {
                     let facingMode = FACING_MODES.USER;
                     startCamera(facingMode, {});
                  }}
               >
                  Khởi động máy ảnh
               </button>
               <button
                  className="btn btn-primary"
                  onClick={() => {
                     stopCamera();
                  }}
               >
                  Dừng Camera
               </button>
            </div>
            <div className="d-flex justify-content-center">
               <video ref={videoRef} autoPlay="true" />
            </div>
            {dataUri && (
               <div className="preview-img d-flex flex-column justify-content-center align-items-center ">
                  <div className="preview-header">Ảnh xem trước</div>
                  <img width="300px" height="200px" src={dataUri} alt="Đang tải ..." />
                  <button onClick={() => handleSubmit()} className="btn btn-success mt-3">
                     Xác nhận Check-In
                  </button>
               </div>
            )}
         </div>
         <div className="d-flex justify-content-center mt-3 gap-3 ">
            <button
               className="btn btn-primary"
               onClick={() => {
                  takePhoto();
               }}
            >
               Chụp ảnh
            </button>
         </div>
      </div>
   );
}

export default TestCamera;
