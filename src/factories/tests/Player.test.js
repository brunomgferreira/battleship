import GameBoard from '../GameBoard'
import Ship from '../Ship'
import Player from '../Player'

describe('Player', () => {
    let player = new Player('p1');
    let gameBoard = new GameBoard();
    let ship = new Ship(3);

    beforeEach(() => {
        player = new Player('p1');
        gameBoard = new GameBoard();
        ship = new Ship(3);
    });

    test('creates and initializes a player', () => {
        expect(player).toEqual({
            name: 'p1',
            alreadyHitCoords: [],
        });
    });

    test('attacks', () => {
        gameBoard.placeShip(ship, 1, 1, true);
        player.attack(1, 1, gameBoard);
        player.attack(2, 1, gameBoard);
        player.attack(3, 1, gameBoard);
        expect(gameBoard.isGameOver()).toBe(true);
    });

    test('randomly attacks', () => {
        gameBoard.placeShip(ship, 1, 1, true)
        for (let i = 0; i < 100; i++) {
            player.randomAttack(gameBoard);
        }
        expect(gameBoard.isGameOver()).toBe(true);
    });  
});