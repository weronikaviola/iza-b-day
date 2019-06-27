const AVAILABLE_LEVELS = ["level1", "level2", "level3"]

const levels = {
	level1: {
		pattern: "....................\n.  ddd d d      d  .\n. ....d.b.... . ....\n.    . .b.... .d.. .\n. .. . .    d . .. .\n.   b. . .... . .. .\n. .. . . dd   . d  .\n. .. .d... .. . d...\n.        p         .\n....................",
		maxPoints: 14,
		startText: "Welcome to the game.\nYou must collect \nall the water supplies \nbefore the evil companies \nwill do that. \nReady?"
	},
	level2: {
		pattern: "....................\n.  d  b          d .\n. ....... .   .b.  .\n. . d. d.  .d.  . d.\n. . ... . b .   .d .\n.  d  d      .    d.\n. ....... .. .   . .\n. ddbd    .. ..d. ..\n. .......p   ddd   .\n....................",
		maxPoints: 17,
		startText: "something about music?",
	},
	level3: {
		pattern: "....................\n..      ..     .....\n.   . ...   .  .p  .\n. ...  .   .   ... .\n. d  .    .        .\n. .   ....   ddddd .\n. ... ....   dddd  .\n. . . .  .   ddd   .\n.     .  .   dd    .\n....................",
		maxPoints: 15,
		startText: "something about horse",
	}
};

const levelChars = {
	".": "wall",
	" ": "empty",
	"d": "drop",
	"b": "badMan",
	"p": "player",
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
	constructor(plan, startPoints = 0) {
		let rows = plan.pattern.trim().split("\n").map(el => [...el]);
		this.height = rows.length;
		this.width = rows[0].length;
		this.score = startPoints;
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
				if (type === "player") {
					this.playerX = x;
					this.playerY = y;
					console.log(x, y);
				}
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
	return (this.water.length <= 0);
}
