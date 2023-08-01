document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let currentPlayer = "X";
  let isGameActive = true;

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });

  function handleClick(event) {
    if (!isGameActive) return;
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (cell.dataset.cell !== "") return;

    cell.textContent = currentPlayer;
    cell.dataset.cell = currentPlayer;

    if (checkWin(currentPlayer)) {
      endGame(false);
    } else if (isBoardFull()) {
      endGame(true);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (currentPlayer === "O") {
        // AI's turn
        setTimeout(aiMove, 300);
      }
    }
  }

  function aiMove() {
    const bestMove = minimax(cells, "O").index;
    cells[bestMove].click();
  }

  function checkWin(player) {
    return winCombos.some((combo) =>
      combo.every((index) => cells[index].dataset.cell === player)
    );
  }

  function isBoardFull() {
    return Array.from(cells).every((cell) => cell.dataset.cell !== "");
  }

  function endGame(draw) {
    isGameActive = false;
    if (draw) {
      alert("It's a draw!");
    } else {
      alert(currentPlayer + " wins!");
    }
  }

  function minimax(newBoard, player) {
    const availableCells = Array.from(newBoard).filter(
      (cell) => cell.dataset.cell === ""
    );

    if (checkWin("X")) {
      return { score: -10 };
    } else if (checkWin("O")) {
      return { score: 10 };
    } else if (availableCells.length === 0) {
      return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availableCells.length; i++) {
      let move = {};
      move.index = Array.from(newBoard).indexOf(availableCells[i]);
      newBoard[move.index].dataset.cell = player;

      if (player === "O") {
        let result = minimax(newBoard, "X");
        move.score = result.score;
      } else {
        let result = minimax(newBoard, "O");
        move.score = result.score;
      }

      newBoard[move.index].dataset.cell = "";
      moves.push(move);
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }
});
