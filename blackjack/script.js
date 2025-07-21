let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;
let wins = 0;
let losses = 0;

const dealSound = document.getElementById("deal-sound");
dealSound.volume = 0.3;

document.getElementById("volume").addEventListener("input", (e) => {
  dealSound.volume = parseFloat(e.target.value);
});

function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let newDeck = [];

  for (let suit of suits) {
    for (let value of values) {
      newDeck.push({ value, suit });
    }
  }
  return newDeck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startGame() {
  deck = createDeck();
  shuffle(deck);
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  gameOver = false;
  updateDisplay();
  playSound();
}

function drawCard() {
  return deck.pop();
}

function getCardValue(card) {
  if (["J", "Q", "K"].includes(card.value)) return 10;
  if (card.value === "A") return 11;
  return parseInt(card.value);
}

function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;

  for (let card of hand) {
    score += getCardValue(card);
    if (card.value === "A") aceCount++;
  }

  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
}

function updateDisplay() {
  document.getElementById("player-cards").innerHTML = renderHand(playerHand);
  document.getElementById("dealer-cards").innerHTML = renderHand(dealerHand, gameOver);
  document.getElementById("player-score").textContent = `Score: ${calculateScore(playerHand)}`;
  document.getElementById("dealer-score").textContent = gameOver
    ? `Score: ${calculateScore(dealerHand)}`
    : `Score: ?`;
  document.getElementById("message").textContent = getGameMessage();
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
}

function renderHand(hand, showAll = true) {
  return hand
    .map((card, i) => {
      if (!showAll && i === 1) {
        return `<div class="card back"></div>`;
      }
      return `<div class="card">${card.value}${card.suit}</div>`;
    })
    .join("");
}

function hit() {
  if (gameOver) return;
  playerHand.push(drawCard());
  playSound();
  const score = calculateScore(playerHand);
  if (score > 21) {
    gameOver = true;
    losses++;
  }
  updateDisplay();
}

function stand() {
  if (gameOver) return;
  gameOver = true;

  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(drawCard());
    playSound();
  }

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  if (
    (playerScore > dealerScore && playerScore <= 21) ||
    (dealerScore > 21 && playerScore <= 21)
  ) {
    wins++;
  } else if (dealerScore !== playerScore) {
    losses++;
  }

  updateDisplay();
}

function getGameMessage() {
  if (!gameOver) return "";

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  if (playerScore > 21) return "You busted! Dealer wins.";
  if (dealerScore > 21) return "Dealer busted! You win!";
  if (playerScore > dealerScore) return "You win!";
  if (dealerScore > playerScore) return "Dealer wins!";
  return "It's a draw!";
}

function restartGame() {
  startGame();
}

function resetStats() {
  wins = 0;
  losses = 0;
  updateDisplay();
}

function playSound() {
  if (dealSound) {
    dealSound.currentTime = 0;
    dealSound.play();
  }
}

startGame();

