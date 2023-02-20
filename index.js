// player
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
let showDownBtn = document.getElementById('showDown-btn');
let resetGameBtn = document.getElementById('resetGame-btn');

let player = {
  name: 'Peter',
  chips: 145,
};

let playerEl = document.getElementById('player-el');
playerEl.textContent = player.name + `: €${player.chips}`;

// dealer
let dealerCards = [];
let dealerSum = 0;

let dealerSumEl = document.querySelector('#dealerSum-el');
let dealerCardsEl = document.getElementById('dealerCards-el');

// Make this function returns a random number between 1 and 13
function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
  // if 1 => return 11
  // if 11 - 13 => return 10 because The Jack, Queen, and King count as 10
  if (randomCard === 1) return 11;
  else if (randomCard > 10) return 10;
  else return randomCard;
}

function renderDealer() {
  // generate 2 random number cards for dealer
  let firstDealerCard = getRandomCard();
  let secondDealerCard = getRandomCard();

  dealerCards = [firstDealerCard, secondDealerCard];
  dealerSum = firstDealerCard + secondDealerCard;

  // generate more cards untill dealerSum >= 18
  if (dealerSum < 18) {
    do {
      let dealerCard = getRandomCard();
      dealerCards.push(dealerCard);
      dealerSum += dealerCard;
    } while (dealerSum < 18);
  }
}

function startGame() {
  isAlive = true;

  // generate 2 random number cards for player
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();

  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  renderDealer();
  renderGame();

  startGameBtn.disabled = true;
  resetGameBtn.disabled = false;
  newCardBtn.disabled = false;

  if (sum > 15) showDownBtn.disabled = false;
}

function renderGame() {
  cardsEl.textContent = 'Cards: ';
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ' ';
  }

  sumEl.textContent = 'Sum: ' + sum;
  if (sum > 15) showDownBtn.disabled = false;

  if (sum < 21) {
    message = 'Do you want to draw a new card?';
  } else if (sum === 21) {
    message = "Wohoo! You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;

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

function showDown() {
  if (dealerSum > 21 && sum < 22) {
    message = 'Congratulation! You win!';
  } else if (dealerSum > 21 && sum > 21) {
    message = 'You draw! Do you want to try one more game!';
  } else if (sum < 22 && sum > dealerSum) {
    message = 'Congratulation! You win!';
  } else if (sum < 22 && sum === dealerSum) {
    message = 'You draw! Do you want to try one more game!';
  } else message = 'Oops! You lose! Good luck next time!';

  messageEl.textContent = message;

  dealerCardsEl.textContent = 'Dealer Cards: ';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsEl.textContent += dealerCards[i] + ' ';
  }

  dealerSumEl.textContent = 'Dealer Sum: ' + dealerSum;

  newCardBtn.disabled = true;
  showDownBtn.disabled = true;
  isAlive = false;
}

function resetGame() {
  isAlive = false;
  hasBlackJack = false;
  startGameBtn.disabled = false;
  resetGameBtn.disabled = true;
  newCardBtn.disabled = true;
  cards = [];
  sum = 0;
  cardsEl.textContent = 'Cards: ';
  sumEl.textContent = 'Sum: ';

  dealerCardsEl.textContent = 'Dealer Cards: ';
  dealerSumEl.textContent = 'Dealer Sum: ';
}
