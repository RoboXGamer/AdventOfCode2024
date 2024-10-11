import fs from "fs";

const readInput = (filename) => {
	const data = fs.readFileSync(filename, "utf8").toString().split(`\n`);
	return data;
};

const part1 = (input) => {
	const checkSymbol = (line) => {
		let symbol = null;
		let position = null;
		const symbols = ["@", "#", "$", "%", "&", "*", "/", "+", "-", "="];
		line.split("").forEach((c, i) => {
			if (symbols.includes(c)) {
				symbol = c;
				position = i;
			}
		});
		return { symbol, position };
	};
	const findGrps = (line) => {
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
				numberGrps.push({ numberGrp, startIndex, grpLength });
				numberGrp = "";
				startIndex = null;
				grpLength = 0;
			}
		});
		// console.log({ numberGrp, startIndex, grpLength });
		return numberGrps;
	};
	input.forEach((line, i) => {
		const { symbol, position } = checkSymbol(line);
		if (symbol) {
			const msg = `Found symbol at line index ${i}: ${symbol} at index ${position}`;
			// console.log(msg);
		}
		const numberGrps = findGrps(line);
		// console.log({ numberGrps });
		const numbersDets = numberGrps.map((n) => {
			const { numberGrp, startIndex, grpLength } = n;
			if (numberGrp) {
				const msg = `Found number group at line index ${i}: ${numberGrp} at index ${startIndex} with length ${grpLength}`;
				// console.log(msg);
			}
			const number = parseInt(numberGrp);
			// check if the number is adjacent to a symbol
			const indexes = [];
			for (let i = startIndex; i <= startIndex + grpLength; i++) {
				indexes.push(i);
			}
			return { number, indexes };
		});
		if (numbersDets.length > 0) {
			console.log({ ...numbersDets });
		}
	});
	return input;
};

const main = () => {
	const sample = readInput(`./Day3/example.txt`);
	// console.log(sample);
	const input = readInput(`./Day3/puzzle.txt`);
	// console.log(input);
	const result = part1(sample);
	// const result = part1(input);
	// const result = part2(sample);
	// const result = part2(input);
	console.log("Result:", result);
};

main();
