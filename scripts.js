//game board module
let gameBoard = (function (doc) {
    let board = ['', '', '',
        '', '', '',
        '', '', ''];
    let _rowContainer = [0, 0, 0];
    let _columnContainer = [0, 0, 0];
    let _diagonalContainer = [0, 0, 0];
    let _crossDiagonalContainer = [0, 0, 0];

    //make placement on board if nothing tile is empty
    function makePlacement(index) {
        console.log("Make Placement public method called");

        //check if tile is not empty
        if (!_isEmpty(index)) return;
        //determine player turn
        let player = currentPlayer();
        //add to the board
        _add(index, player.letter);
        _updateContainers(index);
        displayController.display('#board', board);

        //check for winner
        console.log(_checkWinner());
        if (_checkWinner() !== undefined) {
            displayController.displayWinner(_checkWinner());
            reset();
        }
    }

    //adds event listener to restart button
    function reset() {



        console.log('reset method called');
        board = ['', '', '',
            '', '', '',
            '', '', ''];
        _rowContainer = [0, 0, 0];
        _columnContainer = [0, 0, 0];
        _diagonalContainer = [0, 0, 0];
        _crossDiagonalContainer = [0, 0, 0];
        player1.turn = true;
        player2.turn = false;
        displayController.display('#board', board);

    }



    //return true if board tile is empty
    function _isEmpty(index) {
        return (board[index].length === 0 ? true : false);
    }
    //return the player who has the current turn
    function currentPlayer() {
        if (player1.turn) {
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
    //update containers after letter is added to board
    function _updateContainers(index) {
        switch (index) {
            case 0:
                _rowContainer[0]++;
                _columnContainer[0]++;
                _diagonalContainer[0]++;
                break;
            case 1:
                _rowContainer[0]++;
                _columnContainer[1]++;
                break;
            case 2:
                _rowContainer[0]++;
                _columnContainer[2]++;
                _crossDiagonalContainer[0]++;
                break;
            case 3:
                _rowContainer[1]++;
                _columnContainer[0]++;
                break;
            case 4:
                _rowContainer[1]++;
                _columnContainer[1]++;
                _diagonalContainer[1]++;
                _crossDiagonalContainer[1]++;
                break;
            case 5:
                _rowContainer[1]++;
                _columnContainer[2]++;
                break;
            case 6:
                _rowContainer[2]++;
                _columnContainer[0]++;
                _crossDiagonalContainer[2]++;
                break;
            case 7:
                _rowContainer[2]++;
                _columnContainer[1]++;
                break;
            case 8:
                _rowContainer[2]++;
                _columnContainer[2]++;
                _diagonalContainer[2]++;
                break;
            default:
                console.log('update containers function did not work as intended')
        }
    }

    //returns the winner or tie if there's either
    function _checkWinner() {
        //check rows
        for (let i = 0; i < _rowContainer.length; i++) {
            //a row has all tiles filled in
            if (_rowContainer[i] === 3) {
                switch (i) {
                    case 0:
                        if (board[0] === board[1] && board[1] === board[2]) {
                            console.log(`winner on row ${i}`);
                            return (board[0] === 'X' ? 'Player 1' : 'Player 2')
                        }
                        break;
                    case 1:
                        if (board[3] === board[4] && board[4] === board[5]) {
                            console.log(`winner on row ${i}`);
                            return (board[3] === 'X' ? 'Player 1' : 'Player 2')
                        }
                        break;
                    case 2:
                        if (board[6] === board[7] && board[7] === board[8]) {
                            console.log(`winner on row ${i}`);
                            return (board[6] === 'X' ? 'Player 1' : 'Player 2')
                        }
                        break;
                    default:
                        console.log('switch statement in _checkWinner() did not work as intended');
                }
            }
        }
        //check columns
        for (let i = 0; i < _columnContainer.length; i++) {
            //a row has all tiles filled in
            if (_columnContainer[i] === 3) {
                switch (i) {
                    case 0:
                        if (board[0] === board[3] && board[3] === board[6]) {
                            console.log(`winner on col ${i}`);
                            return (board[0] === 'X' ? 'Player 1' : 'Player 2')
                        }
                        break;
                    case 1:
                        if (board[1] === board[4] && board[4] === board[7]) {
                            console.log(`winner on col ${i}`);
                            return (board[1] === 'X' ? 'Player 1' : 'Player 2')
                        }
                        break;
                    case 2:
                        if (board[2] === board[5] && board[5] === board[8]) {
                            console.log(`winner on col ${i}`);
                            return (board[2] === 'X' ? 'Player 1' : 'Player 2')
                        }
                        break;
                    default:
                        console.log('switch statement in _checkWinner() did not work as intended');
                }
            }
        }
        //check diagonal
        let diagonalSum = 0;
        for (let i = 0; i < _diagonalContainer.length; i++) {
            diagonalSum += _diagonalContainer[i];
        }
        if (diagonalSum === 3) {
            if (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') return 'Player 1';
            else if (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') return 'Player 2';
        }
        //check opposite diagonal
        let crossDiagonalSum = 0;
        for (let i = 0; i < _crossDiagonalContainer.length; i++) {
            crossDiagonalSum += _crossDiagonalContainer[i];
        }
        if (crossDiagonalSum === 3) {
            if (board[2] === 'X' && board[4] === 'X' && board[6] === 'X') return 'Player 1';
            else if (board[2] === 'O' && board[4] === 'O' && board[6] === 'O') return 'Player 2';
        }
        //check for a tie and return false if there's no tie
        let rowSum = 0;
        for (let i = 0; i < _rowContainer.length; i++) {
            rowSum += _rowContainer[i];
        }
        let columnSum = 0;
        for (let i = 0; i < _columnContainer.length; i++) {
            columnSum += _columnContainer[i];
        }
        if (rowSum + columnSum === 18) return 'Tie';
    }
    return {
        board,
        makePlacement,
        reset,
    }
})(document || documentMock);

//document mock in case DOM simulator not available
const documentMock = (() => ({
    querySelector: (selector) => ({
        innerHTML: null,
    }),
}))();

//display controller module
let displayController = (function (doc) {
    //renders board on website
    function display(selector, array) {
        const board = doc.querySelector(selector);
        _clearBoard(board);
        _showCurrentPlayer();
        for (let i = 0; i < array.length; i++) {
            let tile = doc.createElement('div');
            tile.classList.add('tile');

            let para = doc.createElement('p');
            para.textContent = array[i];
            tile.append(para);
            tile = _addEventListener(i, tile);
            board.append(tile);
        }
    }

    //adds event listener to reset button
    function implementRestart(selector) {
        const btn = doc.querySelector(selector);
        btn.addEventListener('click', function () {
            gameBoard.reset();
        });
    }

    function displayWinner(winner) {
        if(winner === 'Tie') {
            alert(`${winner}!`);
            return;
        } else {
            alert(`${winner} is the winner!`);
            return;
        }
    }

    //adds event listener for putting letter on board
    function _addEventListener(index, tile) {
        tile.addEventListener('click', function () {
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

    //highlights the current player
    function _showCurrentPlayer() {
        console.log('_showCurrentPlayer method called');
        const player1Display = doc.querySelector('#player1');
        const player2Display = doc.querySelector('#player2');

        //it is player 1's turn
        if (player1.turn) {
            console.log('player 1 turn');
            player1Display.classList.add('in-turn');
            player1Display.classList.remove('out-of-turn');

            player2Display.classList.add('out-of-turn');
            player2Display.classList.remove('in-turn');
        }
        //it is player 2's turn
        else {
            console.log('player 2 turn');
            player1Display.classList.add('out-of-turn');
            player1Display.classList.remove('in-turn');

            player2Display.classList.add('in-turn');
            player2Display.classList.remove('out-of-turn');
        }
    }

    return {
        display,
        implementRestart,
        displayWinner,
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

displayController.implementRestart('#restart-btn');
displayController.display('#board', gameBoard.board);