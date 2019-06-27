const AVAILABLE_LEVELS = ["level1"]

const levels = {
	level1: {
		pattern: "..........\n.  d  d  .\n. ....b. .\n.  b . . .\n. ..d. . .\n.    . . .\n. .. .   .\n. .. ... .\n.       d.\n..........",
		maxPoints: 4,
		startText: "Welcome to the game.\nYou must collect \nall the water supplies \nbefore the evil companies \nwill do that. \nReady?"
	}

};

const levelChars = {
	".": "wall",
	" ": "empty",
	"d": "drop",
	"b": "badMan",
};

class Location {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	read() {
		return {
			x: this.x * SQUARE_SIZE,
			y: this.y * SQUARE_SIZE,
		};
	}
}
class Level {
	constructor(plan) {
		let rows = plan.pattern.trim().split("\n").map(el => [...el]);
		this.height = rows.length;
		this.width = rows[0].length;
		this.score = 0;
		this.maxPoints = plan.maxPoints;
		this.active = true;
		this.badGuys = [];
		this.water = [];

		console.log('constructing');

		// let's start predefined number of BadGuys in the same position
		// they should move in different direction since they have different IQ
		this.badGuys.push(new BadMan(1 * SQUARE_SIZE, 1 * SQUARE_SIZE, rows, 0));
		this.badGuys.push(new BadMan(1 * SQUARE_SIZE, 1 * SQUARE_SIZE, rows, 1));
		this.badGuys.push(new BadMan(1 * SQUARE_SIZE, 1 * SQUARE_SIZE, rows, 2));

		this.rows = rows.map((row, y) => {
			return row.map((char, x) => {
				let type = levelChars[char];
				if (type === "drop") this.water.push(new Location(x, y));
				return type;
			});
		});
	}
}

Level.prototype.adjustPoints = function (num) {
	this.score += num;
	if (this.checkIfDone()) {
		this.active = false;
		STATE.nextLevel(num);
	}
}

Level.prototype.checkIfDone = function () {
	console.log(this.water);
	return (this.water.length <= 0);
}
