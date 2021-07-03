var prevWinner = 1;
var gameLive = false;

function startGame() {
  $("#rod-container").focus();

  var p1Score = 0;
  var p2Score = 0;

  var ballDia = $("#ball").width();

  var ballXPos = $("#ball").position().left;
  var ballYPos = $("#ball").position().top;

  var dx = 2;
  var dy = 2;

  var rodPosition = ($("#inner-div").width() - $("#rod-container").width()) / 2;
  var delX = 15;

  function declareWinner() {
    let topScore = localStorage.getItem("topScore");
    if (p1Score > p2Score) {
      prevWinner = 0;

      if (topScore == undefined || p1Score > topScore) {
        localStorage.setItem("topScore", p1Score);
        localStorage.setItem("name", "Player 1");
      }

      alert(
        `Player 1 wins this round with ${p1Score}. Highest score is ${localStorage["topScore"]}`
      );
    } else {
      prevWinner = 1;
      if (topScore == undefined || p2Score > topScore) {
        localStorage.setItem("topScore", p2Score);
        localStorage.setItem("name", "Player 2");
      }
      alert(
        `Player 2 wins this round with ${p2Score}. Highest score is ${localStorage["topScore"]}`
      );
    }

    gameLive = false;
  }

  function moveRod(event) {
    var rodWidth = $("#rod-container").width();
    var containerWidth = $("#inner-div").width();

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

    $("#rod-container").position({
      my: "left top",
      at: `left+${rodPosition} top`,
      of: "#inner-div",
    });
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
        if (s1) {
          p2Score++;
        } else {
          p1Score++;
        }

        dy = -dy;
      } else {
        if (s1) {
          p1Score++;
        } else {
          p2Score++;
        }

        clearInterval(interval);
        declareWinner();
        setInitialPosition();
      }
    }
  }

  $("#rod-container").keydown(moveRod);
  var interval = setInterval(animateBall, 5);
}

function setInitialPosition() {
  //   $("#rod-container").position({
  //     my: "top",
  //     at: "top",
  //     of: "#inner-div",
  //   });

  let leftPos =
    String(($("#inner-div").width() - $("#rod-container").width()) / 2) + "px";
  $("#rod-container").css("left", leftPos);

  let ballPos;

  if (prevWinner == 0) {
    ballPos = `top+${$(".rod").height()}`;
  } else {
    ballPos = `bottom-${$(".rod").height() + $("#ball").height()}`;
  }

  $("#ball").position({
    my: "top",
    at: "center " + ballPos,
    of: "#inner-div",
  });
}

function showHighestScore() {
  if (localStorage.getItem("topScore") == undefined)
    alert("Kudos! This is your first game!");
  else
    alert(
      `${localStorage["name"]} is the highest scorer with ${localStorage["topScore"]}`
    );
  gameLive = true;
}

setInitialPosition();

$(window).keydown((event) => {
  if (!gameLive && event.which == 13) {
    event.preventDefault();
    showHighestScore();
    startGame();
  }
});
