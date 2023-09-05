import GameBoard from "../factories/GameBoard";
import Player from "../factories/Player";

const game = (() => {
    let isOver = false;
    const user = new Player('user');
    const computer = new Player('computer');
    let userBoard = new GameBoard();
    const computerBoard = new GameBoard();

    const setUserBoard = (gameBoard) => {
        userBoard = gameBoard;
    };

    const getUserBoard = () => {
        return userBoard;
    };

    const setComputerBoard = () => {
        computerBoard.placeShipsRandomly();
    };

    const getComputerBoard = () => {
        return computerBoard;
    }

    const playRound = (row = null, column = null) => {
        if(row === null && column === null) {
            computer.randomAttack(userBoard);
        }
        else if (user.attack(row, column, computerBoard)){
            playRound();
        }
    };

    const checkWinner = () => {
        if (userBoard.isGameOver()) {
            isOver = true;
            console.log('YOU LOST');
        }
        else if (computerBoard.isGameOver()) {
            isOver = true;
            console.log('YOU WON');
        }
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = (newUserBoard) => {
        round = 1;
        isOver = false;
        user.initialize();
        computer.initialize();
        userBoard.initialize();
        setUserBoard(newUserBoard);
        setComputerBoard();
    };

    return { setUserBoard, getUserBoard, setComputerBoard, getComputerBoard, playRound, reset, checkWinner, getIsOver };

})();

export default game;