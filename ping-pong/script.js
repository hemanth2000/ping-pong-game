var playerNo = 0;
var gameLive = false;

function setInitialPosition() {
  $("#rod-container").position({
    my: "top",
    at: "top",
    of: "#inner-div",
  });

  let ballPos = playerNo
    ? `top+${$(".rod").height()}`
    : `bottom-${$(".rod").height() + $("#ball").height()}`;

  $("#ball").position({
    my: "top",
    at: "center " + ballPos,
    of: "#inner-div",
  });
}

function displayTopScore() {
  if (localStorage.getItem("topScore") === null)
    alert("Kudos! This is your first game!");
  else
    alert(
      `${localStorage["name"]} is the highest scorer with ${localStorage["topScore"]}`
    );
  gameLive = true;
}

function startGame() {
  $("#rod-container").focus();
  $("#rod-container").keydown(moveRod);

  var pScore = 0;

  var ballDia = $("#ball").width();

  var ballXPos = $("#ball").position().left;
  var ballYPos = $("#ball").position().top;

  var rodWidth = $("#rod-container").width();
  var containerWidth = $("#inner-div").width();

  var dx = 2;
  var dy = 2;

  var rodPosition = $("#rod-container").position().left;
  var delX = 15;

  function displayScore() {
    let topScore = localStorage.getItem("topScore");
    let player = `Player ${playerNo + 1}`;
    pScore -= playerNo ? 0 : 1;
    if (topScore === null || pScore > topScore) {
      localStorage.setItem("topScore", pScore);
      localStorage.setItem("name", player);
    }

    alert(
      `${player} score is ${pScore}. Highest score is ${localStorage["topScore"]}`
    );

    playerNo = playerNo == 0 ? 1 : 0;
    gameLive = false;
  }

  function moveRod(event) {
    if (event.key != "d" && event.key != "a") {
      return;
    }

    $("#rod-container").position({
      my: "left top",
      at: `left+${rodPosition} top`,
      of: "#inner-div",
    });

    if (event.key === "d") {
      if (rodPosition + rodWidth + delX > containerWidth) {
        return;
      }
      rodPosition += delX;
    }

    if (event.key === "a") {
      if (rodPosition - delX < 0) {
        return;
      }
      rodPosition -= delX;
    }
  }

  function animateBall() {
    ballXPos += dx;
    ballYPos += dy;

    $("#ball").position({
      my: "left top",
      at: `left+${ballXPos} top+${ballYPos}`,
      of: "#inner-div",
    });

    // Change ball direction when there is a collison
    if (
      ballXPos + dx < 0 ||
      ballXPos + dx + ballDia > $("#inner-div").width()
    ) {
      dx = -dx;
    }

    let s1 = ballYPos < $(".rod").height();
    let s2 =
      ballYPos + ballDia + dy > $("#inner-div").height() - $(".rod").height();

    if (s1 || s2) {
      if (
        ballXPos + ballDia > rodPosition &&
        ballXPos < rodPosition + $("#rod-container").width()
      ) {
        pScore++;
        dy = -dy;
      } else {
        clearInterval(interval);
        displayScore();
        setInitialPosition();
      }
    }
  }

  var interval = setInterval(animateBall, 5);
}

setInitialPosition();

$(window).keydown((event) => {
  if (!gameLive && event.which == 13) {
    event.preventDefault();
    displayTopScore();
    startGame();
  }
});
