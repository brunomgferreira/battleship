const EndScreen = (() => {

    const openEndScreenModal = () => {
        console.log('aaaaaaaaa');
        /*
        const placeShipsModal = document.getElementById('placeShipsModal');
        placeShipsModal.style.display = 'flex';
        initialize();
        */
    };

    const closeEndScreenModal = () => {
        const placeShipsModal = document.getElementById('placeShipsModal');
        placeShipsModal.style.display = 'none';
        game.setUserBoard(gameBoard);
        game.setComputerBoard();
        UI.initialize();
    };
    
    return { openEndScreenModal};
})();

export default EndScreen;