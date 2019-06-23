class BadMan {
	constructor(posX, posY, map) {
		this.posX = posX;
		this.posY = posY;
		this.currentDirection = GenerateRandomDirection();
		this.moving = false;
		this.rowMap = map;
	}

	get type() { return "player"; }

	static create(x, y, rows) {
		return new BadMan(x * SQUARE_SIZE, y * SQUARE_SIZE, rows);
	}
}

BadMan.prototype.move = function () {
	let squareX = Math.round(this.posX / 40);
	let squareY = Math.round(this.posY / 40);
	switch (this.currentDirection) {
		case "right":
			if (this.canMove("right")) {
				this.posX = this.posX += SPEED;
			} else {
				this.chooseOtherDirection();
			}
			break;
		case "left":
			if (this.canMove("left")) {
				this.posX = this.posX -= SPEED;
			} else {
				this.chooseOtherDirection();
			}
			break;
		case "up":
			if (this.canMove("up")) {
				this.posY = this.posY -= SPEED;
			} else {
				this.chooseOtherDirection();
			}
			break;
		case "down":
			if (this.canMove("down")) {
				this.posY = this.posY += SPEED;
			} else {
				this.chooseOtherDirection();
			}
			break;
		default:
			break;
	}
}

BadMan.prototype.canMove = function (direction) {
	let squareX = Math.round(this.posX / 40);
	let squareY = Math.round(this.posY / 40);
	switch (direction) {
		case "down":
			squareY = Math.floor((this.posY + SQUARE_SIZE) / 40);
			break;
		case "up":
			squareY = Math.ceil((this.posY - SQUARE_SIZE) / 40);
			break;
		case "left":
			squareX = Math.ceil((this.posX - SQUARE_SIZE) / 40);
			break;
		case "right":
			squareX = Math.floor((this.posX + SQUARE_SIZE) / 40);
			break;
		default:
			break;
	}

	return !(this.isWall(squareX, squareY));
}
BadMan.prototype.isWall = function (squarex, squarey) {
	return (this.rowMap[squarey][squarex] === ".");
}

BadMan.prototype.chooseOtherDirection = function () {
	let possible = Object.values(DIRECTIONS).filter(dir => dir !== this.currentDirection);
	possible = ShuffleArray(possible);
	let newDirection = possible.find(dir => this.canMove(dir));
	this.currentDirection = newDirection;
}