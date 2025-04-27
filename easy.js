const colors = ['teal', 'lightblue', 'pink', 'lightyellow'];
let simonSequence = [];
let score = 0;
let highScore = 0;
let clickable = false;
let userSequence = [];
const panels = document.querySelectorAll('.panel');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');

// Flashes the panel
function flash(color) {
    const panel = document.querySelector('.' + color); // Selecting the panel by class
    panel.style.filter = 'brightness(1.5)'; // Lighten the color
    setTimeout(function() {
        panel.style.filter = 'brightness(1)'; // Reset the color back to normal
    }, 300);
}

// Play Simon's turn && puts simon's into an array
function playSimon() {
    clickable = false;  // Prevent user from clicking during Simon's turn
    userSequence = [];  // Reset user sequence each round

    // Add a random color to the Simon sequence
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    simonSequence.push(randomColor);

    // Loop through the simonSequence and flash each color
    for (let i = 0; i < simonSequence.length; i++) {
        // Flash each color with a delay of 600ms between each
        setTimeout(() => {
            flash(simonSequence[i]);
        }, i * 600); // Delay each flash by multiplying 600ms by the index
    }

    // After the last color has flashed, allow the user to interact
    setTimeout(() => {
        clickable = true;
    }, simonSequence.length * 600);  // Wait until the last color has been flashed
}

// Handle user click
function handleUserClick(e) { // estands for the event 
    // If it's not the user's turn, return early
    if (!clickable) return;

    // Get the color that was clicked
    // e.target refers or takes element that was clicked nung mga panel
    // e.target.getAttribute('data-color') ginakuha nya nung data-color like si teal, pink, etc
    const color = e.target.getAttribute('data-color');
    userSequence.push(color);  // Adds/push the clicked color to the user's sequence

    // Loop through the user sequence to check if it matches Simon's sequence
    for (let i = 0; i < userSequence.length; i++) {
        // If any color in the user's sequence is wrong, end the game
        if (userSequence[i] !== simonSequence[i]) {
            endGame();
            return;
        }
    }

    // If the user sequence is correct, update score
    score++;
    updateScore();

    // If the user has completed the entire sequence correctly, continue to the next round
    if (userSequence.length === simonSequence.length) {
        setTimeout(() => {
            playSimon();  // Play the next round for Simon
        }, 1000);  // Wait for 1 second before starting the next round
    }
}

// Update the score display
function updateScore() {
    // Directly manipulate the innerHTML to update the score
    scoreDisplay.innerHTML = "Score: " + score;

    // Use a simple inline style to create the "flash" effect instead of adding/removing classes
    scoreDisplay.style.transition = "color 0.3s"; // Make the color change smoothly
    scoreDisplay.style.color = "yellow";  // Flash the score text to yellow

    // After 300ms, reset the color back to white (or your desired color)
    setTimeout(() => {
        scoreDisplay.style.color = "white";
    }, 300);

    // Update the high score if necessary
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = "High Score: " + highScore;
    }
}

// End the game if user clicks the wrong color
function endGame() {
    clickable = false;
    gameOverText.innerHTML = `Game Over<br>Final Score: ${score}<br>High Score: ${highScore}`;
    gameOverScreen.style.display = 'flex';
}

// Restart the game when the "Play Again" button is clicked
document.getElementById('play-again').addEventListener('click', () => {
    resetGame();
    gameOverScreen.style.display = 'none'; // Hide game over screen
    playSimon(); // Restart the game
});

// Reset all game settings
function resetGame() {
    simonSequence = [];
    userSequence = [];
    score = 0;
    clickable = false;
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
