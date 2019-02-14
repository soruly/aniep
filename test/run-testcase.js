const fs = require("fs");
const path = require("path");
const getEp = require("../src/index");

const answerList = new Map(
  fs.readFileSync(path.join(__dirname, "../test/answer.txt"), "utf-8")
    .split("\n")
    .map((line) => line.split("\t").reverse())
);

let wrong = 0;
answerList.forEach((num, filename) => {
  if (`${getEp(filename)}` !== num) {
    wrong += 1;
    console.log(filename);
    console.log(`Expect: ${num}\nGot: ${getEp(filename)}`);
  }
});

console.log(`${(answerList.size - wrong).toString().padStart(6)}/${answerList.size} testcases passed (${((answerList.size - wrong) / answerList.size * 100).toFixed(6)}%)`);
console.log(`${wrong.toString().padStart(6)}/${answerList.size} testcases failed (${(wrong / answerList.size * 100).toFixed(6)}%)`);
