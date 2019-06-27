class Player {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
	}

	get type() { return "player"; }
}

Player.prototype.move = function (direction) {
	let squareX = Math.ceil(this.posX / SQUARE_SIZE);
	let squareY = Math.ceil(this.posY / SQUARE_SIZE);
	switch (direction) {
		case "right":
			squareX = Math.floor((this.posX + SQUARE_SIZE) / SQUARE_SIZE);
			if (this.canMove(squareX, squareY)) {
				this.collectDiamonds(squareX, squareY);
				this.posX = this.posX += SQUARE_SIZE;
			}
			break;
		case "left":
			squareX = Math.ceil((this.posX - SQUARE_SIZE) / SQUARE_SIZE);
			if (this.canMove(squareX, squareY)) {
				this.posX = this.posX -= SQUARE_SIZE;
				this.collectDiamonds(squareX, squareY);
			}
			break;
		case "up":
			squareY = Math.ceil((this.posY - SQUARE_SIZE) / SQUARE_SIZE);
			if (this.canMove(squareX, squareY)) {
				this.posY = this.posY -= SQUARE_SIZE;
				this.collectDiamonds(squareX, squareY);
			}
			break;
		case "down":
			squareY = Math.floor((this.posY + SQUARE_SIZE) / SQUARE_SIZE);
			if (this.canMove(squareX, squareY)) {
				this.posY = this.posY += SQUARE_SIZE;
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
	let index = STATE.currentGame.level.water.findIndex(l => (l.x == squarex && l.y == squarey));
	if (index >= 0) {
		STATE.currentGame.level.water.splice(index, 1);
		STATE.currentGame.level.adjustPoints(1);
	}
}