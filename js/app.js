/*-------------------------------- Constants --------------------------------*/

const arrayBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/*---------------------------- Variables (state) ----------------------------*/

let playerTurn = true // True === X && False === O
let isGameStopped = false;
let winningCombos = [];

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset-button');
const headerMessage = document.getElementById('message');

/*----------------------------- Event Listeners -----------------------------*/

board.addEventListener("click", handleClick);
resetButton.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

//Initializes the game with default values
function init() {

  // Re-assigns values so Player X turn is explicit
  playerTurn = true;
  isGameStopped = false;
  headerMessage.innerText = "Player's X Turn";

  // Re-assigns the array values to 0
  for (let i = 0; i<arrayBoard.length; i++ ) {
    arrayBoard[i] = 0;
  } 

  // Clears innerText of the squares
  squares.forEach(square => {
    square.innerHTML = '';
  });
};

// Handles click events
function handleClick(evt) {
  // If game is not stopped, allow process
  if(!isGameStopped){
    if (evt.target.innerText === '') {
      render(evt);
      playerTurn = !playerTurn; //Flip boolean
    }
  };
  
};

// Modifies most of the game visuals
function render(evt) {

  if (playerTurn) {
    evt.target.innerHTML = '<img class="animated-x" src="resource/gif/animatedX.gif" alt="X" />';
    headerMessage.innerText = "Player's O Turn";
    let nodeIndex = parseNodeIndex(evt.target);
    arrayBoard[nodeIndex] = 1;
  } else{
    evt.target.innerHTML = '<img class="animated-o" src="resource/gif/animatedCircle.gif" alt="X" />';
    headerMessage.innerText = "Player's X Turn";
    let nodeIndex = parseNodeIndex(evt.target);
    arrayBoard[nodeIndex] = -1;
  };

  checkGameStatus();

  //Check if a tie has occured
  if (!isGameStopped) {
    let isBoardFilled = arrayBoard.every( square => {
      return square !== 0;
    });
    if(isBoardFilled) {
      isGameStopped = true;
      headerMessage.innerText = "Game ended in a tie!!!";
    };
  };
};

// Parses Square ID's for index
function parseNodeIndex(element) {
  return parseInt(element.id.slice(-1));
};

// Checks if there is a winner and proceeds to end game if true
function checkGameStatus() {
  // Updates the array to check values
  winningCombos = [
    [arrayBoard[0], arrayBoard[1],arrayBoard [2]],
    [arrayBoard[3], arrayBoard[4],arrayBoard [5]],
    [arrayBoard[6], arrayBoard[7],arrayBoard [8]],
    [arrayBoard[0], arrayBoard[3],arrayBoard [6]],
    [arrayBoard[1], arrayBoard[4],arrayBoard [7]],
    [arrayBoard[2], arrayBoard[5],arrayBoard [8]],
    [arrayBoard[0], arrayBoard[4],arrayBoard [8]],
    [arrayBoard[2], arrayBoard[4],arrayBoard [6]]
  ];

  switch(playerTurn){
    case true:
      if ( winningCombos.some( combo => { return combo[0] + combo[1] + combo[2] === 3; })) {
        isGameStopped = true; 
        headerMessage.innerText = "Player X is the Winner!!!";
      }
      break;
    case false:
      if ( winningCombos.some( combo => { return combo[0] + combo[1] + combo[2] === -3; })) {
        isGameStopped = true; 
        headerMessage.innerText = "Player O is the Winner!!!";
      }
      break;
    default:
      break;
  }
};