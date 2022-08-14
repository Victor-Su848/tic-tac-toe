//game board module
let gameBoard = (function() {
    let board = ['','','',
                 '','','',
                 '','',''];

    //make placement on board if nothing tile is empty
    function makePlacement(index) {
        console.log("Make Placement public method called");
        
        //check if tile is not empty
        if(!_isEmpty(index)) return;
        //determine player turn
        let currentPlayer = _currentPlayer();
        //add to the board
        _add(index, currentPlayer.letter);
        displayController.display('#board', board);

        //check for winner
    }
    
    //return true if board tile is empty
    function _isEmpty(index) {
        return (board[index].length === 0 ? true:  false);
    }

    //return the player who has the current turn
    function _currentPlayer() {
        if(player1.turn) {
            player1.turn = false;
            player2.turn = true;
            return player1;
        } else {
            player1.turn = true;
            player2.turn = false;
            return player2;
        }
    }

    //adds letter to board tild
    function _add(index, letter) {
        console.log("Add to board private method called");
        board[index] = letter;
    }

    return {
        board,
        makePlacement,
    }
})();

//document mock in case DOM simulator not available
const documentMock = (() => ({
    querySelector: (selector) => ({
      innerHTML: null,
    }),
  }))();

//display controller module
let displayController = (function(doc) {
    //renders board on website
    function display(selector, array) {
        const board = doc.querySelector(selector);
        _clearBoard(board);

        for(let i = 0; i < array.length; i++) {
            let tile = doc.createElement('div');
            tile.classList.add('tile');
            tile.textContent = array[i];
            tile = _addEventListener(i, tile);
            board.append(tile);
        }
    }

    //adds event listener for putting letter on board
    function _addEventListener(index, tile) {
        tile.addEventListener('click', function() {
            console.log(`You pressed grid item ${index}`);
            gameBoard.makePlacement(index);
        });
        return tile;
    }

    //clears the board
    function _clearBoard(parent) {
        console.log("_clearBoard private method called");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return {
        display,
    }
})(document || documentMock);

//player factory function
function player(turn, letter) {
    return {
        turn,
        letter
    }
}

let player1 = player(true, 'X');
let player2 = player(false, 'O');

displayController.display('#board', gameBoard.board);