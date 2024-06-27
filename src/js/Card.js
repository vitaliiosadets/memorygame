export class Card {
    constructor(id, matchContent, cardContainer) {
        this.id = id;
        this.matchContent = matchContent;
        this.cardContainer = cardContainer;
        this.isFlipped = false;
        this.isMatched = false;
        this.cardElement = null;
        this.createCard();
    }

    createCard = () => {
        this.cardElement = document.createElement("div");
        this.cardElement.classList.add("card");
        this.cardElement.id = this.id;
        this.cardElement.dataset.matchContent = this.matchContent;
        this.cardElement.style.width = `90px`
        this.cardElement.style.height = `90px`
        this.cardElement.innerHTML = `
                        <div class="card__front"></div>
                        <div class="card__back">${this.matchContent}</div>
                      `;
        this.cardContainer.appendChild(this.cardElement);
    }

    flipCard = () => {
        this.isFlipped = !this.isFlipped;
        this.cardElement.classList.toggle('card__flipped')
    }

    matchCard() {
        this.isMatched = true;
        this.cardElement.classList.add("card__matched");
    }
}
