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

BadMan.prototype.speed = function () {
	if (this.id == 0) {
		return 1000;
	} else if (this.id == 1) {
		return 500;
	} else if (this.id == 2) {
		return 200;
	} else {
		return 600;
	}
}

BadMan.prototype.iq = function () {
	if (this.id == 0) {
		return 20;
	} else if (this.id == 1) {
		return 10;
	} else if (this.id == 2) {
		return 8;
	} else {
		return 12;
	}
}

BadMan.prototype.icon = function () {
	if (this.id == 0) {
		return "images/bp.png";
	} else if (this.id == 1) {
		return "images/cocacola.png";
	} else if (this.id == 2) {
		return "images/nestle80x80.png";
	} else {
		return "images/danone.png";
	}
}

BadMan.prototype.findBestMove = function (water, posX, posY, moves) {
	if (water.findIndex(l => (l.read().x == posX && l.read().y == posY)) >= 0) {
		// found the water, return the best moves
		return [10 * moves.length, moves];
	} else if (moves.length > this.iq()) {
		// the badguys analyze just few moves in forward (IQ defines it)
		let minDistance = null;
		water.forEach(function (drop, index) {
			// the lower the value is, better
			let distance = Math.abs(drop.read().x / SQUARE_SIZE - posX / SQUARE_SIZE) + Math.abs(drop.read().y / SQUARE_SIZE - posY / SQUARE_SIZE);
			if (minDistance == null || minDistance > distance) {
				minDistance = distance;
			}
		});
		return [10 * moves.length + minDistance, moves];
	} else {
		// make sure we do not go back
		let previousMove = moves[moves.length - 1]
		let distance = null;
		let bestMoves = []
		if (previousMove != "left" && this.canMove(posX, posY, "right")) {
			newMoves = moves.slice(0);
			newMoves.push("right");
			let newBestMoves = this.findBestMove(water, posX + SPEED, posY, newMoves);
			if (newBestMoves != null && (distance == null || newBestMoves[0] < distance)) {
				distance = newBestMoves[0]
				bestMoves = newBestMoves[1]
			}
		}
		if (previousMove != "right" && this.canMove(posX, posY, "left")) {
			newMoves = moves.slice(0);
			newMoves.push("left");
			let newBestMoves = this.findBestMove(water, posX - SPEED, posY, newMoves);
			if (newBestMoves != null && (distance == null || newBestMoves[0] < distance)) {
				distance = newBestMoves[0]
				bestMoves = newBestMoves[1]
			}
		}
		if (previousMove != "down" && this.canMove(posX, posY, "up")) {
			newMoves = moves.slice(0);
			newMoves.push("up");
			let newBestMoves = this.findBestMove(water, posX, posY - SPEED, newMoves);
			if (newBestMoves != null && (distance == null || newBestMoves[0] < distance)) {
				distance = newBestMoves[0]
				bestMoves = newBestMoves[1]
			}
		}
		if (previousMove != "up" && this.canMove(posX, posY, "down")) {
			newMoves = moves.slice(0);
			newMoves.push("down");
			let newBestMoves = this.findBestMove(water, posX, posY + SPEED, newMoves);
			if (newBestMoves != null && (distance == null || newBestMoves[0] < distance)) {
				distance = newBestMoves[0]
				bestMoves = newBestMoves[1]
			}
		}
		if (distance == null) {
			// we could reach a corner from which the only way back is to actually go back
			return null
		}
		return [distance, bestMoves]
	}
}

BadMan.prototype.move = function (water) {
	let moves = this.findBestMove(water, this.posX, this.posY, []);
	if (moves == null) {
		// we have wall around us. do nothing
		return
	}
	let direction = moves[1][0]
	if (this.id == 2) {
		console.log("###########")
		console.log("Current location: ", this.posX / SQUARE_SIZE, this.posY / SQUARE_SIZE)
		console.log("Move to ", direction)
		console.log("BestMoves", moves)
		water.forEach(function (item, index) {
			console.log("Water: ", item.read().x / SQUARE_SIZE, item.read().y / SQUARE_SIZE);
		});
		console.log("###########")
	}

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