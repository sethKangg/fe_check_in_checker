import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
   width: 840,
   facingMode: 'enviroment',
};

const Camera = () => {
   const wecamRef = useRef(null);
   const [url, setUrl] = useState(null);
   const capturedPhoto = useCallback(async () => {
      const imageSrc = wecamRef.current.getScreenshot();
      setUrl(imageSrc);
   }, [wecamRef]);

   const onUserMedia = (e) => {
      console.log(e);
   };
   return (
      <>
         <Webcam
            ref={wecamRef}
            audio={false}
            screenshotFormat='image/png'
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
            mirrored={true}
         />
         <button onClick={capturedPhoto}>Capture</button>
         <button onClick={() => setUrl(null)}>Refresh</button>

         {url && (
            <div>
               <img src={url} alt='ScreenShot' />
            </div>
         )}
      </>
   );
};

export default Camera;
