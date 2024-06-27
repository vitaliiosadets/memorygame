export class Card {
    constructor(card, id, matchContent, cardContainer) {
        this.card = card;
        this.id = id;
        this.matchContent = matchContent;
        this.cardContainer = cardContainer;
        this.isFlipped = false;
        this.isMatched = false;
        this.createCard();
    }

    createCard = () => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.id = this.id;
        newCard.dataset.matchContent = this.matchContent;
        newCard.style.width = `90px`
        newCard.style.height = `90px`
        newCard.innerHTML = `
                        <div class="card__front"></div>
                        <div class="card__back">${this.card}</div>
                      `;
        this.cardContainer.appendChild(newCard);
    }

    flipCard = () => {
        this.isFlipped = !this.isFlipped;
        const cardElement = document.getElementById(this.id)
        cardElement.classList.toggle('card__flipped')
    }

    matchCard() {
        this.isMatched = true;
        const cardElement = document.getElementById(this.id)
        cardElement.classList.add("card__matched");
    }
}
