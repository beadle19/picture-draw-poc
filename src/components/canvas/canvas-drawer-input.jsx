import React, { useState, useRef, useEffect } from "react";

function CanvasDrawer() {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const [coords, setCoords] = useState('')

  const handleTakePicture = (e) => {
    const targetInputImage = e.target.files[0]
    const imageObj = URL.createObjectURL(e.target.files[0])

    const canvas = canvasRef.current;

    const img = new Image(canvas.width)
    img.src = imageObj
    img.onload = () => {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    setImage(img)
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
    e.preventDefault()
    e.stopPropagation()

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";

    const onMouseMove = (e) => {
      e.stopPropagation()
      e.preventDefault()

      const xMove = e?.touches[0]?.clientX || e.clientX
      const yMove = e?.touches[0]?.clientY || e.clientY

      setCoords([xMove, yMove])

      ctx.lineTo(xMove, yMove);
      ctx.stroke();
    };

    const onMouseUp = () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);

      canvas.removeEventListener("touchmove", onMouseMove);
      canvas.removeEventListener("touchend", onMouseUp);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchmove", onMouseMove);
    canvas.addEventListener("touchend", onMouseUp);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
  }

  return (
    <div>
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        onMouseDown={handleStartDrawing}
        onTouchStart={handleStartDrawing}
        touch-action="none"
        style={{ touchAction: "none" }}
      />
      <br />
      <input type="file" accept="image/x-png,image/jpeg,image/gif" onChange={handleTakePicture} />
      <br />
      <br />
      <button onClick={handleClearCanvas}>Clear Image Edit</button><br />
      <br />
      <button onClick={handleSaveImage}>Save Image</button>
      <br />
    </div>
  );
}

export default CanvasDrawer;