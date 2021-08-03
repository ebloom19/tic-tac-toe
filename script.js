


const piece = document.getElementById('user-choice');
piece.addEventListener('click', selection);

let playerOne = '';
let playerTwo = '';
function selection() {
    const selectedPiece = document.querySelectorAll('input[name="checker"]');
    for (let i of selectedPiece) {
        if (i.checked) {
            let chooseYourPiece = document.getElementById('player-text');
            if (playerOne == 'X' || playerOne == 'O') {
                playerTwo = i.value;
                if (playerOne === playerTwo) {
                    alert("Player one has already selected " + playerOne);
                    return;
                }
                console.log("Player 2 choose " + playerTwo);
                chooseYourPiece.innerText = '';
                const hideChoice = document.getElementById('select-piece');
                hideChoice.setAttribute('style', 'display: none;');
                moves(playerOne, playerTwo);
                return;
            }
            playerOne = i.value;
            console.log("Player 1 choose " + playerOne);

            chooseYourPiece.innerText = 'Player 2 choose your piece';
            return;
        }
    }

}


let numberOfMoves = 0;
let currentPlayer = '';
function moves() {
    let board = document.getElementById('game-board').children;
    console.log(board);
    
    for (let selection of board) {
        selection.addEventListener('click', addMove);
    }

    let chooseYourPiece = document.getElementById('player-text');
    if (numberOfMoves < 9 && numberOfMoves % 2 === 0) {
        chooseYourPiece.innerText = 'Player 1 make your move';
        currentPlayer = playerOne;
        check();
    } else {
        chooseYourPiece.innerText = 'Player 2 make your move';
        currentPlayer = playerTwo;
        check();
    }
}

function addMove(event) {
    event.target.children[0].setAttribute('class', 'selected');
    numberOfMoves = numberOfMoves + 1;

    let move = event.target.children[0];
    move.innerText = currentPlayer; 
    console.log('number of moves ' + numberOfMoves);
    moves();

}


// Bugs to fix:
// End game after a player wins

// Functionality to add:
// Tally number of wins for each player

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

    console.log("Checked boxes location: " + checkedBoxes + ' ' + piecesSelected);


    function checkForWin(p1, p2, p3) {
        if (checkedBoxes.includes(p1) === true && checkedBoxes.includes(p2) === true && checkedBoxes.includes(p3) === true) {
            const index1 = checkedBoxes.indexOf(p1);
            const index2 = checkedBoxes.indexOf(p2);
            const index3 = checkedBoxes.indexOf(p3);
            if (piecesSelected[index1] == piecesSelected[index2] && piecesSelected[index2] == piecesSelected[index3]) {
                let winner = piecesSelected[index1];
                if (numberOfMoves % 2 === 0) {
                    alert("Player 2 wins!!");
                } else {
                    alert("Player 1 wins!!");
                }
            }
        }
    }

    // Win column 1
    checkForWin('r1c1', 'r2c1', 'r3c1');
    // Win column 2
    checkForWin('r1c2', 'r2c2', 'r3c2');
    // Win column 3
    checkForWin('r1c3', 'r2c3', 'r3c3');
    // Win row 1
    checkForWin('r1c1', 'r1c2', 'r1c3');
    // Win row 2
    checkForWin('r2c1', 'r2c2', 'r2c3');
    // Win row 3
    checkForWin('r3c1', 'r3c2', 'r3c3');
    // Win diagonal left to right
    checkForWin('r1c1', 'r2c2', 'r3c3');
    // Win diagonal right to left
    checkForWin('r1c3', 'r2c2', 'r3c1');
}

