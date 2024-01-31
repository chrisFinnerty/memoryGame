const gameContainer = document.getElementById("game");
const startButton = document.querySelector(".buttons");
const startButtonDiv = document.querySelector(".button-container")

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let flippedCards = []; //an empty arr to store cards/divs for when user clicks on a card/flips them over
let flipCounter = 0; //used to dispaly game over after the num of flipped cards = the arr of COLORS
let locked = false;

let pScoreLoc = document.querySelector('#player-score'); //location of player score value in html
let playerScore = 0; //player score starts out at 0

let hScoreLoc = document.querySelector('#best-score'); //location of best score value in html
let bestScore = localStorage.getItem("best-score"); //retrieving best score from local storage

if (bestScore) {
  document.getElementById("best-score").innerText = bestScore;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp; 
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
let gameCounter = 0;

startButton.addEventListener('click', function (e) {
  if (gameCounter === 0) {
  console.log("Start game!");
  startButton.style.visibility = "hidden";
  gameCounter = 1;
}

  const resetDiv = document.createElement("div");
  resetDiv.classList.add("button-container");
  startButtonDiv.append(resetDiv);

  const resetButton = document.createElement("a");
  resetButton.innerText = "Reset!";
  resetButton.href = "index.html";
  resetButton.classList.add("buttons");
  resetButton.setAttribute('id', 'reset-button');
  resetDiv.append(resetButton);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);
});

const resetButton = document.querySelector("#reset-button");

// TODO: Implement this function!
function handleCardClick(e) {
  if (locked) {
    return;
  }

  let currentCard = e.target;

  if (flippedCards.length < 2 && !flippedCards.includes(currentCard) && !currentCard.classList.contains("match")) {
    flippedCards.push(currentCard);
    currentCard.style.backgroundColor = e.target.classList[0];

    if (flippedCards.length === 2) {
      locked = true;
      setTimeout(matchCards, 1000);
    }
  }
  playerScore += 1;
  pScoreLoc.innerHTML = playerScore;
}

function matchCards() {
  const [card1, card2] = flippedCards;

  if (card1.classList[0] === card2.classList[0]) {
    card1.classList.add("match");
    card2.classList.add("match");
    flipCounter += 2;
  }
  else {
    card1.style.backgroundColor = "";
    card2.style.backgroundColor = "";
  }
  flippedCards = [];
  locked = false;

  if (flipCounter === COLORS.length) {
    let bestScore = +localStorage.getItem("best-score")

    if (bestScore === 0) {
      localStorage.setItem("best-score", playerScore);
    }
    else if (playerScore < bestScore) {
      localStorage.setItem("best-score", playerScore);
    }

    alert("GAME OVER!");
  }
}


