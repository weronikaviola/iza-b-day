class BadMan {
	constructor(posX, posY, map) {
		this.posX = posX;
		this.posY = posY;
		this.moving = false;
		this.rowMap = map;
	}

	get type() { return "BadMan"; }

	static create(x, y, rows) {
		return new BadMan(x * SQUARE_SIZE, y * SQUARE_SIZE, rows);
	}
}

BadMan.prototype.findBestMove = function (water, posX, posY, moves) {
	if (water.findIndex(l => (l.read().x == posX && l.read().y == posY)) >= 0) {
		// found the water, return the best moves
		return (moves);
	} else if (moves.length > 20) {
		// leave the recurrencion if it is deeper then 20
		// this is a hack since we should ensure there are no cycles
		// but this would require a bit more logic and maybe better data structures
		return (moves);
	} else {
		// make sure we do not go back
		let lastDirection = moves[moves.length - 1];
		let distance = 9999999;
		let bestMoves = []
		if (lastDirection != "left" && this.canMove(posX, posY, "right")) {
			newMoves = moves.slice(0);
			newMoves.push("right");
			let newBestMoves = this.findBestMove(water, posX + SPEED, posY, newMoves);
			let newDistance = newBestMoves.length
			if (newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		if (lastDirection != "right" && this.canMove(posX, posY, "left")) {
			newMoves = moves.slice(0);
			newMoves.push("left");
			let newBestMoves = this.findBestMove(water, posX - SPEED, posY, newMoves);
			let newDistance = newBestMoves.length
			if (newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		if (lastDirection != "down" && this.canMove(posX, posY, "up")) {
			newMoves = moves.slice(0);
			newMoves.push("up");
			let newBestMoves = this.findBestMove(water, posX, posY - SPEED, newMoves);
			let newDistance = newBestMoves.length
			if (newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		if (lastDirection != "up" && this.canMove(posX, posY, "down")) {
			newMoves = moves.slice(0);
			newMoves.push("down");
			let newBestMoves = this.findBestMove(water, posX, posY + SPEED, newMoves);
			let newDistance = newBestMoves.length
			if (newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		let result = [].concat(moves, bestMoves)
		return (result)
	}
}

BadMan.prototype.move = function (player) {
	let bestMoves = this.findBestMove(player, this.posX, this.posY, []);
	let direction = bestMoves[0]

	if (direction == "right") {
		this.posX = this.posX += SPEED;
	} else if (direction == "left") {
		this.posX = this.posX -= SPEED;
	} else if (direction == "up") {
		this.posY = this.posY -= SPEED;
	} else if (direction == "down") {
		this.posY = this.posY += SPEED;
	} else {
		// do nothing
	}
}

BadMan.prototype.canMove = function (posX, posY, direction) {
	let squareX = Math.round(posX / 40);
	let squareY = Math.round(posY / 40);
	switch (direction) {
		case "down":
			squareY = Math.floor((posY + SQUARE_SIZE) / 40);
			break;
		case "up":
			squareY = Math.ceil((posY - SQUARE_SIZE) / 40);
			break;
		case "left":
			squareX = Math.ceil((posX - SQUARE_SIZE) / 40);
			break;
		case "right":
			squareX = Math.floor((posX + SQUARE_SIZE) / 40);
			break;
		default:
			break;
	}

	return !(this.isWall(squareX, squareY));
}
BadMan.prototype.isWall = function (squarex, squarey) {
	return (this.rowMap[squarey][squarex] === ".");
}