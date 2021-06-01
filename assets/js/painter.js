import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const controls = document.getElementById("jsControls");

let painting = false;
let filling = false;

const INITIAL_COLOR = "#2C2C2C";
const INITIAL_SIZE = 500;
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
canvas.width = INITIAL_SIZE;
canvas.height = INITIAL_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};
const strokePath = (x, y, color = null, lineWidth) => {
  let currentColor = ctx.strokeStyle;
  let currentLineWidth = ctx.lineWidth;
  if (color !== null && lineWidth !== null) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentLineWidth;
};

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: ctx.strokeStyle,
      lineWidth: ctx.lineWidth,
    });
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeChange(e) {
  const strokeSize = e.target.value;
  ctx.lineWidth = strokeSize;
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Stroke";
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paint[EXPORT]";
  link.click();
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

const fill = (color = null) => {
  let currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
  ctx.fillStyle = currentColor;
};

function handleCanvasClick() {
  if (filling) {
    fill();
    getSocket().emit(window.events.fill, { color: ctx.fillStyle });
  }
}

function handleContextMenu(e) {
  e.preventDefault();
}

export const handleBeganPath = ({ x, y }) => beginPath(x, y);
export const handleStrokedPath = ({ x, y, color, lineWidth }) => {
  return strokePath(x, y, color, lineWidth);
};
export const handleFilled = ({ color }) => fill(color);
export const disableCanvas = () => {
  canvas.removeEventListener("mousemove", onMouseMove);
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
  canvas.removeEventListener("click", handleCanvasClick);
};
export const enableCanvas = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
};
export const hideControls = () => (controls.style.display = "none");
export const showControls = () => (controls.style.display = "block");
export const resetCanvas = () => fill("#fff");

if (canvas) {
  canvas.addEventListener("contextmenu", handleContextMenu);
  disableCanvas();
  hideControls();
}
