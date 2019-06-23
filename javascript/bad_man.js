class BadMan {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
		this.currentDirection = GenerateRandomDirection();
		this.moving = false;

		this.startMoving();
	}

	get type() { return "player"; }

	static create(x, y) {
		return new BadMan(x * SQUARE_SIZE, y * SQUARE_SIZE);
	}
}

BadMan.prototype.startMoving = function () {
	this.moving = setInterval(this.move(this.currentDirection), 1000);

}

BadMan.prototype.move = function (direction) {
	let squareX = Math.round(this.posX / 40);
	let squareY = Math.round(this.posY / 40);
	console.log(this);
	switch (direction) {
		case "right":
			squareX = Math.floor((this.posX + SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				STATE.currentGame.canvas.cx.clearRect(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
				this.posX = this.posX += SPEED;
				STATE.currentGame.canvas.drawBadMan(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
			} else {
				this.currentDirection = "left";
			}
			break;
		case "left":
			squareX = Math.ceil((this.posX - SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				STATE.currentGame.canvas.cx.clearRect(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
				this.posX = this.posX -= SPEED;
				STATE.currentGame.canvas.drawBadMan(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
			} else {
				this.currentDirection = "right";
			}
			break;
		case "up":
			squareY = Math.ceil((this.posY - SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				STATE.currentGame.canvas.cx.clearRect(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
				this.posY = this.posY -= SPEED;
				STATE.currentGame.canvas.drawBadMan(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
			} else {
				this.currentDirection = "down";
			}
			break;
		case "down":
			squareY = Math.floor((this.posY + SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				STATE.currentGame.canvas.cx.clearRect(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
				this.posY = this.posY += SPEED;
				STATE.currentGame.canvas.drawBadMan(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);
			} else {
				this.currentDirection = "up";
			}
			break;

		default:
			break;
	}
}

BadMan.prototype.canMove = function (squarex, squarey) {
	// return (STATE.currentGame.level.rows[squarey][squarex] !== "wall");
	return false;
}