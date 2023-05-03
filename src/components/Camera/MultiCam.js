import React, { useRef, useState, useEffect } from "react";
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from "jslib-html5-camera-photo";
import { toast } from "react-toastify";
import { addRecognizeImg } from "../../services/apiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const MultiCam = () => {
   const [cameraPhoto, setCameraPhoto] = useState(null);
   const [dataUri, setDataUri] = useState("");
   const [listCam, setListCam] = useState([]);
   const videoRef = useRef(null);
   const [currentCam, setCurrentCam] = useState([]);
   const [flag, setFlag] = useState(null);
   let newArray = [];
   useEffect(() => {
      setCameraPhoto(new CameraPhoto(videoRef.current));
      setFlag(1);
      // startCamera(FACING_MODES.USER, {});
   }, []);
   useEffect(() => {
      if (flag === 1) {
         list();
      }
   }, [flag]);
   const navigate = useNavigate();
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   const assignCam = useRef(null);
   // if (isAuthenticated) return navigate("/");

   function startCamera(idealFacingMode, idealResolution) {
      cameraPhoto
         .startCamera(currentCam, { idealFacingMode, idealResolution })
         .then(() => {
            console.log("camera is started !");
         })
         .catch((error) => {
            console.error("Camera not started!", error);
         });
   }
   const list = async () => {
      let listCamL = [];
      //   newArray = [];
      await cameraPhoto.enumerateCameras().then((cameras) => {
         cameras.forEach((camera) => {
            let { kind, label, deviceId } = camera;
            let cameraStr = {
               kind: kind,
               label: label,
               deviceId: deviceId,
            };
            // console.log(cameraStr);
            // listCamL.push(cameraStr);
            newArray.push({ value: deviceId, label: label });
            // let add = { value: deviceId, label: label };
            // newArray = [...newArray, add];
            // setListCam(cameraStr);
            // console.log(newArray);
         });
      });
      //   setCurrentCam(newArray[0].value);
      setListCam(newArray);
   };
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
      setDataUri("");
   }

   const handleCheckIn = async () => {
      const dataImg = dataUri.substring("data:image/webp;base64,".length);
      // let dataImg = dataUri.substring(23);
      // console.log(dataUri);
      // console.log(dataUri.substring(23));
      let res = await addRecognizeImg(dataImg);
      console.log(res);
      if (res.status === 200) {
         toast.success(
            `Check - in thành công. Chào mừng ${res.data.lastName} ${res.data.firstName} `,
         );
      } else {
         toast.error("Không nhận diện được khuôn mặt vui lòng thử lại !!");
      }
   };

   const handleSubmit = () => {
      handleCheckIn();
   };
   const handleSelectDevice = (e) => {
      //   assignCam.current.value = e.value;
      //   console.log(e);
      //   toast.success(e.value);
      setCurrentCam(e.value);
   };
   return (
      <div className="camera-div d-flex flex-column position-relative pt-3">
         <div className="position-relative ">
            <div className="d-flex gap-5 align-items-center">
               {/* <button className="btn btn-primary" onClick={() => list()}>
                  Tải danh sách máy ảnh
               </button> */}
               <div className="w-25">
                  <Select
                     //   ref={assignCam}
                     onChange={(event) => handleSelectDevice(event)}
                     className="basic-single"
                     //   classNamePrefix="Chojn"
                     //   defaultValue={newArray[0]}
                     options={listCam.map((item) => ({
                        value: item.value,
                        label: item.label,
                     }))}
                     //   options={newArray}
                     isSearchable={true}
                     placeholder={<div>Chọn máy ảnh</div>}
                     //   components={{ NoOptionsMessage }}
                  />
               </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
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
                  <img width="390px" height="300px" src={dataUri} alt="Đang tải ..." />
                  <button onClick={() => handleSubmit()} className="btn btn-success mt-3">
                     Xác nhận và gửi
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
};

export default MultiCam;
