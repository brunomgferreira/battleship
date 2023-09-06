import Ship from "./Ship";

const SIZE = 10;

class GameBoard {

    constructor() {
        this.board = [];
        this.missedShots = [];
        this.initialize();
    }

    initialize() {
        for (let i = 0; i < SIZE; i++){
            this.board[i] = [];
            this.missedShots[i] = [];
            for (let j = 0; j < SIZE; j++) {
                this.board[i][j] = null;
                this.missedShots[i][j] = null;
            }
        }
    }

    placeShip(ship, row, column, isVertical) {
        if(!this.isPlacementPossible(ship, row, column, isVertical)) return false;
        
        ship.setCoords(row, column);
        ship.setIsVertical(isVertical);
        if(isVertical) {
            for (let i = 0; i < ship.length; i++) {
                this.board[row + i][column] = ship;
            }
        }
        else {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][column + i] = ship;
            }
        }
        
        return true;
    }

    placeShipsRandomly() {
        if (!this.isEmpty()) return;
        
        const ships = [];
        const carrier = new Ship(5)
        const battleship = new Ship(4)
        const destroyer = new Ship(3)
        const submarine = new Ship(3)
        const patrolBoat = new Ship(2)
        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)

        let successfulPlacements = 0;

        while (successfulPlacements < 5) {
            const row = Math.floor(Math.random() * SIZE);
            const column = Math.floor(Math.random() * SIZE);
            const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;

            if (this.placeShip(ships[successfulPlacements], row, column, isVertical)) {
                ships[successfulPlacements].setCoords(row, column);
                ships[successfulPlacements].setIsVertical(isVertical);
                successfulPlacements++;
            }
                
        }
    }

    isPlacementPossible(ship, row, column, isVertical) {
        // CASE POSITION IS OUT OF GAMEBOARD
        if (row < 0 || row >= SIZE || column < 0 || column >= SIZE)
            return false;

        // CASE SHIP DOESN'T FIT IN GAMEBOARD
        if (isVertical) {
            if (row + ship.length > SIZE) return false;
        }
        else {
            if (column + ship.length > SIZE) return false;
        }

        // CASE ANY OF THE FIELDS IS ALREADY TAKEN
        if (isVertical) {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row + i][column]) return false
            }
        }
        else {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row][column + i]) return false
            }
        }

        // CASE ANY OF THE NEIGHBOURS FIELDS ARE ALREADY TAKEN

        if (isVertical) {
            for (let i = 0; i < ship.length; i++) {
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (row + x + i < 0 || row + x + i >= SIZE || column + y < 0 || column + y >= SIZE)
                            continue;
                        if (this.board[row + x + i][column + y])
                            return false;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < ship.length; i++) {
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (row + x < 0 || row + x >= SIZE || column + y + i < 0 || column + y + i>= SIZE)
                            continue;
                        if (this.board[row + x][column + y + i])
                            return false;
                    }
                }
            }            
        }

        return true;
    }

    getEmptyFieldsAmount() {
        let result = 0;
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (!this.board[i][j])
                    result++;
            }
        }
        return result;
    }

    isEmpty() {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (this.board[i][j])
                    return false;
            }
        }
        return true;
    }

    receiveAttack(row, column) {
        if(row < 0 || row >= SIZE || column < 0 || column >= SIZE)
            return false;

        if (this.board[row][column]) {
            let hitIndex = 0

            // IS HORIZONTAL
            if (column > 0 && this.board[row][column - 1])  {
                let i = 1;
                while (column - i >= 0 && this.board[row][column - i]) {
                    hitIndex++;
                    i++;
                }
            }

            // IS VERTICAL
            else if (row > 0 && this.board[row - 1][column]) {
                let i = 1;
                while (row - i >= 0 && this.board[row - i][column]) {
                    hitIndex++;
                    i++;
                }
            }

            this.board[row][column].hit(hitIndex);
            this.missedShots[row][column] = false;
            this.isShipSunk(row, column);
            return true;
        }
        else {
            this.missedShots[row][column] = true;
            return false;
        }
    }

    isGameOver() {
        let isBoardEmpty = true;
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (this.board[i][j]) {
                    isBoardEmpty = false;
                    if (!this.board[i][j].isSunk()){
                        return false;
                    }
                }
            }
        }
        if(isBoardEmpty) return false;
        return true;
    }

    isShipSunk(row, column) {
        if(!this.board[row][column].isSunk()) return false;

        const x = this.board[row][column].row;
        const y = this.board[row][column].column;
        const length = this.board[row][column].length;
        if(this.board[row][column].isVertical) {
            for (let i = -1; i <= length; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (x + i < 0 || x + i > 9 || y + j < 0 || y + j > 9) continue;
                    if(this.missedShots[x+i][y+j] === null)
                        this.missedShots[x+i][y+j] = true;
                }
            }
        }
        else {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= length; j++) {
                    if (x + i < 0 || x + i > 9 || y + j < 0 || y + j > 9) continue;
                    if(this.missedShots[x+i][y+j] === null)
                        this.missedShots[x+i][y+j] = true;
                }
            }
        }
        return true;
    }
}

export default GameBoard;