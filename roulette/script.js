document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let rouletteWins = 0;
    let rouletteLosses = 0;
    let currentBetAmount = 10;
    let balance = 1000;
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
  
    // DOM elements
    const betTypeSelect = document.getElementById('bet-type');
    const betOptionsDiv = document.getElementById('bet-options');
    const betAmountControl = document.getElementById('bet-amount-control');
    const spinBtn = document.getElementById('spin-btn');
    const resultDiv = document.getElementById('roulette-result');
    const winsSpan = document.getElementById('roulette-wins');
    const lossesSpan = document.getElementById('roulette-losses');
    const resetStatsBtn = document.getElementById('roulette-reset-stats');
    const balanceDisplay = document.getElementById('balance-display');
  
    // Initialize the game
    function init() {
      createBetAmountControl();
      updateBetOptions();
      setupEventListeners();
      updateBalanceDisplay();
    }
  
    // Create bet amount controls
    function createBetAmountControl() {
      betAmountControl.innerHTML = `
        <label for="bet-amount">Bet Amount: $</label>
        <input type="number" id="bet-amount" min="1" max="${balance}" value="${currentBetAmount}">
        <button id="increase-bet">+5</button>
        <button id="decrease-bet">-5</button>
      `;
      
      const betAmountInput = document.getElementById('bet-amount');
      const increaseBtn = document.getElementById('increase-bet');
      const decreaseBtn = document.getElementById('decrease-bet');
      
      betAmountInput.addEventListener('change', updateBetAmount);
      increaseBtn.addEventListener('click', () => adjustBetAmount(5));
      decreaseBtn.addEventListener('click', () => adjustBetAmount(-5));
    }
  
    // Update bet amount
    function updateBetAmount() {
      const betAmountInput = document.getElementById('bet-amount');
      currentBetAmount = Math.min(Math.max(1, parseInt(betAmountInput.value) || 1), balance);
      betAmountInput.value = currentBetAmount;
    }
  
    // Adjust bet amount by increment
    function adjustBetAmount(increment) {
      currentBetAmount = Math.min(Math.max(1, currentBetAmount + increment), balance);
      document.getElementById('bet-amount').value = currentBetAmount;
    }
  
    // Update bet options based on selected bet type
    function updateBetOptions() {
      const betType = betTypeSelect.value;
      let optionsHTML = '';
      
      switch(betType) {
        case 'number':
          optionsHTML = `
            <label for="number-bet">Pick a number (0-36):</label>
            <select id="specific-bet">
              ${Array.from({length: 37}, (_, i) => `<option value="${i}">${i}</option>`).join('')}
            </select>
          `;
          break;
        case 'color':
          optionsHTML = `
            <label for="color-bet">Pick a color:</label>
            <select id="specific-bet">
              <option value="red">Red (Pays 1:1)</option>
              <option value="black">Black (Pays 1:1)</option>
              <option value="green">Green (0) (Pays 35:1)</option>
            </select>
          `;
          break;
        case 'evenodd':
          optionsHTML = `
            <label for="evenodd-bet">Even or Odd:</label>
            <select id="specific-bet">
              <option value="even">Even (Pays 1:1)</option>
              <option value="odd">Odd (Pays 1:1)</option>
            </select>
          `;
          break;
      }
      
      betOptionsDiv.innerHTML = optionsHTML;
      resultDiv.textContent = '';
    }
  
    // Spin the roulette wheel
    function spinRoulette() {
      if (currentBetAmount > balance) {
        resultDiv.textContent = "Insufficient balance for this bet!";
        return;
      }
      
      // Deduct bet and update UI
      balance -= currentBetAmount;
      updateBalanceDisplay();
      spinBtn.disabled = true;
      
      // Determine winning number and color
      const winningNumber = Math.floor(Math.random() * 37);
      const winningColor = getNumberColor(winningNumber);
      
      // Check if player won
      const betType = betTypeSelect.value;
      const playerBet = document.getElementById('specific-bet').value;
      const { playerWins, payoutMultiplier } = checkWin(betType, playerBet, winningNumber, winningColor);
      
      // Animate the spin
      animateSpin(winningNumber, winningColor, playerWins, payoutMultiplier);
    }
  
    // Check if player won
    function checkWin(betType, playerBet, winningNumber, winningColor) {
      let playerWins = false;
      let payoutMultiplier = 1;
      
      switch(betType) {
        case 'number':
          playerWins = (parseInt(playerBet) === winningNumber);
          payoutMultiplier = 35;
          break;
        case 'color':
          playerWins = (playerBet === winningColor);
          payoutMultiplier = (winningColor === 'green') ? 35 : 1;
          break;
        case 'evenodd':
          if (winningNumber === 0) {
            playerWins = false; // 0 is neither even nor odd
          } else {
            const isEven = winningNumber % 2 === 0;
            playerWins = (playerBet === 'even') ? isEven : !isEven;
          }
          payoutMultiplier = 1;
          break;
      }
      
      return { playerWins, payoutMultiplier };
    }
  
    // Animate the spin
    function animateSpin(winningNumber, winningColor, playerWins, payoutMultiplier) {
      let spinCount = 0;
      const spinInterval = setInterval(() => {
        spinCount++;
        const tempNumber = Math.floor(Math.random() * 37);
        const tempColor = getNumberColor(tempNumber);
        resultDiv.textContent = `Spinning... ${tempNumber} (${tempColor})`;
        
        if (spinCount > 10) {
          clearInterval(spinInterval);
          finishSpin(winningNumber, winningColor, playerWins, payoutMultiplier);
        }
      }, 100);
    }
  
    // Finish the spin and show results
    function finishSpin(winningNumber, winningColor, playerWins, payoutMultiplier) {
      spinBtn.disabled = false;
      
      if (playerWins) {
        const winnings = currentBetAmount * payoutMultiplier;
        balance += winnings + currentBetAmount;
        rouletteWins++;
        resultDiv.innerHTML = `
          You won $${winnings}! The ball landed on ${winningNumber} (${winningColor}). 🎉<br>
          Payout: ${payoutMultiplier}:1
        `;
      } else {
        rouletteLosses++;
        resultDiv.innerHTML = `
          You lost. The ball landed on ${winningNumber} (${winningColor}). 😞<br>
          Try again!
        `;
      }
      
      updateStats();
      updateBalanceDisplay();
      document.getElementById('bet-amount').max = balance;
    }
  
    // Get color of a number
    function getNumberColor(number) {
      if (number === 0) return 'green';
      return redNumbers.includes(number) ? 'red' : 'black';
    }
  
    // Update balance display
    function updateBalanceDisplay() {
      balanceDisplay.textContent = `Balance: $${balance}`;
    }
  
    // Update stats display
    function updateStats() {
      winsSpan.textContent = rouletteWins;
      lossesSpan.textContent = rouletteLosses;
    }
  
    // Reset game stats
    function resetStats() {
      if (confirm("Are you sure you want to reset your stats and balance?")) {
        rouletteWins = 0;
        rouletteLosses = 0;
        balance = 1000;
        currentBetAmount = 10;
        document.getElementById('bet-amount').value = currentBetAmount;
        document.getElementById('bet-amount').max = balance;
        updateStats();
        updateBalanceDisplay();
        resultDiv.textContent = '';
      }
    }
  
    // Set up event listeners
    function setupEventListeners() {
      betTypeSelect.addEventListener('change', updateBetOptions);
      spinBtn.addEventListener('click', spinRoulette);
      resetStatsBtn.addEventListener('click', resetStats);
    }
  
    // Initialize the game
    init();
  });