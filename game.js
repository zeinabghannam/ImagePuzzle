class Game {
  constructor(playingField, blankCol, blankRow, movesCount) {
    this.playingField = playingField;
    this.blankCol = blankCol;
    this.blankRow = blankRow;
    this.movesCount = movesCount;
  }

  test() {
    console.log("initialize the game");
    console.log(this.playingField);
    console.log(this.blankCol);
    console.log(this.blankRow);
    console.log(this.movesCount);
  }

  getCurrentBlank() {
    //console.log(`current blank is  (${this.blankRow}, ${this.blankCol})`);
  }

  getMoveCount() {
    //console.log(">>> number of moves is: ", this.movesCount);
    return this.movesCount;
  }

  getPlayingField() {
    return this.playingField;
  }
  swapByIndices(i2, j2) {
    let temp = this.playingField[this.blankRow][this.blankCol];
    this.playingField[this.blankRow][this.blankCol] = this.playingField[i2][j2];
    this.playingField[i2][j2] = temp;
    // this.getPlayingField();
  }
  //utility function to get the random number within a specifid range
  getRandom(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }
  move(top, down, left, right) {
    //console.log(`****************`);
    // this.highlightBlankField("");
    if (top && this.blankRow - top < 0) {
      //console.log("imposipple to move top");
    } else if (down && this.blankRow + down > 2) {
      //console.log("imposipple to move down");
    } else if (right && this.blankCol + right > 2) {
      //console.log("imposipple to move right");
    } else if (left && this.blankCol - left < 0) {
      //console.log("imposipple to move left");
    } else {
      if (top) {
        this.swapByIndices(this.blankRow - top, this.blankCol);
        this.blankRow -= top;
        this.movesCount++;
        //console.log(`top move by ${top}`);
      }
      if (down) {
        this.swapByIndices(this.blankRow + down, this.blankCol);
        this.blankRow += down;
        this.movesCount++;
        //console.log(`down move by ${down}`);
      }
      if (left) {
        this.swapByIndices(this.blankRow, this.blankCol - left);
        this.blankCol -= left;
        this.movesCount++;
        //console.log(`left move by ${left}`);
      }
      if (right) {
        this.swapByIndices(this.blankRow, this.blankCol + right);
        this.blankCol += right;
        this.movesCount++;
        //console.log(`right move by ${right}`);
      }
    }
    this.getCurrentBlank();
    this.getMoveCount();
    this.updateMovesCount(this.movesCount);
    this.highlightBlankField();
    if (this.movesCount != 0 && this.isWon()) {
      if (localStorage.getItem("record") == 0)
        localStorage.setItem("record", 1000000);
      if (this.movesCount < parseInt(localStorage.getItem("record"))) {
        localStorage.setItem("record", this.movesCount);
        this.updateBestRecord();
      }
      alert("CONGRATULATION You win the Game!");
    }
    //console.log(`****************`);
  }

  //shuffling the playing field
  shuffle(numberOfShuffles) {
    if (numberOfShuffles < 1) {
      alert("Wrong shuffle number!");
      return;
    }
    for (let i = 1; i <= numberOfShuffles; i++) {
      let randomTop = this.getRandom(0, 2);
      let randomDown = this.getRandom(0, 2);
      let randomLeft = this.getRandom(0, 2);
      let randomRight = this.getRandom(0, 2);

      //console.log(
      // `+shuffle no ${i}, random directions are  ${randomTop}  ${randomDown} ${randomLeft} ${randomRight}`
      //);
      this.move(randomTop, 0, 0, 0);
      this.move(0, 0, randomLeft, 0);
      this.move(0, randomDown, 0, 0);
      this.move(0, 0, 0, randomRight);
    }
    //draw the
    this.draw();
    //Reset tne number of moves
    this.movesCount = 0;
  }

  isWon() {
    //if the playing field and the winning field are equal, then congratulations
    let won = true;
    let flattenedPlayingField = this.playingField.flat();
    for (let i = 1; i <= 9; i++) {
      if (flattenedPlayingField[i - 1] != i) {
        won = false;
        break;
      }
    }
    return won;
  }
  //draw
  draw() {
    var playingboard = document.createElement("div");

    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        var newDiv = document.createElement("div");
        // newDiv.innerHTML = `${this.playingField[i][j]}`;
        newDiv.style.background = `url(./img/${this.playingField[i][j]}.jpg)`;
        newDiv.id = `${i}${j}`;
        playingboard.appendChild(newDiv);
      }
      var br = document.createElement("br");
      playingboard.appendChild(br);
    }
    document.getElementById("content").innerHTML = playingboard.innerHTML;
    this.highlightBlankField("orange");

    this.updateBestRecord();
  }

  updateBestRecord() {
    document.getElementById("rec").innerHTML = localStorage.getItem("record");
  }

  updateMovesCount(count) {
    let movesCountElement = document.getElementById("moves-count");
    movesCountElement.innerHTML = `${count}`;
  }

  highlightBlankField(bgColor) {
    let blackFieldIndicesToString = `${this.blankRow}${this.blankCol}`;
    //console.log(blackFieldIndicesToString);
    document.getElementById(
      blackFieldIndicesToString
    ).style.backgroundColor = bgColor;
  }
} //end class
