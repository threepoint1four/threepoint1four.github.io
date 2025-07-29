const weekdayNames = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

let currentDate = null;

function zeller(day, month, year) {
  if (month < 3) {
    month += 12;
    year -= 1;
  }

  const q = day;
  const m = month;
  const k = year % 100;
  const j = Math.floor(year / 100);

  const h = (q + Math.floor((13 * (m + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) + (5 * j)) % 7;
  return h;
}

function getRandomDate() {
  const year = Math.floor(Math.random() * 2024) + 1; // Years 1 to 2024
  const month = Math.floor(Math.random() * 12) + 1;
  const maxDays = new Date(year, month, 0).getDate();
  const day = Math.floor(Math.random() * maxDays) + 1;
  return { day, month, year };
}

function displayDate({ day, month, year }) {
  return `${month}/${day}/${year}`;
}

function generateNewDate() {
  document.getElementById("result").textContent = "";
  currentDate = getRandomDate();

  document.getElementById("date-display").textContent = `What day of the week is ${displayDate(currentDate)}?`;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  weekdayNames.forEach((weekday, index) => {
    const btn = document.createElement("button");
    btn.textContent = weekday;
    btn.onclick = () => checkAnswer(index);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  const correct = zeller(currentDate.day, currentDate.month, currentDate.year);
  const resultText = document.getElementById("result");

  if (index === correct) {
    resultText.textContent = "✅ Correct!";
    resultText.style.color = "lightgreen";
  } else {
    resultText.textContent = `❌ Nope — it was ${weekdayNames[correct]}.`;
    resultText.style.color = "salmon";
  }
}

generateNewDate();
