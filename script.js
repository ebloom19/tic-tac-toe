let board = document.getElementById('game-board').children;
console.log(board);

for (let selection of board) {
    selection.addEventListener('click', addMove);
}


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
    let chooseYourPiece = document.getElementById('player-text');
    if (numberOfMoves < 9 && numberOfMoves % 2 === 0) {
        chooseYourPiece.innerText = 'Player 1 make your move';
        currentPlayer = playerOne;
    } else {
        chooseYourPiece.innerText = 'Player 2 make your move';
        currentPlayer = playerTwo;
    }
}




function addMove(event) {
    event.target.children[0].classList.add('selected');
    numberOfMoves = numberOfMoves + 1;

    let move = event.target.children[0];
    move.innerText = currentPlayer; // To put piece element here
    console.log('number of moves ' + numberOfMoves);
    moves();


}

const checkedBoxes = document.getElementsByClassName('');