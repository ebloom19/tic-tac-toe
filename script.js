

// Find enter button
const piece = document.getElementById('user-choice');
// Add on click event listener to the enter button
piece.addEventListener('click', selection);

// Setting blank PlayerOne & PlayerTwo elements
let playerOne = '';
let playerTwo = '';

// Function to check for PlayerOne & PlayerTwo piece selection
function selection() {
    // Locates radio elements
    const selectedPiece = document.querySelectorAll('input[name="checker"]');
    for (let i of selectedPiece) {
        // Locates checked box element
        if (i.checked) {
            // Locates the 'Player 1 choose your piece:' <p> element
            let chooseYourPiece = document.getElementById('player-text');
            
            // If playerOne is already selected set the checked box element to playerTwo
            if (playerOne == 'X' || playerOne == 'O') {
                // Sets the playerTwo value to the current checked radio
                playerTwo = i.value;
                // Check if playerTwo has selected the same piece as playerOne
                if (playerOne === playerTwo) {
                    alert("Player one has already selected " + playerOne);
                    return;
                }

                console.log("Player 2 choose " + playerTwo);
                // Removes the text 'Player x choose your piece:' in the <p> element 
                chooseYourPiece.innerText = '';
                // Locates the radio <div>
                const hideChoice = document.getElementById('select-piece');
                // Hides the radio <div> by setting the CSS to display none
                hideChoice.setAttribute('style', 'display: none;');
                // Calls on the moves function
                moves(playerOne, playerTwo);
                return;
            }
            // Sets the playerOne value to the current checked radio
            playerOne = i.value;
            console.log("Player 1 choose " + playerOne);
            // Sets the chooseYourPiece <p> element to the displayed text
            chooseYourPiece.innerText = 'Player 2 choose your piece';
            return;
        }
    }

}


// Setting default numberOfMoves element to zero
let numberOfMoves = 0;
// Settign the currentPLayer element to blank
let currentPlayer = '';

// Function to alternate between players and allow the users to make their move
function moves() {
    // Produces an object of the current state of the game-board
    let board = document.getElementById('game-board').children;
    
    // Iterates through each box in the game board element previously set
    for (let selection of board) {
        // Adds an event listener to all boxes in the game board (Enabling the user to click)
        // When the user makes a selection it calls on the addMove function
        selection.addEventListener('click', addMove);
    }

    // Locates the <p> element with the id 'player-text'
    let chooseYourPiece = document.getElementById('player-text');
    // If the numberOfMoves is even and under 9 then its playerOne turn
    if (numberOfMoves < 9 && numberOfMoves % 2 === 0) {
        // Sets the chooseYourPiece element above to the text displayed indicating its playerOne turn
        chooseYourPiece.innerText = 'Player 1 make your move';
        // Sets the currentPlayer to playerOne
        currentPlayer = playerOne;
        // Calls on the check function
        check();
    } else {
        // Sets the chooseYourPiece element above to the text displayed indicating its playerTwo turn
        chooseYourPiece.innerText = 'Player 2 make your move';
        // Sets the currentPlayer to playerTwo
        currentPlayer = playerTwo;
        // Calls on the check function
        check();
    }
}

// This function displays the players move on the board
// Uses the event as an argument to locate the selected box
function addMove(event) {
    // Sets the class to selected of the first child element of the target element
    event.target.children[0].setAttribute('class', 'selected');
    // Adds 1 to the numberOfMoves counter
    numberOfMoves = numberOfMoves + 1;

    // Sets new element move to the <p> element in the box (To input the players piece)
    let move = event.target.children[0];
    // Sets move elemtn text to the currentPlayer piece
    move.innerText = currentPlayer; 
    console.log('number of moves ' + numberOfMoves);
    // Calls on the moves function above
    moves();

}

// This function checkes the status of the board (What has been entered and where)
// *This function contains a nested function checkForWin
function check() {
    // Sets a blank array for checkedBoxes and piecesSelected
    let checkedBoxes = [];
    let piecesSelected = [];
    // Locates and sets an arrya of all of the boxes that containes a move 
    let getCheckedBoxes = document.getElementsByClassName('selected');
    // Iterates through the getCheckedBoxes array
    for (let selected of getCheckedBoxes) {
        let boxes = selected.parentElement.id;
        // Fills the checkedBoxes array with the box locations that contains a move
        checkedBoxes.unshift(boxes);
        let piece = selected.parentElement.innerText;
        // Fills the piecesSelected array with the pieces entered
        piecesSelected.unshift(piece);
    }

    console.log("Checked boxes location: " + checkedBoxes + ' ' + piecesSelected);



    // Sets the numebr of wins for playerOne and playerTwo
    let p1Wins = 0;
    let p2Wins = 0;

    // Function to check for a winning match
    // Takes three box positions as arguments
    function checkForWin(p1, p2, p3) {
        // Checks if p1, p2 & p3 boxes have been selected
        if (checkedBoxes.includes(p1) === true && checkedBoxes.includes(p2) === true && checkedBoxes.includes(p3) === true) {
            // Finds the index of the p1, p2 & p3 
            const index1 = checkedBoxes.indexOf(p1);
            const index2 = checkedBoxes.indexOf(p2);
            const index3 = checkedBoxes.indexOf(p3);
            // Checks to see if the pices wihtin the selcted boxes are equal
            if (piecesSelected[index1] == piecesSelected[index2] && piecesSelected[index2] == piecesSelected[index3]) {
                // If the number of moves is even then playerTwo wins vice versa
                if (numberOfMoves % 2 === 0) {
                    p2Wins = p2Wins + 1;
                    alert("Player 2 wins!!");
                    // Reloads the page
                    location.reload();
                } else {
                    p1Wins = p1Wins + 1;
                    alert("Player 1 wins!!");
                    // Reloads the page
                    location.reload();
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

// Bugs to fix:


// Functionality to add:
// Tally number of wins for each player

