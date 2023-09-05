import GameBoard from "../factories/GameBoard";
import Ship from "../factories/Ship";
import game from "./Game";

const StartScreen = (() => {

    let ships = [];
    let gameBoard = null;
    let ship = null;
    let shipName = null;
    let isVertical = false;

    const initialize = () => {
        createShips();
        getNextShip();
        gameBoard = new GameBoard();
        loadBoard();
        handleStartScreenInputs();
    };

    const loadBoard = () => {
        const startGameBoard = document.getElementById('start-game-board');
        startGameBoard.textContent = '';
        for (let i = 0; i < 100; i++) {
            const gameBox = `<div class="game-box" data-index="${i}"></div>`;
            startGameBoard.innerHTML += gameBox;
        }  
    };

    const updateBoard = () => {
        for(let row = 0; row < gameBoard.board.length; row++) {
            for(let column = 0; column < gameBoard.board.length; column++) {
                const index = row * 10 + column;
                const gameBox = document.querySelector(`#start-game-board .game-box[data-index="${index}"]`);
                gameBox.classList = 'game-box';
                if (gameBoard.board[row][column]) {
                    gameBox.classList.add('ship');
                }
            }
        }
    };

    const createShips = () => {
        const carrier = new Ship(5)
        const battleship = new Ship(4)
        const destroyer = new Ship(3)
        const submarine = new Ship(3)
        const patrolBoat = new Ship(2)
        ships = [ ['carrier', carrier], ['battleship', battleship], ['destroyer', destroyer], ['submarine', submarine], ['patrol boat', patrolBoat] ];
    };

    const handleStartScreenInputs = () => {
        const gameBoxes = document.querySelectorAll('#start-game-board *')
        const rotateBtn = document.getElementById('rotate-btn');

        gameBoxes.forEach((gameBox) => {
            gameBox.addEventListener('click', (e) => {
                placeShips(parseInt(e.target.dataset.index));
            });
            gameBox.addEventListener('mouseenter', (e) => {
                startGameBoardHovering(parseInt(e.target.dataset.index));
            });
            gameBox.addEventListener('mouseleave', (e) => {
                updateBoard();
            });
        });

        rotateBtn.addEventListener('click', (e) => {
            isVertical === true ? isVertical = false : isVertical = true;
        });
    };

    const startGameBoardHovering = (index) => {
        const length = ship.length;

        const row = Math.floor(index / 10);
        const column = index % 10;

        if (gameBoard.isPlacementPossible(ship, row, column, isVertical)) {
            for (let i = 0; i < length; i++) {

                let pos = index;

                if (isVertical) pos += i * 10;
                else pos += i;

                const gameBox = document.querySelector(`#start-game-board .game-box[data-index="${pos}"]`);
                gameBox.classList.add('possible-placement');
            }
        }
        else {
            for (let i = 0; i < length; i++) {
                if (isVertical) {
                    let pos = index + i * 10;
                    if (pos > 100) return;
                    const gameBox = document.querySelector(`#start-game-board .game-box[data-index="${pos}"]`);
                    gameBox.classList.add('sunk-ship');
                }
                else {
                    let pos = index + i;
                    if (pos > ((row +1 ) * 10) - 1) return;
                    const gameBox = document.querySelector(`#start-game-board .game-box[data-index="${pos}"]`);
                    gameBox.classList.add('sunk-ship');
                }
            }
        }
    };

    const changeStartModalObjective = (input) => {
        const startModalObjective = document.getElementById('startModalObjective');
        startModalObjective.textContent = input;
    }

    const getNextShip = () => {
        [shipName, ship] = ships.shift();
        changeStartModalObjective(`Place your ${shipName}`);
    }

    const placeShips = (index) => {
        if (ship === null) {
            getNextShip();
            return;
        }

        const row = Math.floor(index / 10);
        const column = index % 10;

        if (gameBoard.placeShip(ship, row, column, isVertical)) {
            if (ships.length === 0) {
                game.setUserBoard(gameBoard);
                closeStartScreenModal();
            }
            else {
                updateBoard();
                getNextShip();
                isVertical = false;
                return;
            }
        }
    };

    const openStartScreenModal = () => {
        const placeShipsModal = document.getElementById('placeShipsModal');
        placeShipsModal.style.display = 'flex';
        initialize();
    };

    const closeStartScreenModal = () => {
        const placeShipsModal = document.getElementById('placeShipsModal');
        placeShipsModal.style.display = 'none';
    };

    return { placeShips, initialize, openStartScreenModal };
})();

export default StartScreen;