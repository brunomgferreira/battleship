import GameBoard from '../GameBoard'
import Ship from '../Ship'

describe('Ship', () => {
    let gameBoard = new GameBoard();
    let ship = new Ship(3);
    let testObjectArray = [];
    let testBooleanArray = [];

    beforeEach(() => {
        gameBoard = new GameBoard();
        ship = new Ship(3);
        testObjectArray = [];
        testBooleanArray = [];

        for(let i = 0; i < 10; i++) {
            testObjectArray[i] = [];
            testBooleanArray[i] = [];
            for(let j = 0; j < 10; j++) {
                testObjectArray[i][j] = null;
                testBooleanArray[i][j] = false;
            }
        }
    });

    test('creates and initializes a gameboard', () => {
        expect(gameBoard).toEqual({
            board: testObjectArray,
            missedShots: testBooleanArray,
        });
    });

    test('places a ship', () => {
        gameBoard.placeShip(ship, 1, 1, true);
        testObjectArray[1][1] = ship;
        testObjectArray[2][1] = ship;
        testObjectArray[3][1] = ship;

        expect(gameBoard).toEqual({
            board: testObjectArray,
            missedShots: testBooleanArray,
        })
    });
    
    test('randomly places 5 ships', () => {
        gameBoard.placeShipsRandomly();
    
        expect(gameBoard.getEmptyFieldsAmount()).toBe(83)
    });

    test('prevents ship placement outside gameboard', () => {
        expect(gameBoard.isPlacementPossible(ship, 8, 8, true)).toBe(false);
        expect(gameBoard.isPlacementPossible(ship, 10, 10, false)).toBe(false);
    });

    test('prevents ship placement on taken fields', () => {
        gameBoard.placeShip(ship, 1, 1, true);
        expect(gameBoard.isPlacementPossible(ship, 1, 1, true)).toBe(false);
        expect(gameBoard.isPlacementPossible(ship, 2, 1, true)).toBe(false);
        expect(gameBoard.isPlacementPossible(ship, 3, 1, true)).toBe(false);
    });

    test('prevents ship placement in direct neighborhood of taken fields', () => {
        gameBoard.placeShip(ship, 1, 1, true);
        expect(gameBoard.isPlacementPossible(ship, 0, 0, true)).toBe(false);
        expect(gameBoard.isPlacementPossible(ship, 4, 2, true)).toBe(false);
        expect(gameBoard.isPlacementPossible(ship, 5, 2, true)).toBe(true);
    });

    test('receives attacks', () => {
        gameBoard.placeShip(ship, 1, 1, true);
        gameBoard.receiveAttack(3, 1);
        expect(gameBoard.board[3][1].hits.includes(2)).toBe(true);
    });

    test('keeps track of missed shots', () => {
        gameBoard.placeShip(ship, 1, 1, true);
        gameBoard.receiveAttack(1, 4);
        expect(gameBoard.missedShots[1][4]).toBe(true);
    });

    test('tells if game is over', () => {
        expect(gameBoard.isGameOver()).toBe(false);
        
        gameBoard.placeShip(ship, 1, 1, true);
        expect(gameBoard.isGameOver()).toBe(false);
        gameBoard.receiveAttack(1, 1);
        gameBoard.receiveAttack(2, 1);
        gameBoard.receiveAttack(3, 1);

        gameBoard.placeShip(new Ship(3), 5, 5, false);
        gameBoard.receiveAttack(5, 5);
        gameBoard.receiveAttack(5, 6);
        gameBoard.receiveAttack(5, 7);
        expect(gameBoard.isGameOver()).toBe(true);
    });
});