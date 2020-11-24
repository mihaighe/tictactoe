const cellElements = document.querySelectorAll("[data-cell]");
const text = document.getElementById("text");

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

document.addEventListener("keydown", handleKeydown);

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const NUMERICAL_KEYBOARD = [undefined, 6, 7, 8, 3, 4, 5, 0, 1, 2];

const X_CLASS = "x";
const O_CLASS = "o";

let xTurn = true;

function handleKeydown(event) {
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  cell = NUMERICAL_KEYBOARD[event.key];

  if (cell != undefined) {
    if (isEmpty(cell)) {
      cellElements[cell].removeEventListener("click", handleClick, {
        once: true,
      });

      placeMark(cellElements[cell], currentClass);

      if (checkWin(currentClass)) {
        stopGame(xTurn);
        xTurn = undefined;
      }

      swapTurns(xTurn);
      setBoardHoverClass();
    }
  }
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    stopGame(xTurn);
    xTurn = undefined;
  }

  swapTurns(xTurn);
  setBoardHoverClass();
}

function isEmpty(key) {
  return !(
    cellElements[key].classList.contains("x") ||
    cellElements[key].classList.contains("o")
  );
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

  xTurn ? (text.innerText = "Winner: X") : (text.innerText = "Winner: O");
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
