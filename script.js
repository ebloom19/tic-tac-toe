// Declaring elements and their default values (If used multiple times throughout the code)
let playerOne = 'X';
let playerTwo = 'O';
let numberOfMoves = 0;
let currentPlayer = '';
let p1Wins = 0;
let p2Wins = 0;

let board = document.getElementById('game-board').children;
let resultsText = document.getElementById('player-text');
let getCheckedBoxes = document.getElementsByClassName('selected');
let playerTwoStarted = false

const start = document.getElementById('begin');
start.addEventListener('click', moves);

// Function to alternate between players and allow the users to make their move
function moves() {
    start.setAttribute('style', 'display: none');
    
    // Adds an event listener to all boxes
    for (let grid of board) {
        grid.addEventListener('click', addMove);
    }

    if (numberOfMoves < 9 && numberOfMoves % 2 === 0) {
        resultsText.innerText = 'Player 1 make your move';
        currentPlayer = playerOne;
        check();
    } else {
        resultsText.innerText = 'Player 2 make your move';
        currentPlayer = playerTwo;
        check();
    }
}

// This function displays the players move on the board
// Uses the event as an argument to locate the selected box
function addMove(event) {
    event.target.removeEventListener('click', addMove);
    event.target.children[0].setAttribute('class', 'selected');
    numberOfMoves = numberOfMoves + 1;
    let move = event.target.children[0];
    move.innerText = currentPlayer; 
    moves();
}


