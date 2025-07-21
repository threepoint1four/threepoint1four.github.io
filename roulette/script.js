const betTypeSelect = document.getElementById('bet-type');
const betOptionsDiv = document.getElementById('bet-options');
const spinBtn = document.getElementById('spin-btn');
const resultDiv = document.getElementById('roulette-result');
const winsSpan = document.getElementById('roulette-wins');
const lossesSpan = document.getElementById('roulette-losses');
const resetStatsBtn = document.getElementById('roulette-reset-stats');

let rouletteWins = 0;
let rouletteLosses = 0;

const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

function createNumberOptions() {
  let options = '<label for="number-bet">Pick a number (0-36):</label><select id="number-bet">';
  for(let i=0; i<=36; i++) {
    options += `<option value="${i}">${i}</option>`;
  }
  options += '</select>';
  betOptionsDiv.innerHTML = options;
}

function createColorOptions() {
  betOptionsDiv.innerHTML = `
    <label for="color-bet">Pick a color:</label>
    <select id="color-bet">
      <option value="red">Red</option>
      <option value="black">Black</option>
      <option value="green">Green (0)</option>
    </select>
  `;
}

function resetResult() {
  resultDiv.textContent = '';
}

betTypeSelect.addEventListener('change', () => {
  if (betTypeSelect.value === 'number') {
    createNumberOptions();
  } else {
    createColorOptions();
  }
  resetResult();
});

spinBtn.addEventListener('click', () => {
  const winningNumber = Math.floor(Math.random() * 37);
  let winningColor = 'green';
  if (redNumbers.includes(winningNumber)) winningColor = 'red';
  else if (blackNumbers.includes(winningNumber)) winningColor = 'black';

  let playerWins = false;
  const betType = betTypeSelect.value;

  if (betType === 'number') {
    const playerNumber = parseInt(document.getElementById('number-bet').value);
    playerWins = (playerNumber === winningNumber);
  } else {
    const playerColor = document.getElementById('color-bet').value;
    playerWins = (playerColor === winningColor);
  }

  if (playerWins) {
    rouletteWins++;
    resultDiv.textContent = `You won! The ball landed on ${winningNumber} (${winningColor}). 🎉`;
  } else {
    rouletteLosses++;
    resultDiv.textContent = `You lost. The ball landed on ${winningNumber} (${winningColor}). 😞`;
  }

  winsSpan.textContent = rouletteWins;
  lossesSpan.textContent = rouletteLosses;
});

resetStatsBtn.addEventListener('click', () => {
  rouletteWins = 0;
  rouletteLosses = 0;
  winsSpan.textContent = rouletteWins;
  lossesSpan.textContent = rouletteLosses;
  resetResult();
});

// initialize with number options by default
createNumberOptions();
