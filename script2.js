// JavaScript file: script.js

// Constants for the game
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Get DOM elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.grid');
const messageElement = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const messageContainer = document.getElementById('message');

// Initialize game state
let oTurn;

startGame();

restartButton.addEventListener('click', startGame);

// Function to start a new game
function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS, O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    messageContainer.style.display = 'none';
}

// Function to handle a click event on a cell
function handleClick(event) {
    const cell = event.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

// Function to place a mark on the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Function to swap turns between players
function swapTurns() {
    oTurn = !oTurn;
}

// Function to set the hover class on the board
function setBoardHoverClass() {
    board.classList.remove(X_CLASS, O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

// Function to check for a win condition
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

// Function to check for a draw condition
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

// Function to end the game
function endGame(draw) {
    if (draw) {
        messageElement.textContent = 'Draw!';
    } else {
        messageElement.textContent = `${oTurn ? 'O' : 'X'} Wins!`;
    }
    messageContainer.style.display = 'block';
}
