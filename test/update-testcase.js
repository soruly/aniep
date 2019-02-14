const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const getEp = require("../src/index");

const answerList = new Map(
  fs.readFileSync(path.join(__dirname, "../test/answer.txt"), "utf-8")
    .split("\n")
    .map((line) => line.split("\t").reverse())
);

const answerListNew = new Map(
  child_process
    .execSync("find /mnt/data/anime -type f -name \"*.mp4\"")
    .toString()
    .split("\n")
    .filter((file) => file)
    .map((file) => path.basename(file))
    .map((file) => answerList.has(file) ? [
      file,
      answerList.get(file)
    ] : [
      file,
      getEp(file).toString()
    ])
);

fs.writeFileSync(path.join(__dirname, "../test/answer.txt"),
  Array.from(answerListNew)
    .sort((a, b) => a[0] > b[0] ? 1 : -1)
    .map((each) => each.reverse().join("\t"))
    .join("\n")
);

