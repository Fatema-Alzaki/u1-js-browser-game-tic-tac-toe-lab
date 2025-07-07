/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.getElementById('reset')

/*-------------------------------- Functions --------------------------------*/

function render() {
  updateBoard()
  updateMessage()
}

function updateBoard() {
  board.forEach((value, index) => {
    squareEls[index].textContent = value
  })
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `Turn: ${turn}`
  } else if (!winner && tie) {
    messageEl.textContent = "Tie game!"
  } else {
    messageEl.textContent = `Winner: ${turn}`
  }
}

function init() {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  console.log('Game initialized')
  render()
}

function handleClick(evt) {
  const clickedEl = evt.target
  if (!clickedEl.classList.contains('sqr')) return

  const squareIndex = parseInt(clickedEl.id)
  if (board[squareIndex] || winner) return

  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

function placePiece(index) {
  board[index] = turn
  console.log(board)
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true
      break
    }
  }
  console.log('Winner:', winner)
}

function checkForTie() {
  if (winner) return
  tie = board.every(cell => cell !== '')
  console.log('Tie:', tie)
}

function switchPlayerTurn() {
  if (winner) return
  turn = turn === 'X' ? 'O' : 'X'
  console.log('Turn switched to:', turn)
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)

init()
