const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

const X_CLASS = "x";
const O_CLASS = "o";

let xTurn = "true";

function handleClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  cell.classList.add(currentClass);
  xTurn = !xTurn;
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
}
