import anime from 'animejs/lib/anime.es.js';

export class SummaryModal {
    constructor(boardContainer, restartGame) {
        this.boardContainer = boardContainer;
        this.restartGame = restartGame;
    }

    createSummaryModal = (tries = null, time = null, isWin = false) => {
        const summaryModal = document.createElement('div');
        summaryModal.classList.add('summary');
        this.boardContainer.appendChild(summaryModal);

        const winHeader = isWin ? 'Congratulations, YOU WIN!' : 'You run out of time :(';
        summaryModal.innerHTML =
            `<div class="summary__content">
                <div class="summary__header">${winHeader}</div>
                <div class="summary__text"> You spent ${tries} tries</div>
                ${time ? `<div class="summary__text">You spent ${time} seconds</div>` : ''}
                <button class="btn" id="playAgain">Play again</button>
            </div>`;

        anime({
            targets: summaryModal,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });

        const btn = document.getElementById('playAgain');
        btn.addEventListener("click", (e) => {
            anime({
                targets: summaryModal,
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 200,
                easing: 'easeInOutQuad',
                complete: () => {
                    summaryModal.remove();
                    this.restartGame();
                }
            });
        });
    }
}

