// Audio //
const audio = document.getElementById("soundtrack");
audio.volume = 0.4;

const hoverSound = document.getElementById("hoverSound");

const rockImgA = document.querySelector(".gameBoard .playerSection .playerImg #rock");
const paperImgA = document.querySelector(".gameBoard .playerSection .playerImg #paper");
const scissorsImgA = document.querySelector(".gameBoard .playerSection .playerImg #scissors");

rockImgA.addEventListener("mouseenter", playHoverSound);
paperImgA.addEventListener("mouseenter", playHoverSound);
scissorsImgA.addEventListener("mouseenter", playHoverSound);

function playHoverSound() {
    hoverSound.currentTime = 0;
    hoverSound.play();
}

// Game Logic //
const roundsInt = 5;
let userScore = 0;
let computerScore = 0;
let tieScore = 0;

function getUserChoice(choice) {
    return choice;
}

function getComputerChoice() {
    const randomInt = Math.random();
    if (randomInt < 0.33) {
        return "rock";
    } else if (randomInt < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(playerSelection, computerSelection) {
    const playerChoiceElement = document.getElementById("red" + capitalizeFirstLetter(playerSelection));
    const computerChoiceElement = document.getElementById("blue" + capitalizeFirstLetter(computerSelection));

    playerChoiceElement.style.display = 'block';
    computerChoiceElement.style.display = 'block';

    setTimeout(() => {
        playerChoiceElement.style.display = 'none';
        computerChoiceElement.style.display = 'none';
    }, 4000);

    let result;

    if (playerSelection === computerSelection) {
        result = "It's a tie";
        tieScore++;
    } else if ((playerSelection === "rock" && computerSelection === "scissors") ||
               (playerSelection === "paper" && computerSelection === "rock") ||
               (playerSelection === "scissors" && computerSelection === "paper")) {
        result = "You win";
        userScore++;
    } else {
        result = "Computer wins";
        computerScore++;
    }
    updateScoreDisplay();

    const resultsElement = document.querySelector(".results");
    resultsElement.textContent = result;

    setTimeout(() => {
        resultsElement.textContent = ""; 
    }, 2000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateScoreDisplay() {
    const playerScoreElement = document.querySelector(".playerSection .playerScore");
    const computerScoreElement = document.querySelector(".computerSection .computerScore");
    const tieScoreElement = document.querySelector(".score .ties");

    playerScoreElement.textContent = "Player Score: " + userScore;
    computerScoreElement.textContent = "Computer Score: " + computerScore;
    tieScoreElement.textContent = "Ties: " + tieScore;

    if (userScore >= roundsInt) {
    } else if(computerScore >= roundsInt) {
    }
}



function playGame(playerChoice) {
    if (userScore >= roundsInt - 2 || computerScore >= roundsInt - 2) {
        endGame();
        return;
    }

    const playerChoiceElements = document.querySelectorAll('.playerChoice img');
    const computerChoiceElements = document.querySelectorAll('.computerChoice img');

    playerChoiceElements.forEach(img => img.style.display = 'none');
    computerChoiceElements.forEach(img => img.style.display = 'none');

    let playerChoiceElement, computerChoiceElement;

    if (playerChoice === "rock") {
        playerChoiceElement = document.getElementById("redRock");
    } else if (playerChoice === "paper") {
        playerChoiceElement = document.getElementById("redPaper");
    } else if (playerChoice === "scissors") {
        playerChoiceElement = document.getElementById("redScissors");
    }

    playerChoiceElement.style.display = 'block';

    startTimer(() => {
        const computerChoice = getComputerChoice();

        if (computerChoice === "rock") {
            computerChoiceElement = document.getElementById("blueRock");
        } else if (computerChoice === "paper") {
            computerChoiceElement = document.getElementById("bluePaper");
        } else if (computerChoice === "scissors") {
            computerChoiceElement = document.getElementById("blueScissors");
        }

        computerChoiceElement.style.display = 'block';

        const result = playRound(playerChoice, computerChoice);

        const resultSound = new Audio("./sfx/result.wav");
        resultSound.play();

        setTimeout(() => {
            playerChoiceElements.forEach(img => img.style.display = 'none'); 
            computerChoiceElements.forEach(img => img.style.display = 'none');
        }, 1000);
    });
}

document.getElementById("rock").addEventListener("click", function() {
    playGame("rock");
});

document.getElementById("paper").addEventListener("click", function() {
    playGame("paper");
});

document.getElementById("scissors").addEventListener("click", function() {
    playGame("scissors");
});

function endGame() {
    const winnerDiv = document.querySelector(".winnerDiv");
    const winnerText = userScore > computerScore ? "You win!" : "Computer wins!";
    winnerDiv.innerHTML = `<h2>${winnerText}</h2><button class="reset">Play Again?</button>`
    const winSound = new Audio("./sfx/result.wav");
    winSound.play();
    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", resetGame);
}

function startTimer(callback) {
    let seconds = 3;
    const timerInterval = setInterval(() => {
        const countdownSound = new Audio("./sfx/timer.wav");
        countdownSound.play();
        seconds--;
        if (seconds <= 0) {
            clearInterval(timerInterval);
            callback();
        }
    }, 1000);
}