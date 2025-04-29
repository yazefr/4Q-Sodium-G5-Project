const colors = ['teal', 'lightblue', 'pink', 'lightyellow'];
let simonSequence = [];
let score = 0;
let highScore = 0;
let clickable = false;
let userSequence = [];
let flashSpeed = 600; // starting flash speed (ms)

const panels = document.querySelectorAll('.panel');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');

// Flash the panel
function flash(color) {
    const panel = document.querySelector('.' + color);
    panel.style.filter = 'brightness(1.5)';
    panel.style.transform = 'scale(1.1)';
    setTimeout(function() {
        panel.style.filter = 'brightness(1)';
        panel.style.transform = 'scale(1)';
    }, 300);
}

// Play Simon's turn
function playSimon() {
    clickable = false;
    userSequence = [];

    // Add 10 random colors each round
    for (let j = 0; j < 10; j++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        simonSequence.push(randomColor);
    }

    // Flash all colors in the sequence
    for (let i = 0; i < simonSequence.length; i++) {
        setTimeout(() => {
            flash(simonSequence[i]);
        }, i * flashSpeed);
    }

    setTimeout(() => {
        clickable = true;
    }, simonSequence.length * flashSpeed);
}

// Handle user click
function handleUserClick(e) {
    if (!clickable) return;

    const color = e.target.getAttribute('data-color');
    if (!color) return; // Ignore clicks on elements without a valid data-color

    userSequence.push(color);

    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== simonSequence[i]) {
            endGame();
            return;
        }
    }

    score++;
    updateScore();

    if (userSequence.length === simonSequence.length) {
        setTimeout(() => {
            playSimon();
        }, 1000);
    }
}

// Update score
function updateScore() {
    scoreDisplay.innerHTML = "Score: " + score;
    scoreDisplay.style.transition = "color 0.3s";
    scoreDisplay.style.color = "yellow";
    setTimeout(() => {
        scoreDisplay.style.color = "white";
    }, 300);

    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = "High Score: " + highScore;
    }

    // Speed up flash every 10 points
    if (score % 10 === 0 && flashSpeed > 200) {
        flashSpeed -= 50;
    }
}

// End the game
function endGame() {
    clickable = false;
    gameOverText.innerHTML = `Game Over<br>Final Score: ${score}<br>High Score: ${highScore}`;
    gameOverScreen.style.display = 'flex';
}

// Restart the game
document.getElementById('play-again').addEventListener('click', () => {
    resetGame();
    gameOverScreen.style.display = 'none';
    playSimon();
});

// Reset everything
function resetGame() {
    simonSequence = [];
    userSequence = [];
    score = 0;
    clickable = false;
    flashSpeed = 600; // Reset flash speed!
    updateScore();
}

// Event Listeners
panels.forEach(panel => {
    panel.addEventListener('click', handleUserClick);
});

startButton.addEventListener('click', () => {
    resetGame();
    playSimon();
});
