// ID: 
// 0 - nestle
// 1 - ...
class BadMan {
	constructor(posX, posY, map, id) {
		this.posX = posX;
		this.posY = posY;
		this.moving = false;
		this.rowMap = map;
		this.id = id; 
	}

	get type() { return "BadMan"; }	

	static create(x, y, rows) {
		return new BadMan(x * SQUARE_SIZE, y * SQUARE_SIZE, rows);
	}
}

BadMan.prototype.speed = function() {
	if (this.id == 0) {
		return 1250;
	} else if (this.id == 1) {
		return 850;
	} else if (this.id == 2) {
		return 400;
	} else {
		return 450;
	}
}

BadMan.prototype.iq = function() {
	if (this.id == 0) {
		return 3;
	} else if (this.id == 1) {
		return 5;
	} else if (this.id == 2) {
		return 8;
	} else {
		return 4;
	}
}

BadMan.prototype.icon = function() {
	if (this.id == 0) {
		return "images/bp.png";
	} else if (this.id == 1) {
		return "images/cocacola.png";
	} else if (this.id == 2) {
		return "images/nestle80x80.png";
	} else {
		return "images/bad-kitty.png";
	}
}

BadMan.prototype.findBestMove = function (water, posX, posY, previousMove, moves) {
	if (water.findIndex(l => (l.read().x == posX && l.read().y == posY)) >= 0) {
		// found the water, return the best moves
		return [0, moves];
	} else if (moves.length > this.iq()) {
		// the badguys analyze just few move in forward (IQ defines it)
		let minDistance = null;
		water.forEach(function (drop, index) {
			// the metric is the euclides distance between the BadGuy and the closes WaterDrop
			// the lower the value is, better
			let distance = Math.abs(drop.read().x - posX) + Math.abs(drop.read().y - posY);
			if (distance == null || minDistance > distance) {
				minDistance = distance;
			}
		}); 
		return [minDistance, moves];
	} else {
		// make sure we do not go back
		let distance = null;
		let bestMoves = []
		if (previousMove != "left" && this.canMove(posX, posY, "right")) {
			newMoves = moves.slice(0);
			newMoves.push("right");
			let values = this.findBestMove(water, posX + SPEED, posY, "right", newMoves);
			let newDistance = values[0]
			let newBestMoves = values[1]
			if (distance == null || newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		if (previousMove != "right" && this.canMove(posX, posY, "left")) {
			newMoves = moves.slice(0);
			newMoves.push("left");
			let values = this.findBestMove(water, posX - SPEED, posY, "left", newMoves);
			let newDistance = values[0]
			let newBestMoves = values[1]
			if (distance == null || newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		if (previousMove != "down" && this.canMove(posX, posY, "up")) {
			newMoves = moves.slice(0);
			newMoves.push("up");
			let values = this.findBestMove(water, posX, posY - SPEED, "up", newMoves);
			let newDistance = values[0]
			let newBestMoves = values[1]
			if (distance == null || newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		if (previousMove != "up" && this.canMove(posX, posY, "down")) {
			newMoves = moves.slice(0);
			newMoves.push("down");
			let values = this.findBestMove(water, posX, posY + SPEED, "down", newMoves);
			let newDistance = values[0]
			let newBestMoves = values[1]
			if (distance == null || newDistance < distance) {
				distance = newDistance
				bestMoves = newBestMoves
			}
		}
		let result = [].concat(moves, bestMoves)
		return [distance, result]
	}
}

BadMan.prototype.move = function (water, previousMove) {
	let values = this.findBestMove(water, this.posX, this.posY, previousMove, []);
	let direction = values[1][0]

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
	return direction
}

BadMan.prototype.canMove = function (posX, posY, direction) {
	let squareX = Math.round(posX / SQUARE_SIZE);
	let squareY = Math.round(posY / SQUARE_SIZE);
	switch (direction) {
		case "down":
			squareY = Math.floor((posY + SQUARE_SIZE) / SQUARE_SIZE);
			break;
		case "up":
			squareY = Math.ceil((posY - SQUARE_SIZE) / SQUARE_SIZE);
			break;
		case "left":
			squareX = Math.ceil((posX - SQUARE_SIZE) / SQUARE_SIZE);
			break;
		case "right":
			squareX = Math.floor((posX + SQUARE_SIZE) / SQUARE_SIZE);
			break;
		default:
			break;
	}

	return !(this.isWall(squareX, squareY));
}
BadMan.prototype.isWall = function (squarex, squarey) {
	return (this.rowMap[squarey][squarex] === ".");
}