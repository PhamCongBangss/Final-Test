const btnStartStop = document.querySelector(".start-stop");
const note = document.querySelector(".note");
const showTime = document.querySelector(".clock-time");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const box6 = document.querySelector(".box6");
const box7 = document.querySelector(".box7");
const box8 = document.querySelector(".box8");
const box9 = document.querySelector(".box9");
const box10 = document.querySelector(".box10");
const box11 = document.querySelector(".box11");
const boxBlack = document.querySelector(".box-black");
const record = document.querySelector(".record");
const boxes = [
  box1,
  box2,
  box3,
  box4,
  box5,
  box6,
  box7,
  box8,
  box9,
  box10,
  box11,
  boxBlack,
];

function updateTime() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  showTime.innerText = minutes + ":" + seconds;
  time++;
}

function recordTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

function shuffle(position) {
  const positionCopy = [...position];
  const shuffled = [];
  while (positionCopy.length > 0) {
    let randomIndex = Math.floor(Math.random() * positionCopy.length);
    shuffled.push(positionCopy[randomIndex]);
    positionCopy.splice(randomIndex, 1);
  }
  return shuffled;
}

function checkWin() {
  for (let i = 0; i < 12; i++) {
    if (
      boxes[i].style.gridRow != position[i][0] ||
      boxes[i].style.gridColumn != position[i][1]
    )
      return false;
  }
  return true;
}

const position = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
];

let numberPlay = 1;
let time = 0;
let step = 0;
let timer;
let stage = "start";

btnStartStop.addEventListener("click", function () {
  if (stage === "reset") {
    note.classList.add("invisible");
    stage = "start";
  }

  if (stage === "start") {
    btnStartStop.innerText = "Kết thúc";
    btnStartStop.style.backgroundColor = "red";
    note.classList.add("invisible");
    updateTime();
    timer = setInterval(updateTime, 1000);
    let shuffled = [...position];
    shuffled = [...shuffle(position)];
    for (let i = 0; i < 99; i++) {
      shuffled = [...shuffle(shuffled)];
    }
    for (let i = 0; i < 12; i++) {
      boxes[i].style.gridRow = `${shuffled[i][0]}`;
      boxes[i].style.gridColumn = `${shuffled[i][1]}`;
    }
    stage = "playing";
    return;
  }

  if (stage === "playing") {
    btnStartStop.innerText = "Bắt đầu";
    btnStartStop.style.backgroundColor = "green";
    note.classList.remove("invisible");
    note.innerText = "Game reset!";
    clearInterval(timer);
    time = 0;
    updateTime();
    time = 0;
    step = 0;
    let shuffled = [...position];
    for (let i = 0; i < 12; i++) {
      boxes[i].style.gridRow = `${shuffled[i][0]}`;
      boxes[i].style.gridColumn = `${shuffled[i][1]}`;
    }
    stage = "reset";
    return;
  }

  if (stage === "won") {
    note.classList.add("invisible");
    updateTime();
    stage = "afterWon";
    return;
  }

  if (stage === "afterWon") {
    stage = "reset";
    btnStartStop.innerText = "Bắt đầu";
    btnStartStop.style.backgroundColor = "green";
    note.innerText = "Game reset!";
    note.classList.remove("invisible");
    return;
  }
});

document.addEventListener("keydown", function (e) {
  if (stage !== "playing") return;
  if (e.key === "a" || e.key === "A" || e.key == "ArrowLeft") {
    if (boxBlack.style.gridColumn !== "1") {
      boxes.find(
        (box) =>
          box.style.gridRow == boxBlack.style.gridRow &&
          box.style.gridColumn == boxBlack.style.gridColumn - 1
      ).style.gridColumn = boxBlack.style.gridColumn;
      boxBlack.style.gridColumn = `${boxBlack.style.gridColumn - 1}`;
      step += 1;
    }
  }

  if (e.key === "d" || e.key === "D" || e.key == "ArrowRight") {
    if (boxBlack.style.gridColumn !== "4") {
      boxes.find(
        (box) =>
          box.style.gridRow == boxBlack.style.gridRow &&
          box.style.gridColumn == Number(boxBlack.style.gridColumn) + 1
      ).style.gridColumn = boxBlack.style.gridColumn;
      boxBlack.style.gridColumn = `${Number(boxBlack.style.gridColumn) + 1}`;
      step += 1;
    }
  }

  if (e.key === "W" || e.key === "w" || e.key == "ArrowUp") {
    if (boxBlack.style.gridRow !== "1") {
      boxes.find(
        (box) =>
          box.style.gridColumn == boxBlack.style.gridColumn &&
          box.style.gridRow == boxBlack.style.gridRow - 1
      ).style.gridRow = boxBlack.style.gridRow;
      boxBlack.style.gridRow = `${boxBlack.style.gridRow - 1}`;
      step += 1;
    }
  }

  if (e.key === "s" || e.key === "S" || e.key == "ArrowDown") {
    if (boxBlack.style.gridRow !== "3") {
      boxes.find(
        (box) =>
          box.style.gridColumn == boxBlack.style.gridColumn &&
          box.style.gridRow == Number(boxBlack.style.gridRow) + 1
      ).style.gridRow = boxBlack.style.gridRow;
      boxBlack.style.gridRow = `${Number(boxBlack.style.gridRow) + 1}`;
      step += 1;
    }
  }
  if (checkWin()) {
    note.innerText = "YOU WIN!";
    note.classList.remove("invisible");
    stage = "won";
    record.innerHTML += `<div class="result"><p>${numberPlay}</p></div>
    <div class="result"><p>${step}</p></div>
    <div class="result"><p>${recordTime(time - 1)}</p></div>`;
    clearInterval(timer);
    time = 0;
    numberPlay += 1;
    step = 0;
  }
});
