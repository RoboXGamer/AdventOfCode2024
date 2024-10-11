import fs from "fs";
import { platform } from "os";

let newLineSeparator = "\n";
if (platform() === "win32") {
	newLineSeparator = "\r\n";
}

const readInput = (filename) => {
	const data = fs
		.readFileSync(filename, "utf8")
		.toString()
		.split(`${newLineSeparator}`);
	return data;
};

const part1 = (input) => {
	const numbers = input.map((x) => {
		return x.split("").filter((z) => !isNaN(z));
	});
	const values = numbers.map((x) => {
		return x[0] + x[x.length - 1];
	});
	const sum = values.reduce((a, b) => {
		return parseInt(a) + parseInt(b);
	}, 0);

	return sum;
};

const part2 = (input) => {
	const numberMap = {
		one: "one1one",
		two: "two2two",
		three: "three3three",
		four: "four4four",
		five: "five5five",
		six: "six6six",
		seven: "seven7seven",
		eight: "eight8eight",
		nine: "nine9nine",
	};

	input = input.map((x) => {
		for (const key in numberMap) {
			x = x.replaceAll(key, numberMap[key]);
		}
		return x;
	});
	// console.log(input);
	const result = part1(input);
	return result;
};
const main = () => {
	const sample = readInput(`./Day1/example.txt`);
	const input = readInput(`./Day1/puzzle.txt`);
	// console.log(input);
	// const result = part1(input);
	// const result = part1(sample);
	// const result = part2(sample);
	const result = part2(input);
	console.log("Result:", result);
};

main();
