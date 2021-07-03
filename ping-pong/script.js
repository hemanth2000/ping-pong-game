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

var interval = setInterval(animateBall, 5);

setTimeout(() => clearInterval(interval), 10000);
