import GameBoard from "./GameBoard";

const SIZE = 10;

class Player {
    constructor(name) {
        this.name = name;
        this.alreadyHitCoords = [];
        this.initialize();
    }

    initialize() {
        for (let i = 0; i < SIZE; i++){
            this.alreadyHitCoords[i] = [];
            for (let j = 0; j < SIZE; j++) {
                this.alreadyHitCoords[i][j] = false;
            }
        }
    }

    attack(row, column, gameBoard) {
        if (this.alreadyHitCoords[row][column]) return false;

        this.alreadyHitCoords[row][column] = true;
        if (gameBoard.receiveAttack(row, column)){
            this.setHitCoords(gameBoard);
        }
        return true;
    }

    randomAttack(gameBoard) {
        if (this.alreadyHitCoords.length === 100) return;

        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        while (this.alreadyHitCoords[row][column]) {
            row = Math.floor(Math.random() * 10);
            column = Math.floor(Math.random() * 10);
        }

        this.alreadyHitCoords[row][column] = true;
        gameBoard.receiveAttack(row, column);
    }

    setHitCoords(gameBoard) {
        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                if (gameBoard.missedShots[row][column] === null) 
                    this.alreadyHitCoords[row][column] = false;
                else
                    this.alreadyHitCoords[row][column] = true;
            }
        }
    }
}

export default Player;