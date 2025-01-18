let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turnO = true;
let gameOver = false;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game state
const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and clear their content
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Display the winner and stop the game
const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
};

// Check for a winner based on win patterns
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner:", pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        gameOver = true;
    }
};

// Add click events to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return; // Prevent further clicks if the game is over

        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            checkWinner();
        }
    });
});

// Event listeners for reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
