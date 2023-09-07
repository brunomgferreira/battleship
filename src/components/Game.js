import GameBoard from "../factories/GameBoard";
import Player from "../factories/Player";
import EndScreen from "./EndScreen";

const game = (() => {
    let isOver = false;
    const user = new Player('user');
    const computer = new Player('computer');
    let userBoard = new GameBoard();
    let computerBoard = new GameBoard();

    const setUserBoard = (gameBoard) => {
        userBoard = gameBoard;
    };

    const getUserBoard = () => {
        return userBoard;
    };

    const setComputerBoard = () => {
        computerBoard = new GameBoard();
        computerBoard.placeShipsRandomly();
    };

    const getComputerBoard = () => {
        return computerBoard;
    }

    const playRound = (row = null, column = null) => {
        if(row === null && column === null) {
            computer.computerAttack(userBoard);
        }
        else if (user.attack(row, column, computerBoard)){
            checkWinner();
            if(!isOver)
                playRound();
        }
    };

    const checkWinner = () => {
        if (userBoard.isGameOver()) {
            isOver = true;
            EndScreen.changeEndScreenTextInfo('You lost !');
        }
        else if (computerBoard.isGameOver()) {
            isOver = true;
            EndScreen.changeEndScreenTextInfo('You won !');
        }
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = (newUserBoard) => {
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