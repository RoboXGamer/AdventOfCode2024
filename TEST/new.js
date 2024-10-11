// SOLVE THIS PROBLEM:
// Input: "../Day3/example.txt"
// Output:
// we want to extract all the numbers which are adjacent to a symbol and then add all the numbers
// but . is not a symbol

// Rough Procedure:
// first find all the number grps
// then find all the symbols which are adjacent to a number
// then mark the number groups which are adjacent to a symbol
// then find the sum of all the number groups which we marked

import { readInput } from "./helper.js";

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
const findSymbol = (line, lineIndex) => {
	const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	line = line.split("");
	let symbolArray = [];
	line.forEach((c, i) => {
		let isNumber = numbers.includes(c);
		let isDot = c === ".";
		let isSymbol = !isNumber && !isDot;
		// console.log({ c, isNumber, isDot, isSymbol });
		if (isSymbol) {
			let pos = [i, lineIndex];
			symbolArray.push({
				symbol: c,
				pos,
			});
			// console.log({ symbol, pos });
		}
	});
	return symbolArray;
};
const searchAdjacentSides = (numberGrps, x, y) => {
	const sides = [
		[x - 1, y], // left
		[x + 1, y], // right
		[x, y - 1], // top
		[x, y + 1], // bottom
		[x - 1, y - 1], // top left
		[x + 1, y - 1], // top right
		[x - 1, y + 1], // bottom left
		[x + 1, y + 1], // bottom right
	];
	// console.log("Sides", sides);

	numberGrps.forEach((nG) => {
		const { number, indexes } = nG;
		indexes.forEach((index) => {
			const isAdjacent =
				sides.filter((side) => {
					return side[0] === index[0] && side[1] === index[1];
				}).length > 0;
			// console.log({ number, index, isAdjacent });
			if (isAdjacent) {
				nG.isAdjacent = true;
			}
		});
	});
};

const solve = (input) => {
	// console.log("INPUT: ", input);
	let numberGroups = [];
	let symbolGroups = [];

	// first find all the number grps
	input.forEach((line, lineIndex) => {
		// 1. Find all the numberGroups with positions and save in numberGroups Array
		const nG = findGrps(line, lineIndex);
		nG.forEach((nG) => {
			const numberGrp = convertToPosition(nG);
			if (numberGrp.number) {
				numberGroups.push(numberGrp);
			}
		});
		// 2. Find all the symbolGroups with positions and save in symbolGroups Array
		const sG = findSymbol(line, lineIndex);
		sG.forEach((sG) => {
			symbolGroups.push(sG);
		});
	});

	// console.log("numberGroups: ", numberGroups);
	// console.log("symbolGroups: ", symbolGroups);

	// 3. Find all the numberGroups which are adjacent to a symbol and mark that in numberGroups Array
	symbolGroups.forEach((sG) => {
		const { symbol, pos } = sG;
		const [x, y] = pos;
		// console.log({ symbol, pos });
		searchAdjacentSides(numberGroups, x, y);
	});
	// const a = numberGroups.filter((nG) => {
	// 	const { number, indexes } = nG;
	// 	const b = indexes.filter((index) => {
	// 		if (index[0] === 3 && index[1] === 2) {
	// 			return true;
	// 		}
	// 		return false;
	// 	});
	// 	// console.log("b", b);
	// 	if (b.length > 0) {
	// 		return true;
	// 	}
	// 	return false;
	// });
	// console.log("a", a);

	/* */

	// console.log("numberGroups: ", numberGroups);

	const markedNumberGroups = numberGroups.filter((nG) => nG.isAdjacent);
	// console.log("markedNumberGroups: ", markedNumberGroups);

	// 4. Find the sum of all the numberGroups which are marked as adjacent

	const markedNumbers = markedNumberGroups.map((nG) => {
		const { number } = nG;
		return number;
	});
	const sum = markedNumbers.reduce((a, b) => {
		return a + b;
	}, 0);
	// console.log("sum: ", sum);

	let result = sum;
	return result;
};

const runTests = (runExample = false) => {
	console.log("Running tests...");

	let testMaker = ({ name, input, expectedResult }) => {
		return () => {
			input = input.split("\n");
			let result = solve(input);
			if (result === expectedResult) {
				console.log(`✅ Challenge: Test "${name}" passed`);
			} else {
				console.log(`❌ Challenge: Test "${name}" failed`);
			}
			return { result, expectedResult };
		};
	};

	let test1dets = {
		name: "1",
		input: `123..456`,
		expectedResult: 0,
	};

	let test1 = testMaker(test1dets);
	let test2dets = {
		name: "2",
		input: `123..456
		\n789*.123`,
		expectedResult: 123 + 789,
	};
	let test2 = testMaker(test2dets);

	let test3dets = {
		name: "3",
		input: `..7..456
					\n789*.123
					\n7....789`,
		expectedResult: 7 + 789,
	};
	let test3 = testMaker(test3dets);

	let test4dets = {
		name: "4",
		input: `..7..456
					\n789*.123
					\n7....789
					\n.123.123
					\n7....789
					\n789*.123`,
		expectedResult: 7 + 789 + 789,
	};
	let test4 = testMaker(test4dets);

	const tests = [test1, test2, test3, test4];

	tests.forEach((t) => {
		let r = t();
		console.log(r);
	});

	let testExample = () => {
		const sample = readInput("./Day3/example.txt");
		let expectedResult = 4361;
		const result = solve(sample);

		if (result === expectedResult) {
			console.log(`✅ Challenge: Test Example passed`);
		} else {
			console.log(`❌ Challenge: Test Example failed`);
		}
		let r = { result, expectedResult };

		console.log(r);
		return { result, expectedResult };
	};

	if (runExample) {
		testExample();
	}
};

const main = () => {
	// const sample = readInput(`./Day3/example.txt`);
	// console.log(sample);
	// const input = readInput(`./Day3/puzzle.txt`);
	// const result = solve(sample);
	// const result = solve(input);
	// console.log("RESULT:", result);
	runTests(true);
};

main();
