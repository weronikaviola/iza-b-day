

class State {
  constructor(playerName) {
    this.started = false;
    this.playerName = playerName;
    this.totalPoints = 0;
    this.currentGame = {};
    this.currentLevelIdx = 0;
    this.currentIntervals = {};

    this.initializeGame();
  }

  static start(name) {
    return new State(name);
  }

  movePlayer(evt) {
    let currentX = this.currentGame.player.posX;
    let currentY = this.currentGame.player.posY;
    this.currentGame.canvas.cx.clearRect(currentX, currentY, SQUARE_SIZE, SQUARE_SIZE);
    this.currentGame.player.move(DIRECTIONS[evt.keyCode]);
    this.currentGame.canvas.drawPlayer(this.currentGame.player);
    return true;
  }
}

State.prototype.initializeGame = function () {
  //print welcome message....
  this.started = true;
  this.initializeLevel(AVAILABLE_LEVELS[this.currentLevelIdx]);


}

State.prototype.initializeLevel = async function (level) {
  const body = document.getElementById("maze");
  this.currentGame.level = new Level(levels[level]);
  this.currentGame.badGuys = this.currentGame.level.badGuys;
  this.currentGame.canvas = new CanvasDisplay(body, this.currentGame.level);

  this.currentGame.canvas.printText(levels[level].startText);

  setTimeout(() => {
    this.currentGame.canvas.clearDisplay();
    this.currentGame.canvas.drawBackground(this.currentGame.level);
    this.currentGame.player = new Player(5*SQUARE_SIZE, 8*SQUARE_SIZE, 1);
    this.currentGame.canvas.drawPlayer(this.currentGame.player);
    this.displayBadGuys();
    let that = this;
    document.addEventListener("keydown", function (evt) { that.movePlayer(evt) });
  }, 3000);
}

State.prototype.displayBadGuys = function () {
  this.currentGame.badGuys.forEach((guy, idx) => {
    this.currentGame.canvas.drawBadMan(guy);
    this.currentIntervals[idx] = setInterval(() => {
      this.currentGame.canvas.cx.clearRect(guy.posX, guy.posY, SQUARE_SIZE, SQUARE_SIZE);
      guy.move(this.currentGame.level.water);
      this.currentGame.canvas.drawBadMan(guy);
      this.eatWater(guy);
    }, 500);
  });
}

State.prototype.eatWater = function (man) {
  let index = this.currentGame.level.water.findIndex(l => (l.read().x == man.posX && l.read().y == man.posY));
  if (index >= 0) {
    this.currentGame.level.water.splice(index, 1);
    console.log(this.currentGame.level.water);
    this.currentGame.level.adjustPoints(0);
  }
}

State.prototype.changeScore = function (points) {
  this.totalPoints += points;
}

State.prototype.nextLevel = function (points) {
  this.currentLevelIdx += 1;
  this.changeScore(points);
  if (this.currentLevelIdx < AVAILABLE_LEVELS.length) {
    this.currentIntervals = {};
    this.initializeGame(AVAILABLE_LEVELS(this.currentLevelIdx));
  } else {
    this.endGame();
  }
}

State.prototype.endGame = function () {
  Object.values(this.currentIntervals).forEach(interval => {
    clearInterval(interval);
  })
  this.currentGame.canvas.printText(END_TEXT);
}