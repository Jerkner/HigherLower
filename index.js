const newDeckBtn = document.getElementById("newDeckBtn")
const remainingCards = document.getElementById("remainingCards")
const higherBtn = document.getElementById("higherBtn")
const lowerBtn = document.getElementById("lowerBtn")
const cardPlaceholder = document.getElementById("cardPlaceholder")
const gameOverScreen = document.getElementById("gameOverScreen")
const here = document.getElementById("here")

newDeckBtn.addEventListener("click", newDeck)
here.addEventListener("click", newDeck)
higherBtn.addEventListener("click", higher)
lowerBtn.addEventListener("click", lower)

let deckId = ''
let cardsArray = [0, "firstCard"]
let higherCheck = true

// Functions

async function newDeck() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/new/draw/?count=1`);
    const data = await res.json();
    deckId = data.deck_id

    reset()

    cardsArray = [0, "firstCard"]
    cardsArray.pop()
    cardsArray.unshift(convertFaceCards(data.cards[0].value))

    cardPlaceholder.innerHTML = `<img src="${data.cards[0].image}">`
    remainingCards.innerHTML = `Remaining cards:<br>${data.remaining}`
}

async function drawCard() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=1`);
    const data = await res.json();

    cardsArray.pop()
    cardsArray.unshift(convertFaceCards(data.cards[0].value))

    cardPlaceholder.innerHTML = `<img src="${data.cards[0].image}">`
    remainingCards.innerHTML = `Remaining cards:<br>${data.remaining}`

    if (cardsArray[0] < cardsArray[1]) {
        higherCheck = false
    } else {
        higherCheck = true
    }
}

async function higher() {
    await drawCard()
    if (higherCheck === false) {
        gameOver()
    }
}

async function lower() {
    await drawCard()
    if (higherCheck === true && cardsArray[0] !== cardsArray[1]) {
        gameOver()
    }
}

function gameOver() {
    higherBtn.disabled = true;
    lowerBtn.disabled = true;
    gameOverScreen.hidden = false;
}

function reset() {
    higherBtn.disabled = false;
    lowerBtn.disabled = false;
    gameOverScreen.hidden = true;
}

function convertFaceCards(card) {
    switch (card) {
    case '2':
        return 2;
    case '3':
        return 3;
    case '4':
        return 4;
    case '5':
        return 5;
    case '6':
        return 6;
    case '7':
        return 7;
    case '8':
        return 8;
    case '9':
        return 9;
    case '10':
        return 10;
    case 'JACK':
        return 11;
    case 'QUEEN':
        return 12;
    case 'KING':
        return 13;
    case 'ACE':
        return 14;
    default:
        return card;
    }
}

newDeck()