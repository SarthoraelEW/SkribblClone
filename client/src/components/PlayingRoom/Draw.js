import React, { useEffect, useRef, useState } from "react";
import { getColorFromPixel, getPixelFromColor } from "../../utils/colorConverter.utils";
import Tools from "./Tools";

const THUMBS_DOWN_SRC = "./assets/images/thumbsdown.gif";
const THUMBS_UP_SRC = "./assets/images/thumbsup.gif";
const BUCKET_SRC = "./assets/images/filltool.gif";

let mouseDown = 0;
window.onmousedown = () => {
  ++mouseDown;
};
window.onmouseup = () => {
  --mouseDown;
};


const Draw = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const [lineWidth, setLineWidth] = useState(6);
  const [tool, setTool] = useState("PEN");
  const [color, setColor] = useState("Black");

  const [memPosCursorX, setMemPosCursorX] = useState(0);
  const [memPosCursorY, setMemPosCursorY] = useState(0);

  let size6Cursor = "";
  let size16Cursor = "";
  let size30Cursor = "";
  let size44Cursor = "";

  const createContext = (width, height) => {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  const createImage = (size) => {
    const context = createContext(size * 2, size * 2);
    context.arc(size, size, size / 2 - 2, 2 * Math.PI, false);
    context.fillStyle = "Black";
    context.fill();
    context.arc(size, size, size / 2, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = "Black";
    context.stroke();
    const url = context.canvas.toDataURL();
    switch (size) {
      case 6:
        size6Cursor = url;
        break;
      case 16:
        size16Cursor = url;
        break;
      case 30:
        size30Cursor = url;
        break;
      case 44:
        size44Cursor = url;
        break;
    }
  };

  createImage(6);

  const [cursorImage, setCursorImage] = useState(size6Cursor);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === "ERASER") {
      ctx.strokeStyle = "White";
      ctx.fillStyle = "White";
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    }
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [color, lineWidth, tool]);

  const relativePos = (e) => {
    const el = canvasRef.current;
    const rect = el.getBoundingClientRect();
    return { x: Math.round((e.clientX - rect.left) * (el.width / el.offsetWidth)), y: Math.round((e.clientY - rect.top) * (el.height / el.offsetHeight)) };
  };

  const getPenCursorImage = (newLineWidth) => {
    newLineWidth = newLineWidth !== null ? newLineWidth : lineWidth;
    switch (newLineWidth) {
      case 6:
        if (size6Cursor === "") {
          createImage(6);
        }
        return size6Cursor;
      case 16:
        if (size16Cursor === "") {
          createImage(16);
        }
        return size16Cursor;
      case 30:
        if (size30Cursor === "") {
          createImage(30);
        }
        return size30Cursor;
      case 44:
        if (size44Cursor === "") {
          createImage(44);
        }
        return size44Cursor;
      default:
        break;
    }
  };

  const setCursorUrl = (newTool, newLineWidth = null) => {
    switch (newTool) {
      case "BUCKET":
        setCursorImage(BUCKET_SRC);
        break;
      default:
        const newUrl = getPenCursorImage(newLineWidth);
        setCursorImage(newUrl);
        break;
    }
  };

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    const pos = relativePos(e);
    ctxRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setMemPosCursorX(pos.x);
    setMemPosCursorY(pos.y);
  };

  const endDrawing = (e) => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    const pos = relativePos(e);
    if (
      memPosCursorX === pos.x &&
      memPosCursorY === pos.y &&
      tool !== "BUCKET"
    ) {
      drawAPoint(e);
    }
  };

  const draw = (e) => {
    if (!isDrawing || tool === "BUCKET") {
      return;
    }
    const pos = relativePos(e);
    ctxRef.current.lineTo(pos.x, pos.y);
    ctxRef.current.stroke();
  };

  const drawAPoint = (e) => {
    const pos = relativePos(e);
    ctxRef.current.arc(
      pos.x,
      pos.y,
      lineWidth / 2,
      0,
      2 * Math.PI,
      true
    );
    ctxRef.current.fill();
  };

  const matchStartColor = (pixelPos, imageData, colorOfPixel) => {
    return getColorFromPixel([imageData.data[pixelPos + 0], imageData.data[pixelPos + 1], imageData.data[pixelPos + 2], imageData.data[pixelPos + 3]]) === colorOfPixel;
  };

  const colorPixelInImageData = (pixelPos, imageData, pixelToDraw) => {
    imageData.data[pixelPos] = pixelToDraw[0];
    imageData.data[pixelPos + 1] = pixelToDraw[1];
    imageData.data[pixelPos + 2] = pixelToDraw[2];
    imageData.data[pixelPos + 3] = pixelToDraw[3];
    return imageData;
  }

  const fill = (colorOfPixel, pixelsToVisit, canvasWidth, canvasHeight, imageData) => {
    const pixelToDraw = getPixelFromColor(color);
    while (pixelsToVisit.length) {
      const newPos = pixelsToVisit.pop();
      let x = newPos.x;
      let y = newPos.y;

      let pixelPos = (y * canvasWidth + x) * 4;

      while (y-- >= 0 && matchStartColor(pixelPos, imageData, colorOfPixel)) {
        pixelPos -= canvasWidth * 4;
      }
      pixelPos += canvasWidth * 4;
      ++y;
      let reachLeft = false;
      let reachRight = false;
      while (y++ < canvasHeight - 1 && matchStartColor(pixelPos, imageData, colorOfPixel)) {
        imageData = colorPixelInImageData(pixelPos, imageData, pixelToDraw);

        if (x > 0) {
          if (matchStartColor(pixelPos - 4, imageData, colorOfPixel)) {
            if (!reachLeft) {
              pixelsToVisit.push({ x: x - 1, y: y });
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < canvasWidth - 1) {
          if (matchStartColor(pixelPos + 4, imageData, colorOfPixel)) {
            if (!reachRight) {
              pixelsToVisit.push({ x: x + 1, y: y });
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += 4 * canvasWidth;
      }
    }
    return imageData;
  };

  const fillEvent = (e) => {
    if (tool === "BUCKET") {
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      let imageData = ctxRef.current.getImageData(0, 0, canvasWidth, canvasHeight);
      const pos = relativePos(e);
      const pixelPos = (pos.y * canvasWidth + pos.x) * 4
      const pixelColor = getColorFromPixel([imageData.data[pixelPos + 0], imageData.data[pixelPos + 1], imageData.data[pixelPos + 2], imageData.data[pixelPos + 3]]);
      if (pixelColor !== color) {
        let pixelsToVisit = [{ x: pos.x, y: pos.y }];
        imageData = fill(pixelColor, pixelsToVisit, canvasWidth, canvasHeight, imageData);
        ctxRef.current.putImageData(imageData, 0, 0);
      }
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <div className="drawContainer">
        <canvas
          style={{ cursor: `url('${cursorImage}') ${lineWidth} ${lineWidth}, auto` }}
          id="canvas"
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onMouseEnter={(e) => {
            mouseDown && startDrawing(e);
          }}
          onMouseMove={draw}
          onClick={fillEvent}
          ref={canvasRef}
          width={"800"}
          height={"720"}
        />
        {false && (
          <div className="thumbs">
            <img src={THUMBS_UP_SRC} alt="thumbsup" />
            <img src={THUMBS_DOWN_SRC} alt="thumbsup" />
          </div>
        )}
        <div className="hover"></div>
      </div>
      <Tools
        color={color}
        setColor={setColor}
        tool={tool}
        setTool={setTool}
        setLineWidth={setLineWidth}
        clear={clear}
        setCursorUrl={setCursorUrl}
      />
    </>
  );
};

export default Draw;