// This function checks the status of the board (What has been entered and where)
// Fills the checkedGridLocation array with the box locations that contains a move
// Fills the piecesSelected array with the pieces entered
function check() {
    let checkedGridLocation = [];
    let piecesSelected = [];
    for (let selected of getCheckedBoxes) {
        let boxes = selected.parentElement.id;
        checkedGridLocation.unshift(boxes);
        let piece = selected.parentElement.innerText;
        piecesSelected.unshift(piece);
    }

    // Function to check for a winning match
    // Takes three box positions as arguments and checks if they have been selected, and if so are they the same value.
    function checkForWin(p1, p2, p3) {
        // Checks to see if the locations include entries
        if (checkedGridLocation.includes(p1) && checkedGridLocation.includes(p2) && checkedGridLocation.includes(p3)) {
            const index1 = checkedGridLocation.indexOf(p1);
            const index2 = checkedGridLocation.indexOf(p2);
            const index3 = checkedGridLocation.indexOf(p3);
            // Checks to see if the pieces within the selected boxes are equal
            if (piecesSelected[index1] == piecesSelected[index2] && piecesSelected[index2] == piecesSelected[index3]) {
                
                let firstMatch = document.getElementById(p1);
                let secondMatch = document.getElementById(p2);
                let thirdMatch = document.getElementById(p3);

                firstMatch.setAttribute('style', 'color: #006400');
                secondMatch.setAttribute('style', 'color: #006400');
                thirdMatch.setAttribute('style', 'color: #006400');

                let displayP1Score = document.getElementById('player-one-score');
                let displayP2Score = document.getElementById('player-two-score');

                // If the number of moves is even then playerTwo wins vice versa
                if (numberOfMoves % 2 === 0) {
                    p2Wins = p2Wins + 1;
                    resultsText.innerText = 'Player 2 wins!';
                } else {
                    p1Wins = p1Wins + 1;
                    resultsText.innerText  = 'Player 1 wins!';
                }                

                let playerOneScoreElement = document.createElement('p');
                playerOneScoreElement.setAttribute('id', 'p1-score')
                playerOneScoreElement.innerText = '= ' + p1Wins;

                let playerTwoScoreElement = document.createElement('p');
                playerTwoScoreElement.setAttribute('id', 'p2-score');
                playerTwoScoreElement.innerText = '= ' + p2Wins;

                let playerOneScoreLocation = document.getElementById('p1-score');
                let playerTwoScoreLocation = document.getElementById('p2-score');

                // If p1-score or p2-score already exists add new score instead of appending a new element
                if(document.getElementById('p1-score')!== null || document.getElementById('p2-score') !== null) {
                    playerOneScoreLocation.innerText = ' = ' + p1Wins;
                    playerTwoScoreLocation.innerText = ' = ' + p2Wins;
                } else {
                    displayP1Score.append(playerOneScoreElement);
                    displayP2Score.append(playerTwoScoreElement);
                }
                
                // Sets the highest scoring player to green and lowwest to red
                if (p1Wins > p2Wins) {
                    displayP1Score.setAttribute('style', 'color: green;');
                    displayP2Score.setAttribute('style', 'color: red;');
                } else if (p1Wins < p2Wins) {
                    displayP1Score.setAttribute('style', 'color: red;');
                    displayP2Score.setAttribute('style', 'color: green;');
                } else {
                    displayP1Score.setAttribute('style', 'color: black;');
                    displayP2Score.setAttribute('style', 'color: black;');
                }

                // Ensures the player cannot continue to click on a box after a win
                for (let selection of board) {
                    selection.removeEventListener('click', addMove);
                }
                tryAgain();
                return true;
            }
        }
        return false;
    }

    // Appends play again button 
    function tryAgain() {
        // If play again button already exists do nothing (Stops multiple buttons appearing)
        if (document.getElementById('play-again') !== null) {
            //
        } else {
            let startButtonLocation = document.getElementById('select-piece');
            let playAgain = document.createElement('button');
            playAgain.innerText = 'Play Again';
            playAgain.setAttribute('id', 'play-again');
            playAgain.setAttribute('class', 'buttons');
            startButtonLocation.append(playAgain);
            playAgain.addEventListener('click', refresh);        
        }
    }

    // Function clears the board to its default state & sets the next first player
    function refresh() {
        resultsText.setAttribute('style', 'color: black');
        let numberOfGames = p1Wins + p2Wins;

        // Add alternating first player between games functionality
        if (numberOfGames % 2 === 0) {
            numberOfMoves = 0;
            playerTwoStarted = false;
            currentPlayer = playerOne;
            resultsText.innerText = 'Player 1 make your move';
        } else {
            numberOfMoves = -1;
            playerTwoStarted = true;
            currentPlayer = playerTwo;
            resultsText.innerText = 'Player 2 make your move';
        }

        for (let selection of board) {
            selection.addEventListener('click', addMove);
        }

        // Ensures the enire board is cleared and returned to default state
        while (getCheckedBoxes.length > 0) {
            for (let remove of getCheckedBoxes) {
                remove.innerText = '';
                remove.parentElement.removeAttribute('style');
                remove.removeAttribute('class');
                remove.setAttribute('class', 'default');
            }
        }
    }

    // Winning matches [column 1, column 2, column 3, row 1, row 2, row 3, diagonal left to right, diagonal right to left]
    let winningInstances = [['r1c1', 'r2c1', 'r3c1'], ['r1c2', 'r2c2', 'r3c2'], ['r1c3', 'r2c3', 'r3c3'], ['r1c1', 'r1c2', 'r1c3'], ['r2c1', 'r2c2', 'r2c3'], ['r3c1', 'r3c2', 'r3c3'], ['r1c1', 'r2c2', 'r3c3'], ['r1c3', 'r2c2', 'r3c1']];
    for (let instance of winningInstances) {
        let hasWinner = checkForWin(instance[0], instance[1], instance[2]);
        if (hasWinner) {
            break;
        }
    }

        // To check for draw (If player two has started number of moves starts on -1)
        if (numberOfMoves == 8 && playerTwoStarted || numberOfMoves == 9 && !playerTwoStarted) {
            for (let selection of board) {
                selection.removeEventListener('click', addMove);
            }
            // Stops draw text from showing if player wins 2 in a row and thinks its a draw
            if (resultsText.innerHTML === 'Player 1 wins!' || resultsText.innerText === 'Player 2 wins!') {
                //
            } else {
                resultsText.setAttribute('style', 'color: red');
                resultsText.innerText = 'Draw! Want to play again?';
            }
            tryAgain();
        }
}