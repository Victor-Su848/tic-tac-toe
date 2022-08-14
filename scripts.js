//game board module
let gameBoard = (function() {
    let board = ['X','_','O',
                 '_','X','O',
                 'O','_','X'];

    

    return {
        board,
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


        console.log(selector);
        console.log(array);
        const board = doc.querySelector(selector);
        for(let i = 0; i < array.length; i++) {
            let tile = doc.createElement('div');
            tile.classList.add('tile');
            tile.textContent = array[i];

            board.append(tile);
        }
    }

    //adds event listener for putting letter on board
    function _addEventListener() {
        
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