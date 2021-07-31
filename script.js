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
                console.log("Player 2 choose " + playerTwo);
                chooseYourPiece.innerText = '';
                const hideChoice = document.getElementById('select-piece');
                hideChoice.setAttribute('style', 'display: none;');
                return;
            }
            playerOne = i.value;
            console.log("Player 1 choose " + playerOne);

            chooseYourPiece.innerText = 'Player 2 choose your piece';
            return;
        }
    }

}


function addMove(event) {
    event.target.children[0].classList.add('selected');

    let move = event.target.children[0];
    move.innerText = 'X'; // To put piece element here


}

const checkedBoxes = document.getElementsByClassName('');