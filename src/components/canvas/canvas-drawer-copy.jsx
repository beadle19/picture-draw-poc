import React, { useState, useRef, useEffect } from "react";
import { Camera } from 'react-html5-camera-photo';

function CanvasDrawer() {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const handleTakePicture = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", (e) => {
          video.play();
        });
        video.addEventListener("canplay", (e) => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        });
      });
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "image.jpg";
    link.click();
  };

  const handleStartDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";

    const onMouseMove = (event) => {
      ctx.lineTo(event.clientX, event.clientY);
      ctx.stroke();
    };

    const onMouseUp = () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
  };

  function onTakePhoto (dataUri) {
    setImage(dataUri);
  }

  return (
    <div>
        {/*<Camera onTakePhoto={onTakePhoto} />*/}
        <input type="file" accept="image/x-png,image/jpeg,image/gif"/>
        {image &&
            <canvas ref={canvasRef} width={500} height={500}>
                <img src={image} alt="Captured" />
            </canvas>
        }
    </div>
  )

  // return (
  //   <div>
  //     <button onClick={handleTakePicture}>Take Picture</button>
  //     <button onClick={handleSaveImage}>Save Image</button>
  //     <br />
  //     <canvas
  //       width={500}
  //       height={500}
  //       ref={canvasRef}
  //       onMouseDown={handleStartDrawing}
  //     />
  //   </div>
  // );
}

export default CanvasDrawer;