var ballDia = $("#ball").width();

var ballXPos = 0;
var ballYPos = 0;

var dx = 2;
var dy = 2;

function animateBall() {
  ballXPos += dx;
  ballYPos += dy;

  $("#ball").position({
    my: "left top",
    at: `left+${ballXPos} top+${ballYPos}`,
    of: "#inner-div",
  });

  if (ballXPos + dx < 0 || ballXPos + dx + ballDia > $("#inner-div").width()) {
    dx = -dx;
  }

  if (ballYPos + dy < 0 || ballYPos + dy + ballDia > $("#inner-div").height()) {
    dy = -dy;
  }
}

var rodPosition = 0;

var delX = 5;

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

$("#rod-container").keydown(moveRod);
