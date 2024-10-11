import fs from "fs";

const readInput = (filename) => {
	let data = fs.readFileSync(filename, "utf8").toString();
	// console.log(data);
	data = data.split(`\n`);
	return data;
};

export { readInput };
