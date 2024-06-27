import Board from "./Board.js";

export default class Memory {
    constructor(config) {
        Object.assign(this, {...config});
        this.restartGame = this.restartGame.bind(this);
        this.board = new Board(this)
    }

    startGame() {
        this.board.createBoard()
        this.board.shuffleCards()
        this.board.createCards()
        this.board.createScore()
        this.board.createTimeElements()
        this.board.createListeners()
        this.board.setTimerListener()
    }

    restartGame() {
        this.board.reset();
        this.board.shuffleCards()
        this.board.createCards()
        this.board.createListeners()
    }
}


