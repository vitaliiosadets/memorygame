import {Card} from "./Card.js"
import {SummaryModal} from "./SummaryModal.js";

export default class Board {
    constructor({boardStyle, grid, assets, boardContainer, cardContainer, restartGame, timeLimit}) {
        this.cardsList = [...assets, ...assets].sort()
            .slice(0, grid.rows * grid.columns);
        this.grid = grid;
        this.boardStyle = boardStyle;
        this.boardContainer = boardContainer;
        this.cardContainer = cardContainer;
        this.generatedCards = [];
        this.tries = 0;
        this.firstCard = null;
        this.secondCard = null;
        this.isBoardLocked = false;
        this.restartGame = restartGame;
        this.scoreElement = null;
        this.summaryModal = new SummaryModal(this.boardContainer, this.restartGame);
        this.time = timeLimit;
        this.timeLimit = timeLimit;
        this.timeElement = null;
        this.timerInterval = null;
    }

    createBoard = () => {
        const {height, width} = this.boardStyle;
        this.boardContainer.style.width = `${width}px`
        this.boardContainer.style.height = `${height}px`
    }


    shuffleCards = (cards) => {
        for (let current = this.cardsList.length - 1; current > 0; current--) {
            const random = Math.floor(Math.random() * (current + 1));
            [this.cardsList[current], this.cardsList[random]] = [this.cardsList[random], this.cardsList[current]];
        }
        return cards;
    }
    createCards = () => {
        const {columns, gap, rows} = this.grid

        this.cardsList.forEach((card, index) => {
            const cardItem = new Card(card, index, this.cardsList[index], this.cardContainer)
            this.generatedCards.push(cardItem)
        })

        this.cardContainer.style.setProperty(
            `grid-template-columns`,
            `repeat(${columns},1fr)`
        );

        this.cardContainer.style.setProperty(
            'gap',
            `${gap}px`
        );
    }
    createListeners = () => {
        this.cardContainer.addEventListener("click", (e) => {
            if (!e.target.parentElement.classList.contains("card")) return;
            this.handleClick(this.generatedCards[e.target.parentElement.id]);
        });
    }

    createScore = () => {
        const score = document.createElement('div')
        score.classList.add('score');
        score.innerHTML = `<p>Moves: <span class="score__content">${this.tries}</span> </p>`
        this.boardContainer.appendChild(score);
        this.scoreElement = score.querySelector('.score__content');
    }

    createTimeElements = () => {
        const time = document.createElement('div')
        time.classList.add('time');
        time.innerHTML = `<p>Time left: <span class="time__content">${this.time} seconds</span></p>`;
        this.boardContainer.appendChild(time);
        this.timeElement = time.querySelector('.time__content');
    }

    renderTime() {
        this.timeElement.textContent = `${this.time} seconds`;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.time--;
            this.renderTime();
            this.checkTime();
        }, 1000);
    }

    pauseTimer() {
        clearInterval(this.timerInterval);
    }

    checkTime() {
        if (this.time > 0) return;
        this.pauseTimer();
        this.summaryModal.createSummaryModal(this.tries)
    }

    setTimerListener() {
        this.boardContainer.addEventListener("mouseenter", () => this.startTimer());
        this.boardContainer.addEventListener("mouseleave", () => this.pauseTimer());
    }

    handleClick = (card) => {
        if (this.isBoardLocked) return;
        if (card === this.firstCard) return;
        card.flipCard()
        if (!this.firstCard) {
            return this.firstCard = card;
        }
        this.secondCard = card;
        this.isBoardLocked = true;
        this.tries++;
        this.scoreElement.textContent = this.tries;
        this.handleMatchCards()
    }

    handleMatchCards() {
        const match = this.firstCard.matchContent === this.secondCard.matchContent;
        setTimeout(() => {
            match ? this.disableMatchedCards() : this.handleNotMatchCards();
        }, 800);
    }

    disableMatchedCards() {
        this.firstCard.matchCard();
        this.secondCard.matchCard();
        this.clearSelectedCards();
        this.checkFinishedGame();
    }

    handleNotMatchCards() {
        this.firstCard.flipCard();
        this.secondCard.flipCard();
        this.clearSelectedCards();
    }

    clearSelectedCards() {
        this.firstCard = null;
        this.secondCard = null;
        this.isBoardLocked = false;
    }

    checkFinishedGame() {
        const allMatched = this.generatedCards.every((card) => card.isMatched);

        if (allMatched) {
            const timeSpent = this.timeLimit - this.time;
            this.pauseTimer();
            this.summaryModal.createSummaryModal(this.tries, timeSpent, true);
        }
    }

    reset() {
        this.clearSelectedCards();
        this.tries = 0;
        this.generatedCards = [];
        this.cardContainer.innerHTML = "";
        this.scoreElement.textContent = 0;
        this.timeElement.textContent = `${this.timeLimit} seconds`;
        this.time = this.timeLimit;
    }
}