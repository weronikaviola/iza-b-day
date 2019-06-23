class State {
	constructor(playerName) {
		this.started = false;
		this.playerName = playerName;
		this.totalPoints = 0;
		this.currentGame = {};
		this.currentLevel = "";

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
	this.initializeLevel(AVAILABLE_LEVELS[0]);
}
State.prototype.initializeLevel = function (level) {
	this.currentLevel = level;
	this.started = true;
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