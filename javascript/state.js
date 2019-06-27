

class State {
  constructor(playerName) {
    this.started = false;
    this.playerName = playerName;
    this.totalPoints = 0;
    this.lives = 7;
    this.currentGame = {};
    this.currentLevelIdx = 0;
    this.currentIntervals = {};
    this.scoreBoard = document.getElementById("player-score");
    this.levelBoard = document.getElementById("level");
    this.liveBoard = document.getElementById("lives");

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
  this.started = true;
  this.initializeLevel(AVAILABLE_LEVELS[this.currentLevelIdx]);
}

State.prototype.initializeLevel = async function (level) {
  this.body = document.getElementById("maze");
  this.levelBoard.innerText = `${this.currentLevelIdx + 1}`;
  this.currentGame.level = new Level(levels[level], this.totalPoints);
  this.currentGame.badGuys = this.currentGame.level.badGuys;
  this.currentGame.canvas = new CanvasDisplay(this.body, this.currentGame.level);

  this.currentGame.canvas.printText(levels[level].startText);

  setTimeout(() => {
    this.currentGame.canvas.clearDisplay();
    this.currentGame.canvas.drawBackground(this.currentGame.level);
    this.currentGame.player = new Player(this.currentGame.level.playerX * SQUARE_SIZE, this.currentGame.level.playerY * SQUARE_SIZE);
    this.currentGame.canvas.drawPlayer(this.currentGame.player);
    this.displayBadGuys();
    let that = this;
    this.listenForMoves = function(evt) {
      that.movePlayer(evt);
    }
    document.addEventListener("keydown", this.listenForMoves);
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
      this.killPlayer(guy);
    }, guy.speed());
  });
}

State.prototype.eatWater = function (man) {
  let index = this.currentGame.level.water.findIndex(l => (l.read().x == man.posX && l.read().y == man.posY));
  if (index >= 0) {
    this.currentGame.level.water.splice(index, 1);
    this.currentGame.level.adjustPoints(0);
  }
}

State.prototype.killPlayer = function (man) {
  let player = this.currentGame.player;
  if (player.posX == man.posX && player.posY == man.posY) {
    this.changeLives(-1);
    this.updateLivesEl(this.lives);
  }
}

State.prototype.changeLives = function (value) {
  this.lives += value;
}

State.prototype.changeScore = function (points) {
  this.totalPoints += points;
}

State.prototype.clearBadGuysIntervals = function () {
  Object.values(this.currentIntervals).forEach(interval => {
    clearInterval(interval);
  });
}

State.prototype.nextLevel = function () {
  this.currentLevelIdx += 1;
  let points = this.currentGame.level.score;
  this.totalPoints = points;
  document.removeEventListener("keydown", this.listenForMoves);
  this.clearBadGuysIntervals();
  if (this.currentLevelIdx < AVAILABLE_LEVELS.length) {
    //we start indexing levels at 0
    this.currentGame.canvas.removeCanvas(this.body);
    this.initializeGame(AVAILABLE_LEVELS[this.currentLevelIdx]);
  } else {
    this.endGame();
  }
}

State.prototype.endGame = function () {
  this.clearBadGuysIntervals();
  this.currentGame.canvas.printText(END_TEXT);
}

State.prototype.updateScore = function (newScore) {
  this.scoreBoard.innerText = newScore;
}

State.prototype.updateLivesEl = function (newLives) {
  this.liveBoard.innerText = newLives;
}