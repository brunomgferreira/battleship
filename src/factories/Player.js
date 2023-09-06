import game from "../components/Game";
import GameBoard from "./GameBoard";

const SIZE = 10;

class Player {
    constructor(name) {
        this.name = name;
        this.alreadyHitCoords = [];
        this.initialize();
        this.tracker = { 
            isVertical: null,
            damagedShipCords: [] };
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

    computerAttack(gameBoard) {
        const adjacentsCoord = [[-1,0], [1,0], [0,-1], [0,1]];
        if (this.tracker.damagedShipCords.length === 0) {
            this.randomAttack(gameBoard);
            return;
        }
        else if (this.tracker.damagedShipCords.length === 1){ 
            for (let i = 0; i < adjacentsCoord.length; i++) {
                console.log('bbbb');
                const row = this.tracker.damagedShipCords[0][0] + adjacentsCoord[i][0];
                const column = this.tracker.damagedShipCords[0][1] + adjacentsCoord[i][1];
                if (!this.isCoordsValid(row, column)) continue;
                if (this.attack(row, column, gameBoard)) {
                    if (gameBoard.board[row][column] && gameBoard.board[row][column].isSunk()) {
                        this.tracker.damagedShipCords = [];
                    }
                    else if (gameBoard.board[row][column]) {
                        this.tracker.damagedShipCords.push([row, column]);
                        this.setTrackerIsVertical();
                    }
                    return;
                }
            }
        }
        else if (this.tracker.isVertical) {
            for (let i = 0; i < this.tracker.damagedShipCords.length; i++) {
                for (let j = 2; j < 2; j++) {
                    const row = this.tracker.damagedShipCords[i][0] + adjacentsCoord[j][0];
                    const column = this.tracker.damagedShipCords[i][1] + adjacentsCoord[j][1];
                    if (!this.isCoordsValid(row, column)) continue;
                    if (this.attack(row, column, gameBoard)) {
                        if (gameBoard.board[row][column] && gameBoard.board[row][column].isSunk()) {
                            this.tracker.damagedShipCords = [];
                        }
                        else if (gameBoard.board[row][column]) {
                            this.tracker.damagedShipCords.push([row, column]);
                        }
                        return;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < this.tracker.damagedShipCords.length; i++) {
                for (let j = 2; j < adjacentsCoord.length; j++) {
                    const row = this.tracker.damagedShipCords[i][0] + adjacentsCoord[j][0];
                    const column = this.tracker.damagedShipCords[i][1] + adjacentsCoord[j][1];
                    console.log([row,column]);
                    if (!this.isCoordsValid(row, column)) continue;
                    if (this.attack(row, column, gameBoard)) {
                        if (gameBoard.board[row][column] && gameBoard.board[row][column].isSunk()) {
                            this.tracker.damagedShipCords = [];
                        }
                        else if (gameBoard.board[row][column]) {
                            this.tracker.damagedShipCords.push([row, column]);
                        }
                        return;
                    }
                }
            }
        }
    }

    setTrackerIsVertical() {
        const firstCoord = this.tracker.damagedShipCords[0];
        const secondCoord = this.tracker.damagedShipCords[1];

        if (secondCoord[0] === firstCoord[0])
            this.tracker.isVertical = false;
        else
            this.tracker.isVertical = true;
    };

    isCoordsValid(row, column) {
        if (row < 0 || row > 9 || column < 0 || column > 9)
            return false;
        return true;
    };

    randomAttack(gameBoard) {
        if (this.alreadyHitCoords.length === 100) return;

        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        while (this.alreadyHitCoords[row][column]) {
            row = Math.floor(Math.random() * 10);
            column = Math.floor(Math.random() * 10);
        }

        this.alreadyHitCoords[row][column] = true;
        if (gameBoard.receiveAttack(row, column))
            this.tracker.damagedShipCords.push([row, column]);
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