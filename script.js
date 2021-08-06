const start = document.getElementById('begin');
start.addEventListener('click', moves);

// Creating elements and their default values
let playerOne = 'X';
let playerTwo = 'O';
let numberOfMoves = 0;
let currentPlayer = '';
let p1Wins = 0;
let p2Wins = 0;

let board = document.getElementById('game-board').children;
let playerTwoStarted = false


// Function to alternate between players and allow the users to make their move
function moves() {
    start.setAttribute('style', 'display: none');
    
    // Adds an event listener to all boxes
    for (let selection of board) {
        selection.addEventListener('click', addMove);
    }

    let chooseYourPieceElement = document.getElementById('player-text');
    if (numberOfMoves < 9 && numberOfMoves % 2 === 0) {
        chooseYourPieceElement.innerText = 'Player 1 make your move';
        currentPlayer = playerOne;
        check();
    } else {
        chooseYourPieceElement.innerText = 'Player 2 make your move';
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
    console.log('number of moves ' + numberOfMoves);
    moves();
}


// This function checkes the status of the board (What has been entered and where)
// Fills the checkedBoxes array with the box locations that contains a move
// Fills the piecesSelected array with the pieces entered

function check() {
    let checkedBoxes = [];
    let piecesSelected = [];
    let getCheckedBoxes = document.getElementsByClassName('selected');
    for (let selected of getCheckedBoxes) {
        let boxes = selected.parentElement.id;
        checkedBoxes.unshift(boxes);
        let piece = selected.parentElement.innerText;
        piecesSelected.unshift(piece);
    }

    // Function to check for a winning match
    // Takes three box positions as arguments and checks if they have been selected, and if so are they the same value.
    function checkForWin(p1, p2, p3) {

        if (checkedBoxes.includes(p1) === true && checkedBoxes.includes(p2) === true && checkedBoxes.includes(p3) === true) {
            const index1 = checkedBoxes.indexOf(p1);
            const index2 = checkedBoxes.indexOf(p2);
            const index3 = checkedBoxes.indexOf(p3);
            // Checks to see if the pices wihtin the selcted boxes are equal
            if (piecesSelected[index1] == piecesSelected[index2] && piecesSelected[index2] == piecesSelected[index3]) {
                
                let a = document.getElementById(p1);
                let b = document.getElementById(p2);
                let c = document.getElementById(p3);

                a.setAttribute('style', 'color: #006400');
                b.setAttribute('style', 'color: #006400');
                c.setAttribute('style', 'color: #006400');

                // If the number of moves is even then playerTwo wins vice versa
                let displayWinner = document.getElementById('player-text');

                let displayP1Score = document.getElementById('player-one-score');
                let displayP2Score = document.getElementById('player-two-score');

                if (numberOfMoves % 2 === 0) {
                    p2Wins = p2Wins + 1;
                    sessionStorage.setItem('p2Wins', p2Wins);
                    displayWinner.innerText = 'Player 2 wins!';
                } else {
                    p1Wins = p1Wins + 1;
                    displayWinner.innerText  = 'Player 1 wins!';
                }
                

                let playerOneScoreElement = document.createElement('p');
                playerOneScoreElement.setAttribute('id', 'p1-score')
                playerOneScoreElement.innerText = '= ' + p1Wins;

                let playerTwoScoreElement = document.createElement('p');
                playerTwoScoreElement.setAttribute('id', 'p2-score');
                playerTwoScoreElement.innerText = '= ' + p2Wins;

                let playerOneScoreLocation = document.getElementById('p1-score');
                let playerTwoScoreLocation = document.getElementById('p2-score');
                if(document.getElementById('p1-score')!== null || document.getElementById('p2-score') !== null) {
                    playerOneScoreLocation.innerText = ' = ' + p1Wins;
                    playerTwoScoreLocation.innerText = ' = ' + p2Wins;
                } else {
                    displayP1Score.append(playerOneScoreElement);
                    displayP2Score.append(playerTwoScoreElement);
                }
                
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
            } 
        }
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
        let refreshAll = document.getElementsByClassName('selected');
        let displayWinner = document.getElementById('player-text');
        displayWinner.setAttribute('style', 'color: black');

        // Add alternating first player between games functionality
        let numberOfGames = p1Wins + p2Wins;

        if (numberOfGames % 2 === 0) {
            numberOfMoves = 0;
            playerTwoStarted = false;
            currentPlayer = playerOne;
            displayWinner.innerText = 'Player 1 make your move';
        } else {
            numberOfMoves = -1;
            playerTwoStarted = true;
            currentPlayer = playerTwo;
            displayWinner.innerText = 'Player 2 make your move';
        }

        for (let selection of board) {
            selection.addEventListener('click', addMove);
        }

        // Ensures the enire board is cleared and returned to default state
        while (refreshAll.length > 0) {
            for (let remove of refreshAll) {
                remove.innerText = '';
                remove.parentElement.removeAttribute('style');
                remove.removeAttribute('class');
                remove.setAttribute('class', 'default');
            }
        }
    }


    let winningInstances = [['r1c1', 'r2c1', 'r3c1'], ['r1c2', 'r2c2', 'r3c2'], ['r1c3', 'r2c3', 'r3c3'], ['r1c1', 'r1c2', 'r1c3'], ['r2c1', 'r2c2', 'r2c3'], ['r3c1', 'r3c2', 'r3c3'], ['r1c1', 'r2c2', 'r3c3'], ['r1c3', 'r2c2', 'r3c1']];
    // Win column 1 [column 1, column 2, column 3, row 1, row 2, row 3, diagonal left to right, diagonal right to left]
        
    for (let instance of winningInstances) {
        checkForWin(instance[0], instance[1], instance[2]);
    }
        // To check for draw
        if (numberOfMoves == 8 && playerTwoStarted == true) {
            let displayWinner = document.getElementById('player-text');
            displayWinner.setAttribute('style', 'color: red');
            displayWinner.innerText = 'Draw! Want to play again?';
            for (let selection of board) {
                selection.removeEventListener('click', addMove);
            }
            tryAgain();
        }

}

// Bugs to fix:




