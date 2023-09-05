import game from "./Game";

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
        // handleUIInputs();
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
                    gameBox.classList.add('hit');
                }
                else if (gameBoard.missedShots[row][column] === true) {
                    gameBox.classList.add('miss');
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
                    gameBox.classList.add('hit');
                }
                else if (gameBoard.missedShots[row][column] === true) {
                    gameBox.classList.add('miss');
                }
                /* else if (gameBoard.board[row][column]) {
                    gameBox.classList.add('ship');
                } */
            }
        }
    }

    const handleStartScreenInputs = () => {
        const gameBoxes = document.querySelectorAll('#start-game-board *')
        const rotateBtn = document.getElementById('rotate-btn');
        const startGameBoard = document.getElementById('start-game-board');

        gameBoxes.forEach((gameBox) => {
            gameBox.addEventListener('click', (e) => {
                placeShips(parseInt(e.target.dataset.index));
            });
            gameBox.addEventListener('mouseenter', (e) => {
                changeStartScreenGameBoardIndex(parseInt(e.target.dataset.index));
                startGameBoardHovering(startScreenGameBoardIndex);
            });
        });

        rotateBtn.addEventListener('click', (e) => {
            rotateShip();
        });

        startGameBoard.addEventListener('mouseleave', (e) => {
            startScreenGameBoardIndex = null
            updateBoard();
        });

        document.addEventListener('keydown', (e) => {
            const keyCode = e.key;
            const keyCodes = new Set(['r', 'R', 'Enter', 'ArrowDown', 'ArrowUp']);
            if (!keyCodes.has(keyCode)) return;
            rotateShip();
            startGameBoardHovering(startScreenGameBoardIndex);
        });
    };

    return { initialize, updateUserBoard, updateComputerBoard };
})();

export default UI;