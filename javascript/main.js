const SQUARE_SIZE = 40;
const SPEED = 40;
const DIRECTIONS = {
	37: "left",
	38: "up",
	39: "right",
	40: "down",
};

const CURRENT_GAME = {};

initialize("level1");

function initialize(level) {
	const body = document.getElementById("body");
	CURRENT_GAME.level = new Level(levels[level]);
	CURRENT_GAME.canvas = new CanvasDisplay(body, CURRENT_GAME.level);
	CURRENT_GAME.canvas.drawBackground(CURRENT_GAME.level);
	CURRENT_GAME.player = new Player(200, 320, 1);
	CURRENT_GAME.canvas.drawPlayer(CURRENT_GAME.player);
	document.addEventListener("keydown", movePlayer);
}



function movePlayer(evt) {
	console.log(DIRECTIONS[evt.keyCode]);
	let currentX = CURRENT_GAME.player.posX;
	let currentY = CURRENT_GAME.player.posY;
	CURRENT_GAME.canvas.cx.clearRect(currentX, currentY, SQUARE_SIZE, SQUARE_SIZE);
	CURRENT_GAME.player.move(DIRECTIONS[evt.keyCode]);
	CURRENT_GAME.canvas.drawPlayer();
}