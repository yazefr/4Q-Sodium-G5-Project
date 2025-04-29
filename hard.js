const colors = ['teal', 'lightblue', 'pink', 'lightyellow'];
let simonSequence = [];
let score = 0;
let highScore = 0;
let clickable = false;
let userSequence = [];
let flashSpeed = 600; // starting flash speed in ms

const panels = document.querySelectorAll('.panel');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');

// Flash a panel by increasing brightness and applying glow effect
function flash(color) {
    const panel = document.querySelector('.' + color);
    panel.style.transition = 'filter 0.2s, box-shadow 0.2s';
    panel.style.filter = 'brightness(1.5)';
    panel.style.boxShadow = '0 0 20px white';

    // Reset flash after 300ms
    setTimeout(function () {
        panel.style.filter = 'brightness(1)';
        panel.style.boxShadow = 'none';
    }, 300);
}

// Start Simon's turn
function playSimon() {
    clickable = false;     // Disable user input
    userSequence = [];     // Clear user input

    // Add 5 random colors to the sequence
    for (let j = 0; j < 5; j++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        simonSequence.push(randomColor);
    }

    // Flash each color in sequence with timing
    for (let i = 0; i < simonSequence.length; i++) {
        setTimeout(() => {
            flash(simonSequence[i]);
        }, i * flashSpeed);
    }

    // Enable user input after sequence is shown
    setTimeout(() => {
        clickable = true;
    }, simonSequence.length * flashSpeed);
}

// Handle user clicks on panels
function handleUserClick(e) {
    if (!clickable) return; // Ignore if input isn't allowed

    const color = e.target.getAttribute('data-color');
    if (!color) return; // Ignore clicks without valid color

    userSequence.push(color);
    flash(color); // Flash feedback on user click

    // Check user input against Simon's sequence
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== simonSequence[i]) {
            endGame();
            return;
        }
    }

    // Increase score and update display
    score++;
    updateScore();

    // If full sequence matched, play next round
    if (userSequence.length === simonSequence.length) {
        setTimeout(() => {
            playSimon();
        }, 1000);
    }
}

// Update current and high score
function updateScore() {
    scoreDisplay.innerHTML = "Score: " + score;
    scoreDisplay.style.transition = "color 0.3s";
    scoreDisplay.style.color = "yellow";

    // Return to white after a brief animation
    setTimeout(() => {
        scoreDisplay.style.color = "white";
    }, 300);

    // Update high score if beaten
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = "High Score: " + highScore;
    }

    // Increase difficulty every 10 points by speeding up
    if (score % 10 === 0 && flashSpeed > 200) {
        flashSpeed -= 50;
    }
}

// Show game over screen
function endGame() {
    clickable = false;
    gameOverText.innerHTML = `Game Over<br>Final Score: ${score}<br>High Score: ${highScore}`;
    gameOverScreen.style.display = 'flex';

    // Optionally show start button again
    startButton.style.display = 'inline-block';
}

// Restart game on "Play Again" button
document.getElementById('play-again').addEventListener('click', () => {
    resetGame();
    gameOverScreen.style.display = 'none';
    playSimon();
});

// Reset game state
function resetGame() {
    simonSequence = [];
    userSequence = [];
    score = 0;
    clickable = false;
    flashSpeed = 600; // reset to initial speed
    updateScore();
}

// Attach click events to all color panels
panels.forEach(panel => {
    panel.addEventListener('click', handleUserClick);
});

// Start game on Start button click
startButton.addEventListener('click', () => {
    startButton.style.display = 'none'; // Hide Start button after click
    resetGame();
    playSimon();
});
