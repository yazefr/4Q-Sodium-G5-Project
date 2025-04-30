
Conversation opened. 1 unread message.

Skip to content
Using Philippine Science High School - SOCCSKSARGEN Region Campus Mail with screen readers

1 of 738
Fwd: cs
Inbox

SITTIE TAZNIMA MADID
4:11 PM (0 minutes ago)
to me



---------- Forwarded message ---------
From: SITTIE TAZNIMA MADID <stsmadid22@src.pshs.edu.ph>
Date: Wed, Apr 30, 2025 at 4:09 PM
Subject: cs
To: SITTIE TAZNIMA MADID <stsmadid22@src.pshs.edu.ph>, WENDY MAXINE BAGUIO <wendymbaguio@src.pshs.edu.ph>


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

// Function para i flash ang  panel
function flash(color) {
    const panel = document.querySelector('.' + color);    // kunin yung panel by class
    panel.style.filter = 'brightness(1.5)';               
    setTimeout(function () {
        panel.style.filter = 'brightness(1)';             
    }, 300);  // duration 
}

// Turn ni Simon: add new color + i-play ang buong sequence
function playSimon() {
    clickable = false;                          // bawal pa i click        
    userSequence = [];                          // i reset nung user sequence
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // random na kulay
    simonSequence.push(randomColor);            // idagdag sa sequence kaya pushh

    // flash ang buong sequence ni Simon
    for (let i = 0; i < simonSequence.length; i++) {
        setTimeout(function () {
            flash(simonSequence[i]);
        }, i * 600); // may delay bawat kulay
    }

    // after ng sequence, allow na si user mag-click
    setTimeout(function () {
        clickable = true;
    }, simonSequence.length * 600);
}

// Function pto handle the clicks of user in panel
function handleUserClick(e) {
    if (!clickable) return; // ignore kung hindi pa turn ng user

    // alamin kung anong kulay ang pinindot ng user sa game
    const color = e.target.getAttribute('data-color'); 
    userSequence.push(color);                          // idagdag sa user sequence

    // checks bawat pindot kung tama ang sequence kay simon
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== simonSequence[i]) {
            endGame(); // kung may mali, end game agad
            return;
        }
    }

    score++;      // +! sa score
    updateScore();

    // if complete at tama ang sequence, edii next round
    if (userSequence.length == simonSequence.length) {
        setTimeout(function () {
            playSimon();
        }, 1000);               // may konting delay bago mag next round
    }
}

// Function para i-update ang score at high score
function updateScore() {
    scoreDisplay.innerHTML = "Score: " + score;       // display ang current score
    scoreDisplay.style.transition = "color 0.3s";  
    scoreDisplay.style.color = "yellow";              // flash yung score text

    setTimeout(function () {
        scoreDisplay.style.color = "white";           // balik sa original na coplor
    }, 300);

    // check kung need new high score
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = "High Score: " + highScore;
    }
}

// Function para matapos ang game kapag nagkamali si user
function endGame() {
    clickable = false;  // stop user from clicking
    gameOverText.innerHTML = `Game Over<br>Final Score: ${score}<br>High Score: ${highScore}`; // display result
    gameOverScreen.style.display = 'flex';  // show game over screen
    startButton.style.display = 'block';    // ibalik ang start button
}

// Play Again button functions
document.getElementById('play-again').addEventListener('click', function () {
    resetGame();                       // reset game data
    gameOverScreen.style.display = 'none'; // hide game-over screen kaya non
    playSimon();                       // start a new game
});

// Resets all the game values
function resetGame() {
    simonSequence = [];
    userSequence = [];
    score = 0;
    clickable = false;
    updateScore();
}

// Add event listener for eachh panel
panels.forEach(function (panel) {
    panel.addEventListener('click', handleUserClick); // pag-click ng color, mag work si handleUserClick 
});

// Start button function
startButton.addEventListener('click', function () {
    startButton.style.display = 'none'; // hides start button
    resetGame();                        
    playSimon();                       
});
