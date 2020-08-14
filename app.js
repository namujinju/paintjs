const jsColors = document.getElementById("jsColors"),
  canvas = document.getElementById("jsCanvas"),
  ctx = canvas.getContext("2d"),
  rangeColor = document.getElementById("jsSelectedColor"),
  thickRange = document.getElementById("thickRange"),
  mode = document.getElementById("jsMode"),
  saveBtn = document.getElementById("jsSave"),
  updateBtn = document.getElementById("js-update-palette");

const INITIAL_COLOR = "black";
const COLOR_NUM = 21;
const color__list = [
  "black",
  "white",
  "red",
  "orangered",
  "yellow",
  "green",
  "skyblue",
  "blue",
  "blueviolet",
];

CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;
let updatingPalette = false;

function makePalette() {
  for (i = 0; i < COLOR_NUM; i++) {
    const div = document.createElement("div");
    if (color__list[i]) {
      div.style.backgroundColor = `${color__list[i]}`;
    } else {
      div.style.backgroundColor = "white";
    }
    div.classList.add("controls__color");
    jsColors.appendChild(div);
    div.addEventListener("click", handleClickedColor);
  }
}

// drawLine

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

// changeColor

function handleClickedColor(event) {
  /*update palette가 활성화되면 색깔 버튼을 클릭했을 때 현재 선택된 색깔로 바뀐다*/
  if (updatingPalette === true) {
    event.target.style.backgroundColor = ctx.strokeStyle;
  } else {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    rangeColor.value = color;
  }
}

function updateColor(event) {
  ctx.strokeStyle = event.target.value;
}

function changeRangeColor() {
  rangeColor.addEventListener("input", updateColor, false);
}

//change thickness

function updateThick(event) {
  ctx.lineWidth = event.target.value;
}

function changeThick() {
  if (thickRange) {
    thickRange.addEventListener("input", updateThick, false);
  }
}

function handleModeclick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function changeMode() {
  if (mode) {
    mode.addEventListener("click", handleModeclick);
  }
}

function handelSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

function saveFile() {
  if (saveBtn) {
    saveBtn.addEventListener("click", handelSaveClick);
  }
}

function drawEL() {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove, false);
    canvas.addEventListener("mousedown", startPainting, false);
    canvas.addEventListener("mouseup", stopPainting, false);
    canvas.addEventListener("mouseleave", stopPainting, false);
    canvas.addEventListener("click", handleCanvasClick, false);
    canvas.addEventListener("contextmenu", handleCM, false);
  }
}

function changePalette() {
  if (updateBtn.innerText === "Update palette") {
    updatingPalette = true;
    updateBtn.innerText = "Cancel";
  } else {
    updatingPalette = false;
    updateBtn.innerText = "Update palette";
  }
}

function updatePalette() {
  updateBtn.addEventListener("click", changePalette);
}

function init() {
  makePalette();
  drawEL();
  changeRangeColor();
  changeThick();
  changeMode();
  saveFile();
  updatePalette();
}

init();
