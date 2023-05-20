/* select buttons from html by id */
const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");

/* select the containers for the choosen img */
const imgContainerPl1 = document.querySelector("#pick-1");
const imgContainerPl2 = document.querySelector("#pick-2");

/* selects form adds event to it */
const form = document.querySelector("form");
form.addEventListener("submit", saveName);

/* function to send the name from input to a h1 element */
function saveName(event) {
  event.preventDefault();

  const textInput = document.querySelector("#player-one-input");
  const textInputC = document.querySelector("#player-two-input");

  const h1Pl = document.querySelector("#player-name");
  const h1Comp = document.querySelector("#computer-name");

  h1Pl.innerText = textInput.value;
  h1Comp.innerText = textInputC.value;

  textInput.value = "";
  textInputC.value = "";
}

/* select all btn from player container */
const choiceBtn = document.querySelectorAll("#image-container-pl-1 button"); // i set this to the div which holds the buttons for player 1 so only the buttons in this div will be clickable
// it will only loop the buttons of the player not computer
/* select the play btn and addEventListener */
const playBtn = document.querySelector("#play");
const numToStart = document.querySelector("#countStart");
playBtn.addEventListener("click", startCountDown);

/* set timing events  */
let countDownInterval;
let numCountReverce = 3;

/* function to count down to start when clicked on the start button*/
function startCountDown() {
  numToStart.style.display = "block";
  playBtn.style.display = "block";

  numCountReverce = 3;
  numToStart.innerText = numCountReverce;
  countDownInterval = setInterval(() => {
    numCountReverce--;
    if (numCountReverce > 0) {
      numToStart.innerText = numCountReverce;
    } else {
      numToStart.innerText = "GO!";
      clearInterval(countDownInterval);

      setTimeout(() => {
        playBtn.innerText = "Play Again";
        playBtn.style.display = "block";
        playGame();
        reStartGame();
      }, 1000);
    }
  }, 1000);
}

// variables to keep track of the points
let pointsPlayer = 0;
let pointsComputer = 0;

// loop to iterate over each button and add a event listener to each btn to clicks
for (let i = 0; i < choiceBtn.length; i++) {
  const button = choiceBtn[i];

  button.addEventListener("click", function (event) {
    const btnId = event.target.id;
    let playerChoice;

    /* set the btnId to playerChoice */
    if (btnId === "rock") {
      playerChoice = "rock";
    } else if (btnId === "paper") {
      playerChoice = "paper";
    } else if (btnId === "scissors") {
      playerChoice = "scissors";
    }

    playGame(playerChoice);
  });
}

/* function play game sends the coosen pic by player in the pic container, random choose for the computer and then copmpair the both */
function playGame(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoiceIndex = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[computerChoiceIndex];
  let imgPl1 = `<img src="img/${playerChoice}.png"   style="width: 15vw; height:auto; display:grid; place-items:center; ">`;
  let imgPl2 = `<img src="img/${computerChoice}.png" style="width: 15vw; height:auto; display:grid; place-items:center; ">`;
  imgContainerPl1.innerHTML = imgPl1;
  imgContainerPl2.innerHTML = imgPl2;
  playBtn.innerText = "Play again";

  let winner;

  if (playerChoice === computerChoice) {
    winner = "No winner, try again!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    winner = "player";
    pointsPlayer++;
  } else {
    winner = "computer";
    pointsComputer++;
  }

  document.getElementById("points").innerText = pointsPlayer;
  document.getElementById("points2").innerText = pointsComputer;

  /* when one comes to 3 points wins, a message is sent and the backgroundColor points the winner, after 3 sec the function restart game is called */
  if (pointsPlayer === 3 || pointsComputer === 3) {
    if (pointsPlayer === 3) {
      imgContainerPl1.style.backgroundColor = "#A2e18d";
      imgContainerPl2.style.backgroundColor = "#Fa5f4b";
      const popup = document.querySelector("#pop-up");
      popup.addEventListener("click", function () {
        winMess.remove();
      });
      const winMess = document.querySelector("#winner-is");

      const playerName = document.querySelector("#player-name");
      winMess.innerText = playerName.innerHTML + " wins!";

      setTimeout(function () {
        reStartGame();
      }, 3000);
    } else if (pointsComputer === 3) {
      imgContainerPl2.style.backgroundColor = "#A2e18d";
      imgContainerPl1.style.backgroundColor = "#Fa5f4b";
      const popup = document.querySelector("#pop-up");
      popup.addEventListener("click", function () {
        winMess.remove();
      });
      const winMess = document.querySelector("#winner-is");

      winMess.innerText = "Computer wins!";

      setTimeout(function () {
        reStartGame();
      }, 3000);
    }
  }
}
/* function that restarts everything */
function reStartGame() {
  imgContainerPl1.style.backgroundColor = "";
  imgContainerPl2.style.backgroundColor = "";
  numCountReverce = 3;
  numToStart.innerText = " ";
  pointsPlayer = 0;
  pointsComputer = 0;
  document.getElementById("points").innerText = pointsPlayer;
  document.getElementById("points2").innerText = pointsComputer;
  imgContainerPl1.innerHTML = " ";
  imgContainerPl2.innerHTML = " ";
  document.getElementById("winner-is").innerText = "";
  playBtn.innerText = "START";

  clearInterval(countDownInterval);
}
