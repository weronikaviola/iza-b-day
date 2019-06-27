class CanvasDisplay {
	constructor(parent, level) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = level.width * SQUARE_SIZE;
		this.canvas.height = level.height * SQUARE_SIZE;
		this.squareSize = this.canvas.width / level.width;
		parent.appendChild(this.canvas);
		this.cx = this.canvas.getContext("2d");
	}

	clear() {
		this.canvas.remove();
	}
}

CanvasDisplay.prototype.clearDisplay = function (status = undefined) {
	if (status == "won") {
		this.cx.fillStyle = "#000000";
	} else if (status == "lost") {
		this.cx.fillStyle = "#000000";
		// this.cx.fillStyle = "rgb(44,136,214)";
	} else {
		this.cx.fillStyle = "#ffffff";
	}
	this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

CanvasDisplay.prototype.printText = function (message) {
	this.clearDisplay("won");
	this.cx.font = "24px Verdana";
	this.cx.fillStyle = "#f9ff00";
	let text = message.split("\n");
	text.forEach((line, idx) => {
		this.cx.fillText(line, 10, (idx + 1) * 50);
	});
}

CanvasDisplay.prototype.printGameOver = function () {
	this.clearDisplay("won");
	this.cx.font = "50px Verdana";
	this.cx.fillStyle = "#ffff00";
	this.cx.textAlign = "center";
	this.cx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);
}

CanvasDisplay.prototype.removeCanvas = function (parent) {
	parent.removeChild(this.canvas);
}


//displays

const wallsImg = document.createElement("img");
wallsImg.src = "images/wall80x80.png";

const playerImg = document.createElement("img");
playerImg.src = "images/Unbenannt.png";

const dropImg = document.createElement("img");
dropImg.src = "images/water.png";

CanvasDisplay.prototype.drawBackground = function (level) {
	for (let y = 0; y < level.height; y++) {
		for (let x = 0; x < level.width; x++) {
			let tile = level.rows[y][x];
			if (tile == "wall") {
				let startX = x * SQUARE_SIZE;
				let startY = y * SQUARE_SIZE;
				this.cx.drawImage(wallsImg, startX, startY, SQUARE_SIZE, SQUARE_SIZE);
			}
			if (tile == "drop") {
				let startX = x * SQUARE_SIZE;
				let startY = y * SQUARE_SIZE;
				this.cx.drawImage(dropImg, startX, startY, SQUARE_SIZE, SQUARE_SIZE);
			}
		}
	}
}

CanvasDisplay.prototype.drawPlayer = function (player) {
	this.cx.drawImage(playerImg, player.posX, player.posY, SQUARE_SIZE, SQUARE_SIZE);
}

CanvasDisplay.prototype.drawBadMan = function (badMan) {
	const badManImg = document.createElement("img");
	badManImg.src = badMan.icon();
	this.cx.drawImage(badManImg, badMan.posX, badMan.posY, SQUARE_SIZE, SQUARE_SIZE)
}
