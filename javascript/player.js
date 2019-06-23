class Player {
	constructor(posX, posY, speed) {
		this.posX = posX;
		this.posY = posY;
		this.speed = speed;
	}

	get type() { return "player"; }
}

Player.prototype.move = function (direction) {
	let squareX = Math.ceil(this.posX / 40);
	let squareY = Math.ceil(this.posY / 40);
	switch (direction) {
		case "right":
			squareX = Math.floor((this.posX + SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				this.collectDiamonds(squareX, squareY);
				this.posX = this.posX += SPEED;
			}
			break;
		case "left":
			squareX = Math.ceil((this.posX - SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				this.posX = this.posX -= SPEED;
				this.collectDiamonds(squareX, squareY);
			}
			break;
		case "up":
			squareY = Math.ceil((this.posY - SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				this.posY = this.posY -= SPEED;
				this.collectDiamonds(squareX, squareY);
			}
			break;
		case "down":
			squareY = Math.floor((this.posY + SQUARE_SIZE) / 40);
			if (this.canMove(squareX, squareY)) {
				this.posY = this.posY += SPEED;
				this.collectDiamonds(squareX, squareY);
			}
			break;
		default:
			break;
	}
}

Player.prototype.canMove = function (squarex, squarey) {
	return (STATE.currentGame.level.rows[squarey][squarex] !== "wall");
}

Player.prototype.collectDiamonds = function (squarex, squarey) {
	if (STATE.currentGame.level.rows[squarey][squarex] === "drop") {
		STATE.currentGame.level.adjustPoints(1);
	}
}