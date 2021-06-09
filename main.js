let playingField = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const game = new Game(playingField, 2, 2, 0);
game.test();

if (!localStorage.getItem("record")) {
  localStorage.setItem("record", 0);
}
window.onload = function () {
  game.draw();
  //   game.readKeyboardArrows();

  //update the moves count
  game.updateMovesCount(game.getMoveCount());
  //when mix button is clicked
  let mixButton = document.getElementById("mix");
  mixButton.onclick = function () {
    let shuffleCount = parseInt(document.getElementById("shuffle-count").value);
    shuffleCount = shuffleCount;
    game.shuffle(shuffleCount);
    game.updateMovesCount(0);
  };
};

//keyword keys are up, down, left, right
// function readKeyboardArrows() {
window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "ArrowDown":
        console.log("down arrow");
        game.move(0, 1, 0, 0);
        game.draw();
        break;
      case "ArrowUp":
        console.log("top arrow");
        game.move(1, 0, 0, 0);
        game.draw();
        break;
      case "ArrowLeft":
        console.log("left arrow");
        game.move(0, 0, 1, 0);
        game.draw();
        break;
      case "ArrowRight":
        console.log("right arrow");
        game.move(0, 0, 0, 1);
        game.draw();
        break;
      default:
        return;
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);
// the last option dispatches the event to the listener first,
// then dispatches event to window
// }//function
