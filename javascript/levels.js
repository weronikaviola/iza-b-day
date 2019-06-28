const AVAILABLE_LEVELS = ["level1", "level2", "level3", "level4", "level5"]

//increase number of enemies with every level
const levels = {
	level1: {
		pattern: "....................\n.  ddd d d      d  .\n. ....d. .... . ....\n.    . . .... .d.. .\n. .. . .    d . .. .\n.   b. . .... . .. .\n. .. . . dd   . d  .\n. .. .d... .. . d...\n.        p         .\n....................",
		maxPoints: 14,
		startText: "Welcome to The Game.\nYou must collect all of the water supplies before the evil companies do that! \nThe global catastrophe is inevitable!\nCan you save us?!",
	},
	level2: {
		pattern: "....................\n.  d  b          d .\n. ....... .   .b.  .\n. . d. d.  .d.  . d.\n. . ... .   .   .d .\n.  d  d      .    d.\n. ....... .. .   . .\n. dd d    .. ..d. ..\n. .......p   ddd   .\n....................",
		maxPoints: 17,
		startText: "The violas cannot play in tune because of global warming…. \nCan you help them?",
	},
	level3: {
		pattern: "....................\n..     b..  b  .....\n.   . ...   .  .p  .\n. ...  .   .   ... .\n. d b.    .        .\n. .   ....   ddddd .\n. ... ....   dddd  .\n. . . .  .   ddd   .\n.     .  .   dd    .\n....................",
		maxPoints: 15,
		startText: "Water pollution forces the wild horses to go extinct!\nSave them!!!!",
	},
	level4: {
		pattern: "....................\n.  .   b .      .  .\n. ...    bd     d ..\n. .............dd...\n.  .............dd..\n. .............dd  .\n. ...   d       .  .\n.  .   .    d    . .\n.   p . .   b  d   .\n....................",
		maxPoints: 11,
		startText:"Mloda is now helping the bad companies\nShe created this evil maze to give them more time!\nCan you go through this trap and save us?",

	},
	level5: {
		pattern: "....................\n.p d.    ...     dd.\n. .d. d.    b.d.. d.\n. .d. ...ddd...d.d..\n. ...d.........d. b.\n. dddd.. ... ..  b .\n. .   d... ...  .. .\n.  .. b ..... d. . .\n.ddd. . d... b .dd .\n....................",
		maxPoints: 10,
		startText: "mloda is not giving up...\n Now she has an army of evil cats on her side!!!\nHurry!!!"
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

		this.rows = rows.map((row, y) => {
			return row.map((char, x) => {
				let type = levelChars[char];
				if (type === "drop") this.water.push(new Location(x, y));
				if (type === "badMan") {
					this.badGuys.push(new BadMan(x * SQUARE_SIZE, y * SQUARE_SIZE, rows, this.badGuys.length));
				}
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
