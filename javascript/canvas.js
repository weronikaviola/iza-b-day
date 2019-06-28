class CanvasDisplay {
	constructor(parent, level) {
		this.notifications = document.getElementById("notifications");
		this.notifications.style.height = level.height * SQUARE_SIZE + "px";

		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute("id", "canvas");
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
	this.notifications.style.diplay = "none";
	this.notifications.style.visibility = "hidden";
	this.cx.fillStyle = "#ffffff";
	this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

CanvasDisplay.prototype.printText = function (message) {
	this.notifications.style.diplay = "block";
	this.notifications.style.visibility = "visible";
	this.notifications.style.backgroundColor = "#000000";
	this.notifications.innerHTML = message;
}

CanvasDisplay.prototype.printGameOver = function () {
	this.notifications.className = "shadowed";
	this.notifications.innerHTML = "GAME OVER";
	this.notifications.style.diplay = "block";
	this.notifications.style.visibility = "visible";
}

CanvasDisplay.prototype.removeCanvas = function (parent) {
	parent.removeChild(this.canvas);
}

//displays

const wallsImg = document.createElement("img");
wallsImg.src = "images/wall80x80.png";

const playerImg = document.createElement("img");
playerImg.src = "images/iza_mario80x80.png";
const deadPlayerImg = document.createElement("img");
deadPlayerImg.src = "images/iza_mario_killed80x80.png";

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

CanvasDisplay.prototype.blinkPlayer = async function (player) {
	for (i = 0; i < 5; i++) {
		let that = this;
		that.cx.drawImage(deadPlayerImg, player.posX, player.posY, SQUARE_SIZE, SQUARE_SIZE);
		await sleep(150);
		that.cx.drawImage(playerImg, player.posX, player.posY, SQUARE_SIZE, SQUARE_SIZE);
		await sleep(150);
	}
}

CanvasDisplay.prototype.drawBadMan = function (badMan) {
	const badManImg = document.createElement("img");
	badManImg.src = badMan.icon();
	this.cx.drawImage(badManImg, badMan.posX, badMan.posY, SQUARE_SIZE, SQUARE_SIZE)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}