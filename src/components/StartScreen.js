import GameBoard from "../factories/GameBoard";

const StartScreen = (() => {

    const ships = createShips();
    const gameBoard = new GameBoard();
    let ship = null;
    let shipName = null;
    let isVertical = false;

    const createShips = () => {
        const carrier = new Ship(5)
        const battleship = new Ship(4)
        const destroyer = new Ship(3)
        const submarine = new Ship(3)
        const patrolBoat = new Ship(2)
        const ships = [ ['carrier', carrier], ['battleship', battleship], ['destroyer', destroyer], ['submarine', submarine], ['patrolBoat', patrolBoat] ];
        return ships;
    };

    const getNextShip = () => {
        [shipName, ship] = ships.pop();
        console.log(`Place your ${shipName}`);
    }

    const placeShips = (index) => {
        if (ship === null) {
            getNextShip();
            return;
        }

        const row = Math.floor(index / 10);
        const column = index % 10;

        if (gameBoard.placeShip(ship, row, column, isVertical)) {
            getNextShip();
            isVertical = false;
            return;
        }
    };

    return { placeShips };
})();