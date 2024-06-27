import Board from "./Board.js";

export default class Memory {
    constructor(config) {
        Object.assign(this, {...config});
        this.restartGame = this.restartGame.bind(this);
        this.board = new Board(this)
    }

    startGame() {
        this.board.createBoard()
            .shuffleCards()
            .createCards()
            .createScore()
            .createTimeElements()
            .createListeners()
            .setTimerListener()
    }

    restartGame() {
        this.board.reset()
            .shuffleCards()
            .createCards()
            .createListeners()
    }
}


