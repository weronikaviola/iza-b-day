class CanvasDisplay {
	constructor(parent, level) {
		console.log(parent);
		this.canvas = document.createElement("canvas");
		this.canvas.width = level.width * 40;
		this.canvas.height = level.height * 40;
		this.squareSize = this.canvas.width / level.width;
		console.log(this.canvas.width);
		parent.appendChild(this.canvas);
		this.cx = this.canvas.getContext("2d");
	}

	clear() {
		this.canvas.remove();
	}
}

CanvasDisplay.prototype.clearDisplay = function (status) {
	if (status == "won") {
		this.cx.fillStyle = "rgb(68,191,255)";
	} else if (status == "lost") {
		this.cx.fillStyle = "rgb(44,136,214)";
	} else {
		this.cx.fillStyle = "rgb(52,166,251)";
	}

	this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

//displays

const wallsImg = document.createElement("img");
wallsImg.src = "images/wall.jpg";

const playerImg = document.createElement("img");
playerImg.src = "images/peach.png";

CanvasDisplay.prototype.drawBackground = function (level) {
	for (let y = 0; y < level.height; y++) {
		for (let x = 0; x < level.width; x++) {
			let tile = level.rows[y][x];
			if (tile == "wall") {
				let startX = x * 40;
				let startY = y * 40;
				this.cx.drawImage(wallsImg, startX, startY, 40, 40);
			}
		}
	}
}

CanvasDisplay.prototype.drawPlayer = function () {
	//here animate player
	this.cx.drawImage(playerImg, CURRENT_GAME.player.posX, CURRENT_GAME.player.posY, 40, 40);
}