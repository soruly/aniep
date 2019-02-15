const fs = require("fs");
const path = require("path");
const getEp = require("../src/index");

const answerFile = fs.readFileSync(path.join(__dirname, "../test/minimal.txt"), "utf-8");

const answerList = new Map(
  answerFile
    .split("\n")
    .map((line) => line.split("\t").reverse())
);

let wrong = 0;
answerList.forEach((num, filename) => {
  if (`${getEp(filename)}` !== num) {
    wrong += 1;
    console.log(`Expect: ${`${num}`.padStart(6)} | Got: ${`${getEp(filename)}`.padStart(6)} | ${filename}`);
  }
});

const showResults = (numFailed, total, title) => {
  console.log();
  console.log(`${title} (${((total - numFailed) / total * 100).toFixed(6)}%)`);
  console.log(`${(total - numFailed).toString().padStart(6)}/${total} testcases passed (${((total - numFailed) / total * 100).toFixed(6)}%)`);
  console.log(`${numFailed.toString().padStart(6)}/${total} testcases failed (${(numFailed / total * 100).toFixed(6)}%)`);
};

showResults(wrong, answerList.size, "Minimal test");
