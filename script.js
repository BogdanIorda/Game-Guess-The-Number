"use strict";

let secertNumber = Math.trunc(Math.random() * 100) + 1;
let score = 100;
let highscore = 0;

// Selecting elements
const checkButton = document.querySelector(".check");
const selectH1 = document.querySelector(".main-header");
const betweenParagraph = document.querySelector(".between");

//Sounds
const audioWrongAnswer = new Audio("./sounds/error-126627.mp3");
const audioRightAnswer = new Audio("./sounds/happy-logo-167474.mp3");
const audioMissingInput = new Audio("./sounds/wrong-buzzer-6268.mp3");
audioMissingInput.volume = 0.1;
audioRightAnswer.volume = 0.2;

// Functions
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const changeNumber = function (value) {
  document.querySelector(".number").textContent = value;
};

const changeScore = function (value) {
  document.querySelector(".score").textContent = value;
};

const changeNumberWidth = function (width) {
  document.querySelector(".number").style.width = width;
};

const setBackgroundColor = function (color) {
  document.querySelector("body").style.backgroundColor = color;
};
const changeH1Win = function (text, color) {
  selectH1.textContent = text;
  selectH1.style.color = color;
};

const resetH1 = function (text, color) {
  selectH1.textContent = text;
  selectH1.style.color = color;
};

// Main
checkButton.addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("⛔ Missing Number!");
    audioMissingInput.play();
  } else if (guess > 100 || guess < 1) {
    displayMessage("Number not in range!");
  } else if (guess === secertNumber) {
    displayMessage("Correct Number!🎉");
    changeNumber(secertNumber);
    setBackgroundColor("#34bf49");
    changeNumberWidth("25rem");
    changeH1Win("🥳Congratulations!!!🥳", "#007FFF");
    audioRightAnswer.play();
    betweenParagraph.classList.add("hidden");
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secertNumber) {
    if (score > 1) {
      displayMessage(guess > secertNumber ? "📈To High!" : "📉To Low!");
      score--;
      changeScore(score);
      audioWrongAnswer.play();
    } else {
      displayMessage("GAME OVER!😔");
      changeScore(0);
      setBackgroundColor("#F04122");
    }
  }
});

//Agian button
document.querySelector(".again").addEventListener("click", function () {
  score = 100;
  secertNumber = Math.trunc(Math.random() * 100) + 1;

  changeNumber("?");
  document.querySelector(".guess").value = "";
  displayMessage("Start guessing...");
  changeScore(score);
  changeNumberWidth("15rem");
  setBackgroundColor("#131212");
  resetH1("Guess The Number!", "#ffffff");
  betweenParagraph.classList.remove("hidden");
});
