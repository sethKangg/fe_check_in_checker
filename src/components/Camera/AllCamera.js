import React, { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";

const AllCamera = () => {
   const [deviceId, setDeviceId] = useState({});
   const [devices, setDevices] = useState([]);

   const handleDevices = useCallback(
      (mediaDevices) => setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
      [setDevices],
   );

   useEffect(() => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
   }, [handleDevices]);

   return (
      <>
         <div>AVC</div>
         {devices.map((device, key) => (
            <div>
               <Webcam
                  audio={false}
                  videoConstraints={{ deviceId: device.deviceId }}
                  mirrored={true}
               />
               {device.label || `Device ${key + 1}`}
            </div>
         ))}
      </>
   );
};

export default AllCamera;
