const panels = document.querySelectorAll(".panel");
const startButton = document.getElementById("start");
const timerDisplay = document.getElementById("time");
const colors = ["yellow", "green", "blue", "red"];
let sequence = [];
let playerSequence = [];
let level = 0;
let canClick = false;
let timeLeft = 10; // Initial time
let flashSpeed = 1000; // Initial flash speed (ms)
let timerInterval;

// Function to flash a panel
function flashPanel(color) {
    const panel = document.querySelector(`.${color}`);
    panel.style.opacity = "0.5";
    setTimeout(() => {
        panel.style.opacity = "1";
    }, flashSpeed / 2);
}

// Function to update the timer
function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        alert("⏳ Time's up! Game Over.");
        resetGame();
    }
}

// Function to start the countdown
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10 - level; // Reduce time as levels progress
    if (timeLeft < 3) timeLeft = 3; // Minimum 3 seconds

    updateTimer();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Function to play the sequence
function playSequence() {
    canClick = false;
    playerSequence = [];
    let i = 0;
    startTimer(); // Start the timer when sequence plays

    const interval = setInterval(() => {
        flashPanel(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            canClick = true;
        }
    }, flashSpeed);
}

// Function to generate a new sequence step
function nextSequence() {
    if (level < 5) {  // Limiting to 5 steps for Easy Mode
        sequence.push(colors[Math.floor(Math.random() * 4)]);
        level++;
        flashSpeed *= 0.85; // Make flashing faster (15% decrease per level)
        if (flashSpeed < 300) flashSpeed = 300; // Prevent it from getting too fast
        playSequence();
    } else {
        alert("🎉 Congratulations! You completed Easy Mode!");
        resetGame();
    }
}

// Function to check player's input
function checkInput(index) {
    if (playerSequence[index] !== sequence[index]) {
        alert("Game Over! You made a mistake.");
        resetGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        setTimeout(nextSequence, 1000);
    }
}

// Function to handle player clicks
panels.forEach((panel) => {
    panel.addEventListener("click", () => {
        if (!canClick) return;

        const color = panel.dataset.color;
        flashPanel(color);
        playerSequence.push(color);
        checkInput(playerSequence.length - 1);
    });
});

// Function to reset the game
function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    flashSpeed = 1000; // Reset flash speed
    canClick = false;
    clearInterval(timerInterval);
    timerDisplay.textContent = "10";
}

// Function to start the game
function startGame() {
    alert("Get ready! The game is starting!");
    resetGame();
    nextSequence();
}

// Start game on button click
startButton.addEventListener("click", startGame);