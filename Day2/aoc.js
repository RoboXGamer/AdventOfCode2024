import fs from "fs";

const readInput = (filename) => {
	const data = fs.readFileSync(filename, "utf8").toString().split(`\n`);
	return data;
};

const part1 = (input) => {
	const MAX_RED_COUNT = 12;
	const MAX_GREEN_COUNT = 13;
	const MAX_BLUE_COUNT = 14;

	const data = input
		.map((x) => {
			return x.split(":")[1];
		})
		.map((x) => {
			return x.split(";");
		});

	const sets = data.map((x) => {
		x.map((y) => {
			y = y.split(",");
			y = y.map((z) => {
				z = z.trim();
				return z.split(" ");
			});
			return y;
		});
		return x;
	});
	// console.log(sets);
	const result = sets.map((x, i) => {
		const some = x.map((y) => {
			const z = y.split(",").map((z) => {
				z = z.trim();
				const [a, b] = z.split(" ");
				switch (b) {
					case "red":
						if (parseInt(a) > MAX_RED_COUNT) {
							return false;
						} else {
							return true;
						}

					case "blue":
						if (parseInt(a) > MAX_BLUE_COUNT) {
							return false;
						} else {
							return true;
						}

					case "green":
						if (parseInt(a) > MAX_GREEN_COUNT) {
							return false;
						} else {
							return true;
						}
				}
			});
			// console.log("z", z);
			if (z.includes(false)) {
				return false;
			}
			return true;
		});
		if (some.includes(false)) {
			return false;
		}
		return i + 1;
	});
	// console.log(result);
	const sum = result.reduce((a, b) => {
		return a + b;
	});
	return sum;
};

const part2 = (input) => {
	const MAX_RED_COUNT = 12;
	const MAX_GREEN_COUNT = 13;
	const MAX_BLUE_COUNT = 14;

	const data = input
		.map((x) => {
			return x.split(":")[1];
		})
		.map((x) => {
			return x.split(";");
		});

	const sets = data.map((x) => {
		x.map((y) => {
			y = y.split(",");
			y = y.map((z) => {
				z = z.trim();
				return z.split(" ");
			});
			return y;
		});
		return x;
	});
	// console.log(sets);
	const result = sets.map((x, i) => {
		let min_red = 0;
		let min_green = 0;
		let min_blue = 0;
		const some = x.map((y) => {
			// console.log("y", y);
			y.split(",").forEach((z) => {
				// console.log("z", z);
				z = z.trim();
				const [a, b] = z.split(" ");
				switch (b) {
					case "red":
						if (parseInt(a) > min_red) {
							min_red = parseInt(a);
						}
						break;
					case "blue":
						if (parseInt(a) > min_blue) {
							min_blue = parseInt(a);
						}
						break;
					case "green":
						if (parseInt(a) > min_green) {
							min_green = parseInt(a);
						}
						break;
				}
			});

			return {
				min_red,
				min_green,
				min_blue,
			};
		});
		// console.log("some", some);
		const min = { min_red, min_green, min_blue };
		let power = 1;
		for (const key in min) {
			// console.log("key", min[key]);
			power *= min[key];
		}
		// console.log("power", power);
		return power;
	});
	const sum = result.reduce((a, b) => {
		return a + b;
	});
	return sum;
};

const main = () => {
	const sample = readInput(`./Day2/example.txt`);
	// console.log(sample);
	const input = readInput(`./Day2/puzzle.txt`);
	// console.log(input);
	// const result = part1(sample);
	// const result = part1(input);
	// const result = part2(sample);
	const result = part2(input);
	console.log("Result:", result);
};

main();
