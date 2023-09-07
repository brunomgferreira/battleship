import GameBoard from "../factories/GameBoard";
import game from "./Game";
import StartScreen from "./StartScreen";

const EndScreen = (() => {

    const openEndScreenModal = () => {
        const endScreenModal = document.getElementById('endScreenModal');
        endScreenModal.style.display = 'flex';
    };

    const handleEndScreenInputs = () => {
        const playAgainBtn = document.getElementById('play-again-btn');
        
        playAgainBtn.addEventListener('click', () => {
            game.reset(new GameBoard());
            closeEndScreenModal();
            StartScreen.openStartScreenModal();
        });
    };

    const changeEndScreenTextInfo = (input) => {
        const endScreenTextInfo = document.getElementById('end-screen-text-info');
        endScreenTextInfo.textContent = input;
    }

    const closeEndScreenModal = () => {
        const endScreenModal = document.getElementById('endScreenModal');
        endScreenModal.style.display = 'none';
    };
    
    return { openEndScreenModal, changeEndScreenTextInfo, handleEndScreenInputs};
})();

export default EndScreen;