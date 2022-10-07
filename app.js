// DOM references and consts
const board = document.getElementById("board");
const winner = document.getElementById("winner");
const restartButton = document.querySelector(".restartButton");
const draw = document.getElementById("draw")
const submitButton = document.querySelector("submitButton")


// game state
let gameState = {
    board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
            ],
    playerName: "",
    gameOver: false,
    currentPlayer: 'x',
    winner: null,
    isDraw: false,
};

// functions

// board 
function makeBoard() {
    for (let i = 0; i < 3; i++){
      for (let j =0; j < 3; j++){
        const cell = document.createElement('div')
        cell.classList.add("cell")
        cell.id = `${i}-${j}`
        board.appendChild(cell)
      }
    }
}

makeBoard()

// player turn 
function playerTurn(event) {
for (let i = 0; i < 3; i++){
  for (let j =0; j < 3; j++){
  let cell = `${i}-${j}`;
  if(event.target.id === cell){
    if (gameState.currentPlayer === 'x') {
      gameState.currentPlayer = 'o'
     }else {
      gameState.currentPlayer = 'x'
    }
  cell = document.getElementById(cell);
  cell.innerText = `${gameState.currentPlayer}`;
  }
  }
 }
}

// checking board for winning combinations
function checkRows(){
  for (let i = 0; i < 3; i++){
    if (gameState.board[0][i] !== null &&
      gameState.board[0][i] === gameState.board[1][i] &&
      gameState.board[1][i] === gameState.board[2][i]
      ){
  
  gameState.winner = gameState.board[0][i]
      }
    }
}

function checkColumns() {
  for (let i = 0; i < 3; i++){
    if (gameState.board[i][0] !== null &&
      gameState.board[i][0] === gameState.board[i][1] &&
      gameState.board[i][1] === gameState.board[i][2]
      ){
  
  gameState.winner = gameState.board[i][0]
      }
    }
}

function checkDiagnolly () {
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[0][i] !== null &&
      gameState.board[0][0] === gameState.board[1][1] &&
      gameState.board[1][1] === gameState.board[2][2]
    ) {
      gameState.winner = gameState.board[1][1]
    } else if (
      gameState.board[0][i] !== null &&
      gameState.board[0][2] === gameState.board[1][1] &&
      gameState.board[1][1] === gameState.board[2][0]
    ) {
      gameState.winner = gameState.board[1][1]
    }
  }
}

function checkWin() {
checkColumns()
checkRows()
checkDiagnolly()
}

// checking board for draws
function checkDraw() {
  const nulls = []
  for (let i = 0; i < 3; i++){
    for (let j =0; j < 3; j++){
    if (gameState.board[i][j] === null) {
      nulls.push(null)
    }
  }
}
  
  if (nulls.length === 0){
    gameState.isDraw = true;
  }
}
// game end
function gameWon() {
  if (typeof gameState.winner === 'string' ){
    winner.innerText = `${gameState.currentPlayer} won!`;
  }
}

function gameDraw() {
  if (gameState.isDraw === true){
    draw.innerText = `draw!`;
  }
}


// event listeners
board.addEventListener("click", function (e){
  const row = e.target.id[0]
  const col = e.target.id[2]
  if (gameState.board [row][col] === null) {
  gameState.board[row][col] = gameState.currentPlayer;
  
    console.log(gameState.board[row][col]);
    const index = e.target.id;
    playerTurn(e)
    checkWin();
    checkDraw();
    gameWon();
    gameDraw();
  }

    console.log("gameState:", gameState)
})


restartButton.addEventListener('click', function(){
    window.location.reload();

});
