const levels = {
	level1: "..........\n.        .\n. .... . .\n.    . . .\n. .. . . .\n.    . . .\n. .. .   .\n. .. ... .\n.        .\n..........",
};

const levelChars = {
	".": "wall",
	" ": "empty",
};

class Level {
	constructor(plan) {
		let rows = plan.trim().split("\n").map(el => [...el]);
		this.height = rows.length;
		this.width = rows[0].length;
		this.startActors = [];

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
