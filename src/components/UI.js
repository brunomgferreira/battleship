import game from "./Game";
import EndScreen from "./EndScreen";

const UI = (() => {

    const userBoardID = 'user-game-board';
    const computerBoardID = 'computer-game-board';
    const userBoardUI = document.getElementById(userBoardID);
    const computerBoardUI = document.getElementById(computerBoardID);

    const initialize = () => {
        loadBoard(userBoardUI);
        updateUserBoard(game.getUserBoard());
        loadBoard(computerBoardUI);
        updateComputerBoard(game.getComputerBoard());
        handleUIInputs();
    };

    const loadBoard = (UIBoard) => {
        UIBoard.textContent = '';
        for (let i = 0; i < 100; i++) {
            const gameBox = `<div class="game-box" data-index="${i}"></div>`;
            UIBoard.innerHTML += gameBox;
        }
    };

    const updateUserBoard = (gameBoard) => {
        for(let row = 0; row < gameBoard.board.length; row++) {
            for(let column = 0; column < gameBoard.board.length; column++) {
                const index = row * 10 + column;
                const gameBox = document.querySelector(`#${userBoardID} .game-box[data-index="${index}"]`);
                gameBox.classList = 'game-box';
                if (gameBoard.missedShots[row][column] === false) {
                    gameBox.classList.add('sunk-ship');
                }
                else if (gameBoard.missedShots[row][column] === true) {
                    gameBox.classList.add('miss');
                    gameBox.innerHTML = '&#9673;';
                }
                else if (gameBoard.board[row][column]) {
                    gameBox.classList.add('ship');
                }
            }
        }
    };

    const updateComputerBoard = (gameBoard) => {
        for(let row = 0; row < gameBoard.board.length; row++) {
            for(let column = 0; column < gameBoard.board.length; column++) {
                const index = row * 10 + column;
                const gameBox = document.querySelector(`#${computerBoardID} .game-box[data-index="${index}"]`);
                gameBox.classList = 'game-box';
                if (gameBoard.missedShots[row][column] === false) {
                    gameBox.classList.add('sunk-ship');
                }
                else if (gameBoard.missedShots[row][column] === true) {
                    gameBox.classList.add('miss');
                    gameBox.innerHTML = '&#9673;';
                }
                /* else if (gameBoard.board[row][column]) {
                    gameBox.classList.add('ship');
                } */
            }
        }
    }

    const updateBothBoards = () => {
        updateUserBoard(game.getUserBoard());
        updateComputerBoard(game.getComputerBoard());
    }

    const handleUIInputs = () => {
        const computerGameBoxes = document.querySelectorAll(`#${computerBoardID} *`)

        computerGameBoxes.forEach((gameBox) => {
            gameBox.addEventListener('click', (e) => {
                handleGameBoxInput(e);
            });
        });
    };

    const handleGameBoxInput = (e) => {
        const index = parseInt(e.target.dataset.index);
        const row = Math.floor(index / 10);
        const column = index % 10;
        game.playRound(row, column);
        updateBothBoards();
        game.checkWinner();

        if (game.getIsOver()) {
            EndScreen.openEndScreenModal()
        }
    }

    return { initialize, updateUserBoard, updateComputerBoard };
})();

export default UI;