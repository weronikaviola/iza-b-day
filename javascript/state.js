class State {
	constructor(playerName) {
		this.started = false;
		this.playerName = playerName;
		this.totalPoints = 0;
		this.currentGame = {};
		this.currentLevelIdx = 0;

		this.initializeGame();
	}

	static start(name) {
		return new State(name);
	}

	movePlayer = (evt) => {
		let currentX = this.currentGame.player.posX;
		let currentY = this.currentGame.player.posY;
		this.currentGame.canvas.cx.clearRect(currentX, currentY, SQUARE_SIZE, SQUARE_SIZE);
		this.currentGame.player.move(DIRECTIONS[evt.keyCode]);
		this.currentGame.canvas.drawPlayer(this.currentGame.player);
	}
}

State.prototype.initializeGame = function () {
	//print welcome message....
	this.started = true;
	this.initializeLevel(AVAILABLE_LEVELS[this.currentLevelIdx]);
}

State.prototype.initializeLevel = function (level) {
	const body = document.getElementById("body");
	this.currentGame.level = new Level(levels[level]);
	this.currentGame.canvas = new CanvasDisplay(body, this.currentGame.level);
	this.currentGame.canvas.drawBackground(this.currentGame.level);
	this.currentGame.player = new Player(200, 320, 1);
	this.currentGame.canvas.drawPlayer(this.currentGame.player);
	document.addEventListener("keydown", this.movePlayer);
}

State.prototype.changeScore = function (points) {
	this.totalPoints += points;
}

State.prototype.nextLevel = function (points) {
	this.currentLevelIdx += 1;
	this.changeScore(points);
	if (this.currentLevelIdx < AVAILABLE_LEVELS.length) {
		this.initializeGame(AVAILABLE_LEVELS(this.currentLevelIdx));
	} else {
		this.endGame();
	}
}

State.prototype.endGame = function () {
	console.log('done', this.points);
}