let board = document.getElementById('game-board').children;
console.log(board);

for (let selection of board) {
    selection.addEventListener('click', addMove);
}

function addMove(event, piece) {
    event.target.children[0].classList.add('selected');

    let move = event.target.children[0];
    move.innerText = 'X'; // To put piece element here


}