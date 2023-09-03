const game = (() => {
    let round = 1;
    let isOver = false;
    const user = new Player('user');
    const computer = new Player('computer');
    let userBoard = new GameBoard();
    const computerBoard = new GameBoard();

    const setUserBoard = (gameBoard) => {
        userBoard = gameBoard;
    };

    const setComputerBoard = () => {
        computerBoard.placeShipsRandomly();
    };

    const playRound = (row = null, column = null) => {
        if(getCurrentPlayer() === 'computer') {
            computer.randomAttack(userBoard);
        }
        else {
            if (!user.attack(row, column, computerBoard))
                return;
        }
        round++;
    };

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? user : computer;
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

    return { setUserBoard, setComputerBoard, playRound, reset, checkWinner, getIsOver };

})();