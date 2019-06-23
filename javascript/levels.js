const AVAILABLE_LEVELS = ["level1"]

const levels = {
	level1:
		"..........\n.  d  d  .\n. .... . .\n.    . . .\n. ..d. . .\n.    . . .\n. .. .   .\n. .. ... .\n.       d.\n..........",
};

const levelChars = {
	".": "wall",
	" ": "empty",
	"d": "drop",
};

class Level {
	constructor(plan) {
		let rows = plan.trim().split("\n").map(el => [...el]);
		this.height = rows.length;
		this.width = rows[0].length;
		this.startActors = [];
		this.score = 0;

		this.rows = rows.map((row, x) => {
			return row.map((char, y) => {
				let type = levelChars[char];
				if (typeof type == "string") return type;
				// for moving "actors" create new classes
				this.startActors.push(
					type.create(x, y, ch)
				);
				return "empty";
			});
		});
	}
}

Level.prototype.adjustPoints = function (num) {
	this.score += num;
	return this.score;
}
