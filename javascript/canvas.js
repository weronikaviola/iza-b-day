class CanvasDisplay {
	constructor(parent, level) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = level.width * 40;
		this.canvas.height = level.height * 40;
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
		this.cx.fillStyle = "rgb(68,191,255)";
	} else if (status == "lost") {
		this.cx.fillStyle = "rgb(44,136,214)";
	} else {
		this.cx.fillStyle = "rgb(255,255,255)";
	}

	this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}


CanvasDisplay.prototype.printText = function (message) {
	this.clearDisplay("won");
	this.cx.font = "25px Monospace";
	this.cx.fillStyle = "red";
	let text = message.split("\n");
	text.forEach((line, idx) => {
		this.cx.fillText(line, 10, (idx + 1) * 50);
	});
}


//displays

const wallsImg = document.createElement("img");
wallsImg.src = "images/tile-test.jpg";

const playerImg = document.createElement("img");
playerImg.src = "images/Unbenannt.png";

const dropImg = document.createElement("img");
dropImg.src = "images/drop.png";

const badMan1Img = document.createElement("img");
badMan1Img.src = "images/bad-kitty.png";

CanvasDisplay.prototype.drawBackground = function (level) {
	for (let y = 0; y < level.height; y++) {
		for (let x = 0; x < level.width; x++) {
			let tile = level.rows[y][x];
			if (tile == "wall") {
				let startX = x * 40;
				let startY = y * 40;
				this.cx.drawImage(wallsImg, startX, startY, SQUARE_SIZE, SQUARE_SIZE);
			}
			if (tile == "drop") {
				let startX = x * 40;
				let startY = y * 40;
				this.cx.drawImage(dropImg, startX, startY, SQUARE_SIZE, SQUARE_SIZE);
			}
		}
	}
}

CanvasDisplay.prototype.drawPlayer = function (player) {
	this.cx.drawImage(playerImg, player.posX, player.posY, SQUARE_SIZE, SQUARE_SIZE);
}

CanvasDisplay.prototype.drawBadMan = function (badMan) {
	this.cx.drawImage(badMan1Img, badMan.posX, badMan.posY, SQUARE_SIZE, SQUARE_SIZE)
}
