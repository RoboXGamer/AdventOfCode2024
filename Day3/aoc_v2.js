import fs from "fs";

const readInput = (filename) => {
	let data = fs.readFileSync(filename, "utf8").toString();
	// console.log(data);
	data = data.split(`\n`);
	return data;
};

const part1 = (input) => {
	const convertToPosition = (numberGrp) => {
		let { numberGrp: number, startIndex, grpLength, lineIndex } = numberGrp;
		let indexes = [];
		number = Array.from(number);
		number.forEach((n, i) => {
			const x = i + startIndex;
			const y = lineIndex;
			let pos = [x, y];
			indexes.push(pos);
		});
		number = parseInt(number.join(""));
		return { number, indexes };
	};
	const findGrps = (line, lineIndex) => {
		let numberGrp = "";
		let startIndex = null;
		let grpLength = 0;
		const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		const numberGrps = [];
		line.split("").forEach((c, i) => {
			if (numbers.includes(c)) {
				numberGrp += c;
				if (startIndex === null) {
					startIndex = i;
				} else {
					grpLength++;
				}
			} else if (numberGrp !== "") {
				// save the created group and reset for new
				numberGrps.push({
					numberGrp,
					startIndex,
					grpLength,
					lineIndex,
				});
				numberGrp = "";
				startIndex = null;
				grpLength = 0;
			}
			return numberGrps;
		});
		// console.log({ numberGrp, startIndex, grpLength });
		return numberGrps;
	};
	const searchAdjacentSides = (numberGrps, x, y) => {
		const sides = [
			[x - 1, y], // left
			[x, y - 1], // top
			[x + 1, y], // right
			[x, y + 1], // bottom
			[x - 1, y - 1], // top left
			[x + 1, y - 1], // top right
			[x + 1, y + 1], // bottom right
			[x - 1, y + 1], // bottom left
		];
		let foundNumbers = [];

		sides.forEach((s) => {
			// get the cords of sides and check if they have a number
			const [sX, sY] = s;

			numberGrps.forEach((n) => {
				const { number, indexes } = n;

				const foundIndexes = indexes.map((i) => {
					const [x, y] = i;
					if (sX === x && sY === y) {
						// console.log({ foundNumber: number });
						foundNumbers.push(number);
						return i;
					}
				});
				console.log({ foundIndexes });
			});
		});
		// foundNumbers = [...new Set(foundNumbers)];

		// console.log({ foundNumbers });
		return foundNumbers;
	};

	let numberGrps = [];
	let results = [];

	input.forEach((line, i) => {
		// console.log({ line, i });
		const search = findGrps(line, i);
		// console.log({ search });
		search.forEach((n) => {
			const numberGrp = convertToPosition(n);
			numberGrps.push(numberGrp);
		});
	});
	// console.log(numberGrps.at(-1));

	input.forEach((line, y) => {
		line.split("").forEach((c, x) => {
			let isDot = c === ".";
			let isNumber = Number.isInteger(Number(c));
			let isSymbol = !isDot && !isNumber;

			if (isSymbol) {
				// console.log({ symbol: c, position: [x, y] });
				// now check if this symbol is adjacent to a number as we have all the number grps
				let searchResult = searchAdjacentSides(numberGrps, x, y);
				if (searchResult.length > 0) {
					// console.log("FOUND", {
					// 	symbol: c,
					// 	foundAdjacent: searchResult,
					// });
					// results.push(...searchResult);
				}
			}
		});
	});
	let result = numberGrps.filter((n) => n.isAnswer);
	// result = result.reduce((a, b) => a + b, 0);
	console.log({ results });
	// results = [...new Set(results)];
	// console.log(results.slice(30, 50));
	// const result = results.reduce((a, b) => a + b);
	return result || 0;
};

const main = () => {
	const sample = readInput(`./Day3/example.txt`);
	// console.log(sample);
	const input = readInput(`./Day3/puzzle.txt`);
	// console.log(input);
	const resultSample = part1(sample);
	// const result = part1(input);
	// const result = part2(sample);
	// const result = part2(input);
	console.log("ResultSample:", resultSample);
	// console.log("Result:", result);
};

main();
