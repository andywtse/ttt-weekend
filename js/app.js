/*-------------------------------- Constants --------------------------------*/

const arrayBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/*---------------------------- Variables (state) ----------------------------*/

let playerTurn = true // True === X && False === O

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset-button');
const headerMessage = document.getElementById('message');

/*----------------------------- Event Listeners -----------------------------*/

board.forEach(function (squares) {
  squares.addEventListener('click', handleClick);
});
resetButton.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

function init() {
  playerTurn = true;
  headerMessage.innerText = "Player's X Turn";

  arrayBoard.forEach(element => {
    element = null;
  });
  board.forEach(square => {
    square.innerText = '';
  });
  


};

function handleClick(evt) {

  if (evt.target.innerText === '') {
    render(evt);
    playerTurn = !playerTurn; //Flip boolean
  }
  
};

function render(evt) {

  if (playerTurn) {
    evt.target.innerText = 'X';
    headerMessage.innerText = "Player's O Turn";
    let nodeIndex = parseNodeIndex(evt.target);
    arrayBoard[nodeIndex] = 1;
  } else{
    evt.target.innerText = 'O';
    headerMessage.innerText = "Player's X Turn";
    let nodeIndex = parseNodeIndex(evt.target);
    arrayBoard[nodeIndex] = -1;
  }

};

function parseNodeIndex(element) {
  //console.log(element.id.slice(-1))
  return parseInt(element.id.slice(-1));
};

function checkWinner() {

};