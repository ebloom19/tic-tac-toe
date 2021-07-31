let board = document.getElementById('game-board').children;
console.log(board);

for (let selection of board) {
    selection.addEventListener('click', addMove);
}


const piece = document.getElementById('user-choice');
piece.addEventListener('click', selection);

let userChoice = '';
function selection() {
    const selectedPiece = document.querySelectorAll('input[name="checker"]');
    for (let i of selectedPiece) {
        if (i.checked) {
            userChoice = i.value;
            console.log("User choose " + userChoice);
            return;
        }
    }

}


function addMove(event) {
    event.target.children[0].classList.add('selected');

    let move = event.target.children[0];
    move.innerText = userChoice; // To put piece element here


}

const checkedBoxes = document.getElementsByClassName('');