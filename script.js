function getUserChoice() {
    let userInput = prompt("Rock, Paper or Scissors? Your Move!").toLowerCase();
    if (userInput === "rock" || userInput === "paper" || userInput === "scissors") {
        return userInput;
    } else {
        console.log("Invalid choice. Please choose Rock, Paper, or Scissors.");
        return getUserChoice();
    }
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
    if (playerSelection === computerSelection) {
        return "It's a tie"; 
    } else if ((playerSelection === "rock" && computerSelection === "scissors") ||
               (playerSelection === "paper" && computerSelection === "rock") ||
               (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "You win";
    } else {
        return "Computer wins";
    }
}

let userScore = 0;
let computerScore = 0;

function playGame() {
    for (let i = 0; i < roundsInt; i++) {
        const playerSelection = getUserChoice();
        const computerSelection = getComputerChoice();
        const result = playRound (playerSelection, computerSelection);
    console.log(result);
    if (result === "You win") {
        userScore++;
    } else if (result === "Computer wins") {
        computerScore++;
    }
    console.log("Final Score - You: " + userScore + " Computer: " + computerScore);
    }
}

const roundsInt = 5;
playGame(roundsInt);