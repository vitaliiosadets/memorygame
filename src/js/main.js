import Memory from './Memory'
import configuraions from "./configuraions.js";

const restartBtn = document.getElementById('restart');
const newGameBtn = document.getElementById('newGame');

restartBtn.setAttribute('disabled', true);

const boardContainer = document.querySelector('.board');
const cardContainer = document.querySelector(".cards");

const setTheme = (theme) => {
    const body = document.querySelector('body');
    const currentTheme = theme === 'light' ? '#ffffff' : "#0000009f"
    body.style.background = currentTheme;
}

const memory = new Memory({
    ...configuraions, boardContainer, cardContainer
})

setTheme(configuraions.theme)

newGameBtn.addEventListener('click', () => {
    memory.startGame()
    restartBtn.removeAttribute('disabled');
    newGameBtn.setAttribute('disabled', true);
})

restartBtn.addEventListener('click', () => {
    memory.restartGame()
    restartBtn.removeAttribute('disabled');
    newGameBtn.setAttribute('disabled', true);
})

// user.name=ct.vitaliiosadets
// user.email=ct.vitaliiosadets@waterford.org











