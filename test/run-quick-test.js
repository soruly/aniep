const fs = require("fs");
const path = require("path");
const getEp = require("../src/index");

const answerFile = fs.readFileSync(path.join(__dirname, "../test/minimal.txt"), "utf-8");

const answerList = new Map(
  answerFile
    .split("\n")
    .map((line) => line.split("\t").reverse())
    .map(([filename, value]) => {
      if (value === "null") {
        return [filename, null];
      }
      if (value.indexOf("|") > 0) {
        return [filename, value];
      }
      if (value.indexOf(",") > 0) {
        return [filename, value.split(",").map((each) => parseFloat(each))];
      }
      return [filename, parseFloat(value)];
    })
);

let wrong = 0;
answerList.forEach((answer, filename) => {
  const ep = getEp(filename);
  let correct = false;
  if (Array.isArray(ep)) {
    correct = JSON.stringify(ep) === JSON.stringify(answer);
  } else {
    correct = ep === answer;
  }
  if (!correct) {
    wrong += 1;
    console.log(`Expect: ${`${answer}`.padStart(6)} | Got: ${`${ep}`.padStart(6)} | ${filename}`);
  }
});

const showResults = (numFailed, total, title) => {
  console.log();
  console.log(`${title} (${(((total - numFailed) / total) * 100).toFixed(4)}%)`);
  console.log(
    `${(total - numFailed).toString().padStart(6)}/${total} testcases passed (${(
      ((total - numFailed) / total) *
      100
    ).toFixed(4)}%)`
  );
  console.log(
    `${numFailed.toString().padStart(6)}/${total} testcases failed (${(
      (numFailed / total) *
      100
    ).toFixed(4)}%)`
  );
};

showResults(wrong, answerList.size, "Minimal test");
