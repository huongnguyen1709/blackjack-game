let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = '';

let messageEl = document.getElementById('message-el');
let sumEl = document.querySelector('#sum-el');
let cardsEl = document.getElementById('cards-el');

let startGameBtn = document.getElementById('startGame-btn');
let newCardBtn = document.getElementById('newCard-btn');
let resetGameBtn = document.getElementById('resetGame-btn');

let player = {
  name: 'Peter',
  chips: 145,
};

let playerEl = document.getElementById('player-el');
playerEl.textContent = player.name + `: €${player.chips}`;

// Make this function returns a random number between 1 and 13
function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
  // if 1 => return 11
  // if 11 - 13 => return 10 because The Jack, Queen, and King count as 10
  if (randomCard === 1) return 11;
  else if (randomCard > 10) return 10;
  else return randomCard;
}

function startGame() {
  isAlive = true;
  // generate 2 random number
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
  startGameBtn.disabled = true;
  resetGameBtn.disabled = false;
  newCardBtn.disabled = false;
}

function renderGame() {
  cardsEl.textContent = 'Cards: ';
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ' ';
  }

  sumEl.textContent = 'Sum: ' + sum;

  if (sum < 21) {
    message = 'Do you want to draw a new card?';
  } else if (sum === 21) {
    message = "Wohoo! You've got Blackjack!";
    hasBlackJack = true;
    startGameBtn.disabled = false;
  } else {
    message = "You're out of the game!";
    isAlive = false;
    startGameBtn.disabled = false;
    newCardBtn.disabled = true;
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    cards.push(card);
    sum += card;
    renderGame();
  }
}

function resetGame() {
  isAlive = false;
  startGameBtn.disabled = false;
  resetGameBtn.disabled = true;
  cards = [];
  sum = 0;
  cardsEl.textContent = 'Cards: ';
  sumEl.textContent = 'Sum: ';
}
