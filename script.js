const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

document.addEventListener("keydown", handleKeydown);

const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const KEYS = [undefined, 6, 7, 8, 3, 4, 5, 0, 1, 2];

const X_CLASS = "x";
const O_CLASS = "o";

let xTurn = true;

function handleKeydown(e) {
  key = e.key;
  console.log(KEYS[key]);
  const currentClass = xTurn ? X_CLASS : O_CLASS;

  if (checkWin(currentClass)) {
    console.log(`stop game ${currentClass}`);
    stopGame(xTurn);
    xTurn = undefined;
  }

  if (KEYS[key] != undefined) {
    placeMark(cellElements[KEYS[key]], currentClass);
    swapTurns(xTurn);
    setBoardHoverClass();
  }
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    stopGame(xTurn);
    xTurn = undefined;
  }

  swapTurns(xTurn);
  setBoardHoverClass();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  if (xTurn != undefined) {
    xTurn = !xTurn;
  }
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) {
    board.classList.add(X_CLASS);
  } else if (xTurn === false) {
    board.classList.add(O_CLASS);
  } else if (xTurn === undefined) {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
  }
}

function stopGame(xTurn) {
  cellElements.forEach((cell) => {
    cell.removeEventListener("click", handleClick, { once: true });
    cell.style.cursor = "not-allowed";
  });
  document.removeEventListener("keydown", handleKeydown);

  xTurn ? console.log("x wins") : console.log("o wins");
}

function checkWin(currentClass) {
  console.log("///////////////////////////////////");
  console.log(`searching for ${currentClass}`);
  console.log("///////////////////////////////////");
  myBoolean = WINNING_COMBINATION.some((combination) => {
    console.log(combination);
    return combination.every((index) => {
      console.log(cellElements);
      return cellElements[index].classList.contains(currentClass);
    });
  });
  console.log(myBoolean);
  return myBoolean;
}
